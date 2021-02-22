import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import InvestmentSub from "./investmentSub";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class OwnInvestment extends Component {
  state = {
    indexes: []
  };

  componentDidMount() {
    console.log("ownInvestesment.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getInvestmentIndexesOfaParticularAdherant(
        { from: address },
        (err, res) => {
          let inds = [];
          res.map(el => {
            inds.push(el.c[0]);
          });
          this.setState({ indexes: inds });
          console.log("inves", inds);
        }
      );
  }

  render() {
    if (this.state.indexes.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like you haven't invested in any project out
            there
          </p>
          <footer className="blockquote-footer">
            <Link to="/crowds">
              You can visit this link to apply for a project
            </Link>
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
                <th scope="col">My Public Key</th>
                <th scope="col">Project ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.indexes.map((el, index) => (
                <InvestmentSub key={el} idI={el} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default OwnInvestment;
