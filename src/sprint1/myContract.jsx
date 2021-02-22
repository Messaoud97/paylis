import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import ContractDetails from "./contractDetails";
import Web3 from "web3";
const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class MyContract extends React.Component {
  state = {
    len: []
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProposalIndexsLoan(
        { from: address },
        (error, res) => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            this.state.len.push(res[i].c[0]);
            this.setState({ len: this.state.len });
          }
          console.log(this.state.len);
        }
      );
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.len.map(el => (
            <ContractDetails key={el} idc={el} idl={this.props.idl} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-dark btn-bg btn-block"
            onClick={this.props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyContract;
