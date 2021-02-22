import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";

import Tx from "ethereumjs-tx";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class InvestmentSub extends Component {
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

    window.web3.eth
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
      <tr>
        <td>{this.props.index}</td>
        <td>
          <b>My Adr: </b>
          {this.state.Investment.owner}
        </td>
        <td>{this.state.Investment.projectID}</td>
        <td>{this.state.Investment.amount}</td>
        <td>{new Date(this.state.Investment.date * 1000).toDateString()}</td>
      </tr>
    );
  }
}

export default InvestmentSub;
