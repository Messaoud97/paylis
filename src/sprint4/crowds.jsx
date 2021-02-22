import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import CrowdsSub from "./crowdsSub";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Crowds extends Component {
  state = {
    indexes: [],
    dedicated: []
  };
  /*
componentDidMount() {
    console.log("crowds.jsx");
    let inds = [];
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectListLength((err, res) => {
        for (let i = 0; i < res.c[0]; i++) {
          window.web3.eth
            .contract(ContractsAbi)
            .at(ContractAdress)
            .getProjectInfo(i, (err, res) => {
              console.log("ppppp", res[8].c[0]);
              if (res[8].c[0] !== 0 || res[8].c[0] !== 4) {
                inds.push(i);
              }
            });
        }
        this.setState({ indexes: inds });
      });
  }
  */

  componentDidMount() {
    console.log("crowds.jsx1");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectListLength(
        { from: address },
        (err, res) => {
          let inds = [];
          for (let i = 0; i < res.c[0]; i++) {
            inds.push(i);
          }

          this.setState({ indexes: inds });
          console.log("indexes of my project1", this.state.indexes.length);

          var de = [...this.state.dedicated];
          this.state.indexes.filter(i =>
            web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .getProjectInfo(
                i,
                { from: address },
                (err, res) => {
                  console.log("right here");
                  console.log("ppppp2", res.valueOf());
                  if (
                    res[8].c[0] === 1 ||
                    res[8].c[0] === 2 ||
                    res[8].c[0] === 3
                  ) {
                    de.push(i);
                    console.log("de.push(i);", de.length);
                  }
                  this.setState({ dedicated: de });
                }
              )
          );
        }
      );

    console.log("crowds.jsx2");

    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectListLength((err, res) => {
        
        for (let i = 0; i < res.c[0]; i++) {
          window.web3.eth
            .contract(ContractsAbi)
            .at(ContractAdress)
            .getProjectInfo(i, (err, res) => {
              console.log("ppppp2", res.valueOf());
              if (res[8].c[0] === 1 || res[8].c[0] === 2 || res[8].c[0] === 3) {
                de.push(i);
              }
            });
        }
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", de);
        this.setState({ dedicated: de }, () => {
          console.log("length of dedicated", de);
        });
      });
      */
  }

  render() {
    if (this.state.dedicated.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like Projects list is empty in the current moment
          </p>
          <footer className="blockquote-footer">
            <Link to="/">Back to Home page</Link>
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
                <th scope="col">Description of The Project To be Funded</th>
                <th scope="col">DeadLine</th>
                <th scope="col">Details of Publisher</th>
                <th scope="col">Wanted</th>
                <th scope="col">Collected</th>
                <th scope="col" style={{ width: "20%", textAlign: "center" }}>
                  Invest
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.indexes.map(el => (
                <CrowdsSub key={el} idP={el} />
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Crowds;
