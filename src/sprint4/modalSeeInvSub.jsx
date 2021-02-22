import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ModalSeeInvSub extends Component {
  state = {
    Investment: {
      owner: "",
      date: 0,
      amount: 0,
      projectID: 0
    }
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .InvestmentInfo(
        this.props.idI,
        { from: address },
        (err, res) => {
          console.log(res);

          let Investment = {};
          Investment.owner = res[0];
          Investment.amount = res[1].c[0];
          Investment.date = res[2].c[0];
          Investment.projectID = res[3].c[0];

          this.setState({ Investment });
          console.log("Investment", this.state.Investment);
        }
      );
  }

  render() {
    return (
      <li className="list-group-item">
        <b>Address of Owner : </b> {this.state.Investment.owner} <br />
        <b>Amount Applied : </b> {this.state.Investment.amount} <br />
        <b>Date of Application : </b>{" "}
        {new Date(this.state.Investment.date * 1000).toDateString()}
      </li>
    );
  }
}

export default ModalSeeInvSub;
