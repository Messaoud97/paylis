import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import LoanNews from "./loanNews";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class LoanSituation extends Component {
  state = {
    len: [],
    b: false
  };

  componentDidMount() {
    console.log("loanSituation.js");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLengthOfParticularLoan(
        { from: address },
        (err, res) => {
          console.log(res);
          console.log("done1");
          if (res.c[0] > 0) this.setState({ b: true });

          for (let i = 0; i < res.c[0]; i++) {
            console.log("--------");
            /*
          this.state.len.push(i);
          this.setState({ len: this.state.len });
          */
            web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .getAccountEl(
                i,
                { from: address },
                (err, res) => {
                  console.log(res.c[0]);
                  console.log("done2");
                  this.state.len.push(res.c[0]);
                  this.setState({ len: this.state.len });
                }
              );
          }
          console.log(this.state.len);
        }
      );
  }

  increment() {
    this.setState({ i: this.state.i + 1 });
  }

  render() {
    if (this.state.len.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like you haven't applied for any loan yet, Please
            visit our Demand form and fill it.
          </p>
          <footer className="blockquote-footer">
            <Link to="/demande">Request for credits</Link>
          </footer>
        </blockquote>
      );
    return (
      <React.Fragment>
        <div className="px-4 pt-3">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Informations of the Loan</th>
                <th scope="col" className="pl-5">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.len.map((id, index) => (
                <LoanNews key={id} id={id} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default LoanSituation;
