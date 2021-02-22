import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class LoanDetails extends Component {
  state = {
    pubKey: "",
    name: "",
    lname: "",
    email: "",
    adress: "",
    motivation: "",
    credit: 0,
    loanState: 0,
    hide: false,
    disactiveButton: false
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    console.log("loanDetails.js");
    const x = this.props.id;
    console.log("x is : ", x);
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLoanState(
        x,
        { from: address },
        (err, res) => {
          this.setState({ loanState: res.c[0] });
          console.log("x is : ", x);
          console.log("loan state is : ", res.c[0]);
        }
      );
  }

  // to show the loan detail
  handleListing(_id) {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLoanById(
        _id,
        { from: address },
        (error, res) => {
          console.log(res);
          
          this.setState({ pubKey: res[0] });
          this.setState({ name: res[1] });
          this.setState({ lname: res[2] });
          this.setState({ email: res[3] });
          this.setState({ adress: res[4] });
          this.setState({ motivation: res[5] });
          this.setState({ credit: res[6].c[0] });
          // this.setState({ loanState: res[6].c[0] });
          /*
        console.log("key", this.state.pubKey);
        console.log("name", this.state.name);
        console.log("lname", this.state.lname);
        console.log("email", this.state.email);
        console.log("adress", this.state.adress);
        console.log("motivation", this.state.motivation);
        console.log("credit", this.state.credit);
        console.log("loan state", this.state.loanState);
        */

          this.setState({ hide: !this.state.hide });
        }
      );
  }

  //to accept the loan
  handleProp(_id) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .acceptLoan(_id, (error, res) => {
        console.log("accepted");
        this.setState({ loanState: 1 });
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
    //const web3 = new Web3("http://localhost:7545");
    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .acceptLoan.getData(_id);
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
    this.setState({ loanState: 1 });
    this.setState({ disactiveButton: !this.state.disactiveButton });
  }

  // // to refuse the loan
  handleRefuse(_id) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .refuseLoan(_id, (error, res) => {
        console.log("refused");
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
    //const web3 = new Web3("http://localhost:7545");
    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .refuseLoan.getData(_id);
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
    this.setState({ loanState: 2 });
    this.setState({ disactiveButton: !this.state.disactiveButton });
  }

  stateShow() {
    switch (this.state.loanState) {
      case 0:
        return "Waiting";
      case 1:
        return "Accepted";
      case 2:
        return "Refused";
      default:
        break;
    }
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.id + 1}</th>
        <td align="left">
          <input
            type="button"
            className="btn btn-outline-secondary btn-sm btn-block"
            value={!this.state.hide ? "Show Details" : "Hide Details"}
            onClick={() => this.handleListing(this.props.id)}
          />
          {this.state.hide ? (
            <React.Fragment>
              <ul align="left">
                <li>
                  <b>key Client: </b> {this.state.pubKey}
                </li>
                <li>
                  <b>First Name Client: </b> {this.state.name}
                </li>
                <li>
                  <b>Last Name Client: </b> {this.state.lname}
                </li>
                <li>
                  <b>Email Client: </b> {this.state.email}
                </li>
                <li>
                  <b>Adress Client: </b> {this.state.adress}
                </li>
                <li>
                  <b>Motivation: </b> {this.state.motivation}
                </li>
                <li>
                  <b>Amount Wanted: </b> {this.state.credit}
                </li>
                <li>
                  <b>Loan state: </b> {this.stateShow()}
                </li>
              </ul>
            </React.Fragment>
          ) : null}
        </td>
        {this.state.loanState === 0 ? (
          <React.Fragment>
            <td>
              {" "}
              <button
                disabled={this.state.disactiveButton}
                onClick={() => this.handleProp(this.props.id)}
                className="btn btn-success py-2 px-4 text-white btn-sm"
              >
                {" "}
                accept request
                <i className="fas fa-vote-yea" />
              </button>
            </td>
            <td>
              <button
                disabled={this.state.disactiveButton}
                onClick={() => this.handleRefuse(this.props.id)}
                className="btn btn-danger py-2 px-4 btn-sm"
              >
                {" "}
                refuse request <i className="fas fa-window-close" />
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
      </tr>
    );
  }
}

export default LoanDetails;
