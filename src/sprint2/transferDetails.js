import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared2";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class TransferDetails extends Component {
  state = {
    hide: false,
    approve: 0,

    pubKey: "",
    name: "",
    lname: "",
    adress: "",
    amount: 0,
    loanState: 0
  };

  componentDidMount() {
    console.log("transferDetails.js");
    const x = this.props.id;
    console.log("x is : ", x);
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getTransferState(
        x,
        { from: address },
        (err, res) => {
          this.setState({ loanState: res.c[0] });
          console.log("x is : ", x);
          console.log("loan state is : ", res.c[0]);
        }
      );

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getMoney(
        x,
        { from: address },
        (err, res) => {
          //console.log("aaaaaaaaaaaaaaaaaaa", res);
          this.setState({ approve: res.c[0] });
        }
      );
  }

  // to show the transfer detail
  handleListing(_id) {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getTransferInfo(
        _id,
        { from: address },
        (error, res) => {
          this.setState({ pubKey: res[0] });
          this.setState({ name: res[1] });
          this.setState({ lname: res[2] });
          this.setState({ adress: res[3] });
          this.setState({ amount: res[4].c[0] });

          console.log("key", this.state.pubKey);
          console.log("name", this.state.name);
          console.log("lname", this.state.lname);
          console.log("adress", this.state.adress);
          console.log("credit", this.state.amount);
          console.log("loan state", this.state.loanState);

          this.setState({ hide: !this.state.hide });
        }
      );
  }

  //to accept the transfer
  handleAccept(_id) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .acceptState(_id, (error, res) => {
        console.log("accepted");
        this.setState({ loanState: 2 });
        this.setState({ disactiveButton: !this.state.disactiveButton });
      });
      */

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
        .acceptState.getData(_id);
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

    console.log("accepted");
    this.setState({ loanState: 2 });
    this.setState({ disactiveButton: !this.state.disactiveButton });
  }

  // // to refuse the transfer
  handleRefuse(_id) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .rejectState(_id, (error, res) => {
        console.log("refused");
        this.setState({ loanState: 3 });
        this.setState({ disactiveButton: !this.state.disactiveButton });
      });
      */

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
        .rejectState.getData(_id);
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

    console.log("refused");
    this.setState({ loanState: 3 });
    this.setState({ disactiveButton: !this.state.disactiveButton });
  }

  //comfirmT(_id) {
  comfirmT = _id => {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .confirmTransfer(_id, (error, res) => {
        console.log("confirmer");
        this.setState({ loanState: 1 });
      });
      */

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
        .confirmTransfer.getData(_id);
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
    this.setState({ loanState: 1 });
  };

  render() {
    return (
      <tr>
        <th scope="row">{this.props.id + 1}</th>
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
              <b>Adress Client: </b> {this.state.adress} <br />
              <b>Amount to be Diposed: </b> {this.state.amount} <br />
              <b>Loan state: </b> {this.stateShow()} <br />
            </React.Fragment>
          ) : null}
        </td>
        {this.state.loanState === 0 ? (
          <React.Fragment>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={() => this.handleAccept(this.props.id)}
              >
                <i className="far fa-check-circle">accept</i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => this.handleRefuse(this.props.id)}
              >
                <i className="far fa-times-circle">refuse</i>
              </button>
            </td>
          </React.Fragment>
        ) : (
          <td colSpan={2} className="thead-dark">
            <strong>
              {" "}
              this request has been handled before, You cannot make any
              modification anymore{" "}
            </strong>
          </td>
        )}
        <td>
          {this.state.loanState === 1 ? (
            <button className={this.pick()} disabled>
              <i className="fas fa-check-double" />
            </button>
          ) : (
            <button
              className={this.pick()}
              disabled={!this.state.approve}
              onClick={() => this.comfirmT(this.props.id)}
            >
              Send IMFT
            </button>
          )}
        </td>
      </tr>
    );
  }

  pick() {
    let str = "btn btn-sm btn-";
    if (this.state.approve === 0) return (str += "light");
    else return (str += "outline-success");
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
      default:
        break;
    }
  }
}

export default TransferDetails;
