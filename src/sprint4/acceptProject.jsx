import React, { Component } from "react";
import { MDBListGroup } from "mdbreact";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import AcceptProjectSub from "./acceptProjectSub";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class AcceptProject extends Component {
  state = {
    indexes: []
  };

  componentDidMount() {
    console.log("acceptProject.jsx");
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
          console.log("indexes of my project", inds);
        }
      );
  }

  render() {
    return (
      <div className="container">
        <h2 className="fahmi p-3"> Project Demands </h2>

        <MDBListGroup style={{ width: "50rem" }}>
          {this.state.indexes.map(el => (
            <AcceptProjectSub key={el} idP={el} />
          ))}
        </MDBListGroup>
      </div>
    );
  }
}

export default AcceptProject;
