import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../../web3/shared3";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../../popup";
const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ProductCommands extends Component {
  state = {
    idProd: 0,
    quantity: 0,
    address: "",
    date: 0,
    st: 0
  };

  componentDidMount() {
    console.log("productCommands.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getCommandProductInfo(
        this.props.idp,
        { from: address },
        (err, res) => {
          console.log("idProduct", res[0].c[0]);
          console.log("quantity", res[1].c[0]);
          console.log("address", res[2]);
          console.log("date", res[3].c[0]);
          console.log("state", res[4].c[0]);
          this.setState({ idProd: res[0].c[0] });
          this.setState({ quantity: res[1].c[0] });
          this.setState({ address: res[2] });
          this.setState({ date: res[3].c[0] });
          this.setState({ st: res[4].c[0] });
        }
      );
  }

  handleAccept(x) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .acceptProductCommand(x, (err, res) => {
        console.log("hash", res);
        console.log("accepted");
        this.setState({ st: 1 });
        web3.eth.getTransaction(res, (err, info) => {
          if (!err) {
            console.log(info);
          }
        });
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
        .acceptProductCommand.getData(x);
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
    console.log("accepted");
    this.setState({ st: 1 });
  }

  handleRefuse(x) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .refuseProductCommand(x, (err, res) => {
        console.log("accepted");
        this.setState({ st: 2 });
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
        .refuseProductCommand.getData(x);
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
    console.log("refused");
    this.setState({ st: 2 });
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.idp}</th>
        <td>
          <div>{this.zeyed()}</div>
        </td>
        <td>{new Date(this.state.date * 1000).toDateString()}</td>
        <td>{this.showState()}</td>
        <td>{this.state.quantity}</td>
        <td className="table-active">
          <button
            className="btn btn-success btn-sm btn-block"
            disabled={this.state.st === 0 ? false : true}
            onClick={() => this.handleAccept(this.props.idp)}
          >
            {" "}
            accept
          </button>

          <button
            className="btn btn-danger btn-sm btn-block"
            disabled={this.state.st === 0 ? false : true}
            onClick={() => this.handleRefuse(this.props.idp)}
          >
            {" "}
            decline
          </button>
        </td>
      </tr>
    );
  }

  zeyed() {
    let str = "";
    if (this.state.address.length > 10) {
      for (let i = 0; i < 12; i++) {
        str += this.state.address[i];
      }
    }
    return (str += "...");
  }

  showState() {
    switch (this.state.st) {
      case 0:
        return "requested";
      case 1:
        return "accepted";
      case 2:
        return "refused";
      case 3:
        return "paid";
      default:
        break;
    }
  }
}

export default ProductCommands;
