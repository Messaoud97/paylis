import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import ModalToSeeInvs from "./modalToSeeInvs";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ProjectSub extends Component {
  state = {
    Project: {
      owner: "",
      contact: 0,
      demanderAdd: "",
      title: "",
      deadLine: 0,
      description: "",
      amount: 0,
      collected: 0,
      state: 0
    },
    modalShow: false
  };

  constructor() {
    super();
    //  this.state = { modalShow: false };
  }

  componentDidMount() {
    console.log("ProjectSub.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProjectInfo(
        this.props.idP,
        { from: address },
        (err, res) => {
          let Project = {};
          Project.owner = res[0];
          Project.contact = res[1].c[0];
          Project.demanderAdd = res[2];
          Project.title = res[3];
          Project.deadLine = res[4].c[0];
          Project.description = res[5];
          Project.amount = res[6].c[0];
          Project.collected = res[7].c[0];
          Project.state = res[8].c[0];
          this.setState({ Project });
          console.log("project", this.state.Project);
        }
      );
  }

  render() {
    if (this.state.Project.state === 4 || this.state.Project.state === 0)
      return null;
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <tr>
        <td>
          <ul type="none">
            <li>
              {" "}
              <b>Project ID :</b> {this.props.idP}
            </li>
            <li>
              <b>Project Title: </b>
              {this.state.Project.title}
            </li>
            <li>
              <b>Project Description:</b>
              {this.state.Project.description}
            </li>
            <li>
              <b>State :</b>
              {this.state.Project.state === 3 ? "Available" : "Closed"}
            </li>
          </ul>
        </td>

        <td>{new Date(this.state.Project.deadLine * 1000).toDateString()}</td>
        <td>{this.state.Project.amount}</td>
        <td>{this.state.Project.collected}</td>
        <td>
          <ButtonToolbar>
            <Button
              variant="primary btn-sm btn-block"
              onClick={() => this.setState({ modalShow: true })}
            >
              {" "}
              See The Investor of This Project
            </Button>

            <ModalToSeeInvs
              show={this.state.modalShow}
              onHide={modalClose}
              idp={this.props.idP}
            />
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

export default ProjectSub;
