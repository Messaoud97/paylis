import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import Button from "react-bootstrap/Button";
import MyVerticallyTheni from "./boot/myVerticallyTheni";
import { MDBInput } from "mdbreact";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";
const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ServDetails extends Component {
  state = {
    show: false,
    froms: 0,
    tos: 0,
    title: "",
    img: "",
    price: "",
    debut: "",
    end: "",
    description: "",
    st: ""
  };

  constructor() {
    super();
    this.state = { modalShow: false };
    this.handleFrom = this.handleFrom.bind(this);
    this.handleTo = this.handleTo.bind(this);
  }

  componentDidMount() {
    var address = localStorage.getItem('address');
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getServicesInfo(
        this.props.id,
        { from: address },
        (err, res) => {
          console.log(res);
          this.setState({ img: res[0] });
          this.setState({ title: res[1] });
          this.setState({ price: res[2].c[0] });
          this.setState({ debut: res[3].c[0] });
          this.setState({ end: res[4].c[0] });
          this.setState({ description: res[5] });
          this.setState({ st: res[6].c[0] });
        }
      );
  }

  handleCommanding(x, y, z) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newServiceCommand(x, y, z, (err, res) => {
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
        .newServiceCommand.getData(x, y, z);
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

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>
          <div>
            {" "}
            <b>{this.state.title}</b>
          </div>
          <img
            src={this.state.img}
            className="rounded img-thumbnail"
            style={{ width: "15rem", height: "10rem" }}
            alt="service"
          />
        </td>
        <td>
          <ul align="left">
            <li>
              {" "}
              <b>Price</b> :{" "}
              <span className="text-success"> {this.state.price}$</span>
            </li>
            <li>
              {" "}
              <b>Debut Date</b> :{" "}
              {new Date(this.state.debut * 1000).toDateString()}
            </li>
            <li>
              <b>End Date</b> : {new Date(this.state.end * 1000).toDateString()}
            </li>
          </ul>
        </td>
        <td>
          <Button
            className="btn btn-secondary btn-sm"
            onClick={() => this.setState({ modalShow: true })}
          >
            click here for details
          </Button>

          <MyVerticallyTheni
            show={this.state.modalShow}
            onHide={modalClose}
            title={this.state.title}
            description={this.state.description}
          />
        </td>
        <td className="text-success">
          <b>{this.state.st === 0 ? "Available" : "Unavailable"}</b>
        </td>
        <td>
          <button
            className="btn btn-outline-danger fahmi btn-block btn-sm"
            disabled={this.state.show}
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            command <i className="fas fa-cart-plus" />
          </button>

          {this.state.show === true ? (
            <div className="container">
              <div className="row">
                <div className="col">
                  <MDBInput
                    type="date"
                    label="Debut Service"
                    onChange={this.handleFrom}
                    outline
                  />
                </div>

                <div className="col">
                  <MDBInput
                    type="date"
                    label="End Service"
                    onChange={this.handleTo}
                    outline
                  />
                </div>
              </div>

              <button
                className="btn btn-success fahmi btn-block btn-sm"
                onClick={() =>
                  this.handleCommanding(
                    this.props.id,
                    this.state.froms,
                    this.state.tos
                  )
                }
              >
                submit
              </button>
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

  handleFrom(e) {
    this.setState({ froms: new Date(e.target.value) / 1000 });
  }

  handleTo(e) {
    this.setState({ tos: new Date(e.target.value) / 1000 });
  }
}

export default ServDetails;
