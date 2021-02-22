import React, { Component } from "react";
import { MDBListGroupItem } from "mdbreact";
import { ContractsAbi, ContractAdress } from "../web3/shared4";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class AcceptProjectSub extends Component {
  state = {
    Project: {
      owner: "",
      contact: 0,
      demanderAdd: "",
      title: "",
      deadLine: 0,
      description: "",
      amount: 0,
      collected: 0,
      state: 0
    }
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectInfo(
        this.props.idP,
        { from: address },
        (err, res) => {
          //console.log("fire style ", res.valueOf());
          console.log("fire  ", res);

          let Project = {};
          Project.owner = res[0];
          Project.contact = res[1].c[0];
          Project.demanderAdd = res[2];
          Project.title = res[3];
          Project.deadLine = res[4].c[0];
          Project.description = res[5];
          Project.amount = res[6].c[0];
          Project.collected = res[7].c[0];
          Project.state = res[8].c[0];
          this.setState({ Project });
          console.log("project", this.state.Project);
        }
      );
  }

  acceptDemand(id) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .acceptProject(id, (err, res) => {
        console.log("accepted");
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
      var d = web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress)
        .acceptProject.getData(id);
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
        if (!err) {console.log(hash);popup()}
        else console.log(err);
      });
    });
    console.log("accepted");
  }

  refuseDemand(id) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .refuseProject(id, (err, res) => {
        console.log("accepted");
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
      var d = web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress)
        .refuseProject.getData(id);
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
        if (!err) {console.log(hash);popup()}
        else console.log(err);
      });
    });
    console.log("refused");
  }

  render() {
    return (
      <MDBListGroupItem color={this.state.Project.state !== 0 && "dark"}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1 fahmi">{this.state.Project.title}</h5>
          <small>{this.state.Project.demanderAdd}</small>
        </div>
        <div className="row">
          <div className="col-8">
            <ul type="none">
              <li>
                <b className="fahmi">owner name: </b>
                {this.state.Project.owner}
              </li>
              <li>
                <b className="fahmi">owner contact: </b>
                {this.state.Project.contact}
              </li>
              <li>
                <b className="fahmi">description: </b>
                {this.state.Project.description}
              </li>
              <li>
                <b className="fahmi">amount wanted: </b>
                {this.state.Project.amount}
              </li>
            </ul>
          </div>
          <div className="col pt-3">
            <button
              disabled={this.state.Project.state === 0 ? false : true}
              className="btn btn-success btn-sm fahmi"
              onClick={() => this.acceptDemand(this.props.idP)}
            >
              {" "}
              accept the demand
            </button>
            <button
              disabled={this.state.Project.state === 0 ? false : true}
              className="btn btn-danger  btn-sm fahmi"
              onClick={() => this.refuseDemand(this.props.idP)}
            >
              {" "}
              refuse the demand
            </button>
          </div>
        </div>

        <small>{new Date(this.state.Project.deadLine * 1000).toString()}</small>
      </MDBListGroupItem>
    );
  }
}

export default AcceptProjectSub;
