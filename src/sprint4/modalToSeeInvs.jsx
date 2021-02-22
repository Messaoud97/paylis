import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import ModalSeeInvSub from "./modalSeeInvSub";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ModalToSeeInvs extends Component {
  state = {
    invIndex: []
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getInvestmentIndexesOfaParticularProject(
        this.props.idp,
        { from: address },
        (err, res) => {
          let inds = [];
          res.map(el => {
            inds.push(el.c[0]);
          });
          this.setState({ invIndex: inds });
          console.log("indexes of investment of this partical project", inds);
        }
      );
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <b>Investments on your Future Project</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.invIndex.length === 0 && (
            <small className="text-danger">
              ..there's no investments yet..
            </small>
          )}
          <ul className="list-group list-group-flush">
            {this.state.invIndex.map(el => (
              <ModalSeeInvSub key={el} idI={el} />
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} className=" btn-sm">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalToSeeInvs;
