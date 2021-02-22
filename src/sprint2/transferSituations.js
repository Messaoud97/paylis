import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared2";
import TransferSub from "./transferSub";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class TransferSituations extends Component {
  state = {
    len: [],
    b: false
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    console.log("trasnferSituation.js");
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLengthOfParticularTransfer(
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
              .getAccountTransferIndex(
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
    return (
      <React.Fragment>
        {this.state.b === true ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Informations of the Diposite</th>
                  <th scope="col">State</th>
                  <th scope="col">transfer preparation</th>
                </tr>
              </thead>
              <tbody>
                {this.state.len.map((id, index) => (
                  <TransferSub key={id} id={id} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              We're Sorry, Seems like you haven't applied for any fund deposite
              yet, Please visit our deposite form and fill it.
            </p>
            <footer className="blockquote-footer">
              <Link to="/deposer">Deposit Funds Form</Link>
            </footer>
          </blockquote>
        )}
      </React.Fragment>
    );
  }
}

export default TransferSituations;
