import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared2";
import TransferDetails from "./transferDetails";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class TransferNews extends Component {
  state = {
    len: []
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    console.log("transferNews.js");
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getTransferLength(
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
            We're Sorry, Seems like there's no application for any deposite yet,
          </p>
          <footer className="blockquote-footer">
            <Link to="/">Back to Home Page</Link>
          </footer>
        </blockquote>
      );
    return (
      <React.Fragment>
        <div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Informations about the Client</th>
                <th scope="col">Accept</th>
                <th scope="col">Refuse</th>
                <th scope="col">Approve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.len.map(id => (
                <TransferDetails key={id} id={id} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default TransferNews;
