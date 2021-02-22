import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ContractsAbi, ContractAdress } from "../../web3/shared3";
import ProductCommands from "../commands/productCommands";
import Web3 from "web3";
const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class myCommandProductVertically extends React.Component {
  state = {
    len: []
  };

  componentDidMount() {
    console.log("myCommandProductVertically.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getCommandsofaParticularProduct(
        this.props.id,
        { from: address },
        (err, res) => {
          console.log("tableau", res);

          for (let i = 0; i < res.length; i++) {
            this.state.len.push(res[i].c[0]);
            this.setState({ len: this.state.len });
          }
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
          <Modal.Title id="contained-modal-title-vcenter">Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.len.length === 0 ? (
            <small className="pl-3">
              ..there's no commands on this product yet..
            </small>
          ) : (
            <table className="table">
              <thead align="center">
                <tr>
                  <th>Id Cmd</th>
                  <th>Requester</th>
                  <th>Date</th>
                  <th>Request State</th>
                  <th>Quantity</th>
                  <td />
                </tr>
              </thead>
              <tbody align="center">
                {this.state.len.map((el, index) => (
                  <ProductCommands key={el} idp={el} index={index} />
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-dark btn-sm btn-block"
            onClick={this.props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default myCommandProductVertically;
