import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./boot/myVerticallyCenteredModal";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ProdDetails extends Component {
  state = {
    show: false,
    propose: 0,

    title: "",
    img: "",
    price: 0,
    quantity: 0,
    description: "",
    brand: "",
    st: ""
  };

  constructor() {
    super();
    this.state = { modalShow: false };
    this.handleqte = this.handleqte.bind(this);
  }

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProductsInfo(
        this.props.id,
        { from: address },
        (err, res) => {
          console.log(res);
          this.setState({ img: res[0] });
          this.setState({ title: res[1] });
          this.setState({ price: res[2].c[0] });
          this.setState({ quantity: res[3].c[0] });
          this.setState({ description: res[4] });
          this.setState({ brand: res[5] });
          this.setState({ st: res[6].c[0] });
        }
      );
  }

  handleCommanding(x, y) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newProductCommand(x, y, (err, res) => {
        console.log("command is handled");
      });
      */

    console.log("begin");

    var address = localStorage.getItem('address')
    var pky = localStorage.getItem('privateKey')

    var privateKey = Buffer.from(
      pky,
      "hex"
    );

    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress)
        .newProductCommand.getData(x, y);
      console.log("begin2");
      console.log(d);
      var tx = new Tx({
        nonce: nonce,
        gasPrice: "0x4a817c800",
        gasLimit: "0x300000",
        to: ContractAdress,
        value: 0,
        data: d
      });

      tx.sign(privateKey);
      var serializedTx = tx.serialize();
      web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"), function(
        err,
        hash
      ) {
        if (!err) {console.log(hash);popup()}
        else console.log(err);
      });
    });
    console.log("command is handled");
  }

  handleqte(e) {
    this.setState({ propose: e.target.value });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <tr className={this.state.quantity === 0 && "table-active"}>
        <td>{this.props.id}</td>
        <td>
          <div>
            <b>{this.state.title}</b>
          </div>
          <img
            src={this.state.img}
            className="rounded img-thumbnail"
            style={{ width: "15rem", height: "10rem" }}
            alt="produit"
          />
        </td>

        <td>
          <Button
            className="btn btn-secondary btn-sm"
            onClick={() => this.setState({ modalShow: true })}
          >
            click here for details
          </Button>

          <MyVerticallyCenteredModal
            title={this.state.title}
            price={this.state.price}
            quantity={this.state.quantity}
            description={this.state.description}
            brand={this.state.brand}
            show={this.state.modalShow}
            onHide={modalClose}
          />
        </td>

        <td>
          {this.state.quantity !== 0 ? (
            <b className="text-success">Available</b>
          ) : (
            <b>Not Available Anymore</b>
          )}
        </td>
        <td>
          <button
            className="btn btn-outline-danger fahmi btn-block btn-sm"
            disabled={this.state.show || this.state.quantity === 0}
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            command <i className="fas fa-cart-plus" />
          </button>

          {this.state.show === true ? (
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <input
                    className=" form-control-sm"
                    type="text"
                    placeholder="quantity"
                    onChange={this.handleqte}
                  />
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-success fahmi btn-block btn-sm"
                    onClick={() =>
                      this.handleCommanding(this.props.id, this.state.propose)
                    }
                  >
                    submit
                  </button>
                </div>
              </div>
              <button
                className="btn btn-outline-dark btn-block btn-sm"
                onClick={() => {
                  this.setState({ show: false });
                }}
              >
                cancel command <i className="fas fa-caret-up" />
              </button>
            </div>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default ProdDetails;
