import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
 
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class CrowdsSub extends Component {
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
    },
    money: 0,
    show: false
  };

  componentDidMount() {
    console.log("crowdssub.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectInfo(
        this.props.idP,
        { from: address },
        (err, res) => {
          console.log("ppppp", res[8].c[0]);
          if (res[8].c[0] === 0 || res[8].c[0] === 4) return;

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

          if (res[4].c[0] > Date.now() / 1000 && res[8].c[0] == 3) {
            var address = localStorage.getItem('address')
            var pky = localStorage.getItem('privateKey')

            var privateKey = Buffer.from(
              pky,
              "hex"
            );
            let y = this.props.idP;
            web3.eth.getTransactionCount(address, function(err, nonce) {
              var data = web3.eth
                .contract(ContractsAbi)
                .at(ContractAdress)
                .failProject.getData(y);

              var tx = new Tx({
                nonce: nonce,
                gasPrice: "0x4a817c800", // 0x09184e72a000
                gasLimit: "0x300000", // 0x30000
                to: ContractAdress,
                value: 0,
                data: data
              });

              tx.sign(privateKey);
              var serializedTx = tx.serialize();
              web3.eth.sendRawTransaction(
                "0x" + serializedTx.toString("hex"),
                function(err, hash) {
                  popup()
                  console.log(hash);
                }
              );
            });
          }
        }
      );
  }

  handleChange = ({ currentTarget: input }) => {
    const money = input.value;
    this.setState({ money });
  };

  handleInvesting(id) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newInvestment(this.state.money, id, (err, res) => {
        console.log("investement succeded");
      }); */

    let money = this.state.money;

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
        .newInvestment.getData(money, id);
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
    console.log("investement succeded");
  }

  render() {
    if (this.state.Project.title === "") return null;
    return (
      <tr>
        <td>{this.props.idP}</td>
        <td>
          <b>Title: </b>
          {this.state.Project.title} <br />
          <b>Description: </b>
          {this.state.Project.description} <br />
          <b>State: </b>
          <span className="fahmi">
            {this.state.Project.state === 3 ? "Available" : "Closed"}
          </span>
        </td>
        <td>{new Date(this.state.Project.deadLine * 1000).toDateString()}</td>
        <td>
          {" "}
          <b>Name: </b>
          {this.state.Project.owner} <br />
          <b>Address: </b>
          {this.state.Project.demanderAdd}
        </td>
        <td>{this.state.Project.amount}</td>
        <td>{this.state.Project.collected}</td>
        <td>
          {this.state.show === true ? (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                required
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success btn-sm"
                  type="button"
                  onClick={() => this.handleInvesting(this.props.idP)}
                >
                  Transfer
                </button>
              </div>
            </div>
          ) : null}

          <button
            disabled={this.state.show || this.state.Project.state !== 3}
            className="btn btn-danger btn-sm btn-block"
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            {" "}
            submit{" "}
          </button>
        </td>
      </tr>
    );
  }
}

export default CrowdsSub;
