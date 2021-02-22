import React, { Component } from "react";
import LoanDetails from "./loanDetails";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import { Link } from "react-router-dom";
import Tx from "ethereumjs-tx";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Choose extends Component {
  state = {
    len: []
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    console.log("choose.js");
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLengthListOfLoans(
        { from: address },
        (err, res) => {
          console.log(res);
          console.log("done");
          //this.setState({ len: res.c[0] });

          for (let i = 0; i < res.c[0]; i++) {
            this.state.len.push(i);
            this.setState({ len: this.state.len });
          }
          console.log(this.state.len);
        }
      );
  }

  render() {
    if (this.state.len.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like there's no application for any loan yet,
          </p>
          <footer className="blockquote-footer">
            <Link to="/">Back to Home Page</Link>
          </footer>
        </blockquote>
      );
    return (
      <React.Fragment>
        <div className="px-4 pt-3 ">
          <table className="table table-sm">
            <thead align="center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Informations about the Client</th>
                <th scope="col">accept</th>
                <th scope="col">refuse</th>
              </tr>
            </thead>

            <tbody align="center">
              {this.state.len.map(id => (
                <LoanDetails key={id} id={id} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Choose;
