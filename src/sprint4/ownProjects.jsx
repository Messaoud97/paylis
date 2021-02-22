import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import ProjectSub from "./projectSub";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class OwnProjects extends Component {
  state = {
    indexes: []
  };

  componentDidMount() {
    console.log("ownProjects.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectIndexesOfaParticular(
        { from: address },
        (err, res) => {
          let inds = [];
          res.map(el => {
            inds.push(el.c[0]);
          });
          this.setState({ indexes: inds });
          console.log("indexes of my project", inds);
        }
      );
  }

  render() {
    if (this.state.indexes.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like you haven't published any project yet
          </p>
          <footer className="blockquote-footer">
            <Link to="/crowdForm">You can visit this form project</Link>
          </footer>
        </blockquote>
      );
    return (
      <React.Fragment>
        <div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Description of The Project</th>
                <th scope="col">Dead Line</th>
                <th scope="col">Amount Wanted</th>
                <th scope="col">Amount Collected</th>
                <th scope="col">Investors</th>
              </tr>
            </thead>
            <tbody>
              {this.state.indexes.map(el => (
                <ProjectSub key={el} idP={el} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default OwnProjects;
