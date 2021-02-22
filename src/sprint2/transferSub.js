import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared2";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class TransferSub extends Component {
  state = {
    in: true,
    disable: false,
    hide: false,
    pubKey: "",
    name: "",
    lname: "",
    amount: 0,
    loanState: 0,
    champ: 0
  };

  constructor() {
    super();
    this.handleamount = this.handleamount.bind(this);
  }

  componentDidMount() {
    var address = localStorage.getItem('address')

    const x = this.props.id;
    console.log("x is : ", x);
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getTransferState(
        x,
        { from: address },
        (err, res) => {
          this.setState({ loanState: res.c[0] });
          console.log("x is : ", x);
          console.log("transfer state is : ", res.c[0]);
        }
      );
  }

  handleListing(_id) {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getTransferInfo(
        _id,
        { from: address },
        (error, res) => {
          console.log(res);
          this.setState({ pubKey: res[0] });
          this.setState({ name: res[1] });
          this.setState({ lname: res[2] });
          this.setState({ amount: res[4].c[0] });

          console.log("key", this.state.pubKey);
          console.log("name", this.state.name);
          console.log("lname", this.state.lname);
          console.log("credit", this.state.amount);
          console.log("loan state", this.state.loanState);

          this.setState({ hide: !this.state.hide });
        }
      );
  }

  sendRev(_id, str) {
    console.log(_id);
    console.log(str);
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .setSent(_id, str, (err, res) => {
        console.log("money sent");
        //this.state.loanState = 0;
      }); */

    console.log("begin");

    var address = localStorage.getItem('address')
    var pky = localStorage.getItem('privateKey')

    var privateKey = Buffer.from(
      pky,
      "hex"
    );

    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .setSent.getData(_id, str);
      console.log("begin2");
      console.log(d);
      var tx = new Tx({
        nonce: nonce,
        gasPrice: "0x4a817c800",
        gasLimit: "0x300000",
        to: ContractAdress,
        value: 0,
        data: d
      });

      tx.sign(privateKey);
      var serializedTx = tx.serialize();
      web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"), function(
        err,
        hash
      ) {
        if (!err) {
          console.log(hash);popup()
        } else console.log(err);
      });
    });
    console.log("money sent");
  }

  handleamount(e) {
    this.setState({ champ: e.target.value });
    console.log(this.state.champ);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.index}</th>
        <td>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => this.handleListing(this.props.id)}
          >
            {!this.state.hide ? (
              <i class="fas fa-chevron-down">Show Details</i>
            ) : (
              <i class="fas fa-chevron-up">Hide Details</i>
            )}
          </button>

          {this.state.hide ? (
            <React.Fragment>
              <br />
              <b>key Client: </b> {this.state.pubKey} <br />
              <b>First Name Client: </b> {this.state.name} <br />
              <b>Last Name Client: </b> {this.state.lname} <br />
              <b>Amount to be Diposed: </b> {this.state.amount} <br />
              <b>Loan state: </b> {this.stateShow()} <br />
            </React.Fragment>
          ) : null}
        </td>
        <th className={this.pickColor()}>
          {" "}
          The State Of This Particular Transfer is: {this.stateShow()} <br />
          {this.state.loanState === 4 ? (
            <small className=" text-danger fahmi">
              <b>money was sent</b>
            </small>
          ) : (
            ""
          )}
        </th>
        <td>
          {this.state.in ? (
            <button
              className={this.buttonColor()}
              disabled={this.checkAbility()}
              onClick={() => this.inG()}
            >
              <i className="fas fa-location-arrow fahmi">
                {" "}
                {this.state.loanState === 4 ? (
                  <span className="text-danger ">Sent</span>
                ) : (
                  "Send In"
                )}
              </i>
            </button>
          ) : (
            <React.Fragment>
              {/* ....................................... */}
              <div className=" input-group ">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="MaterialButton-addon2"
                  onChange={this.handleamount}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-md btn-secondary m-0 px-3"
                    type="button"
                    id="MaterialButton-addon2"
                    onClick={() =>
                      this.sendRev(this.props.id, this.state.champ)
                    }
                  >
                    <i className="fas fa-location-arrow" />
                  </button>
                </div>
              </div>
              {/* 
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handleamount}
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        this.sendRev(this.props.id, this.state.champ)
                      }
                    >
                      <i className="fas fa-location-arrow" />
                    </button>
                  </div>
                </div>
              </div>
              ....................................... */}
            </React.Fragment>
          )}
        </td>
      </tr>
    );
  }

  inG() {
    this.setState({ in: false });
  }

  checkAbility() {
    if (this.state.loanState === 2) return false;
    else return true;
  }

  buttonColor() {
    let str = "btn btn-sm btn-";
    if (this.state.loanState === 2) str += "info";
    else str += "light";
    return str;
  }

  pickColor() {
    let str = "text-";
    if (this.state.loanState === 0) str += "dark";
    else if (this.state.loanState === 2) str += "success";
    else if (this.state.loanState === 3) str += "danger";
    return str;
  }

  stateShow() {
    switch (this.state.loanState) {
      case 0:
        return "Requested";
      case 1:
        return "Confirmed";
      case 2:
        return "Accepted";
      case 3:
        return "Rejected";
      case 4:
        return "Accepted";
      default:
        break;
    }
  }
}

export default TransferSub;
