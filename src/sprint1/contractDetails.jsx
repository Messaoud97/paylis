import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ContractDetails extends Component {
  state = {
    name: "",
    lname: "",
    email: "",
    dateDebut: 0,
    deadLine: 0,
    amoutInReturn: 0,
    loadId: 0,
    ProposalState: 0,
    disactiveButton: false
  };

  componentDidMount() {
 
    console.log("contractDetails.jsx");
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProposal(this.props.idc, (error, res) => {
        console.log(res);
        console.log("loanId", res[6].c[0]);
        this.setState({ name: res[0] });
        this.setState({ lname: res[1] });
        this.setState({ email: res[2] });
        this.setState({ dateDebut: res[3].c[0] });
        this.setState({ deadLine: res[4].c[0] });
        this.setState({ amoutInReturn: res[5].c[0] });
        this.setState({ loadId: res[6].c[0] });
        console.log("name", this.state.name);
        console.log("last", this.state.lname);
        console.log("date debut", this.state.dateDebut);
        console.log("deadline", this.state.deadLine);
        console.log("amount", this.state.amoutInReturn);
        console.log("loadId", this.state.loadId);
      });

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProposalState(this.props.idc, (error, res) => {
        this.setState({ ProposalState: res.c[0] });
      });
  }

  handleSign(_id) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .confirmTransfer(this.props.idc, () => {
        console.log("signed proposal :", this.props.idc);
        this.setState({ ProposalState: 1 });
        this.setState({ disactiveButton: true });
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
        if (!err) { popup()
          console.log(hash);
        } else console.log(err);
      });
    });
    console.log("signed proposal :", this.props.idc);
    this.setState({ ProposalState: 1 });
    this.setState({ disactiveButton: true });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loadId === this.props.idl ? (
          <div>
            <ul>
              <li>
                {" "}
                <b>First Name : </b>
                {this.state.name}
              </li>
              <li>
                <b>Email : </b>
                {this.state.email}
              </li>
              <li>
                <b>DebutContrat : </b>{" "}
                {new Date(this.state.dateDebut * 1000).toString()}
              </li>
              <li>
                <b>deadLine : </b>{" "}
                {new Date(this.state.deadLine * 1000).toString()}
              </li>
              <li>
                <b>Amount In Return : </b>
                {this.state.amoutInReturn}
              </li>
              <li>
                <b>State :</b>{" "}
                {this.state.ProposalState === 0 ? "waiting" : "confirmed"}
              </li>
            </ul>
            <input
              type="submit"
              disabled={this.state.ProposalState === 0 ? false : true}
              value="Sign The Proposal"
              onClick={() => this.handleSign(this.props.idc)}
              className="btn btn-danger btn-sm btn-block"
            />{" "}
            <br />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default ContractDetails;
