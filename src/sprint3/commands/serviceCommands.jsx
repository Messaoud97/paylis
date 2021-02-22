import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../../web3/shared3";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../../popup";
const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ServiceCommands extends Component {
  state = {
    idserv: 0,
    debut: 0,
    end: 0,
    address: "",
    date: 0,
    st: 0
  };

  componentDidMount() {
    console.log("serviceCommands.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getCommandServiceInfo(
        this.props.ids,
        { from: address },
        (err, res) => {
          console.log("idService", res[0].c[0]);
          console.log("debut", res[1].c[0]);
          console.log("end", res[2].c[0]);
          console.log("address", res[3]);
          console.log("date", res[4].c[0]);
          console.log("state", res[5].c[0]);
          this.setState({ idserv: res[0].c[0] });
          this.setState({ debut: res[1].c[0] });
          this.setState({ end: res[2].c[0] });
          this.setState({ address: res[3] });
          this.setState({ date: res[4].c[0] });
          this.setState({ st: res[5].c[0] });
        }
      );
  }

  handleAccept(x) {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .acceptServiceCommand(x, (err, res) => {
        console.log("accepted");
        this.setState({ st: 1 });
      });*/
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
        .acceptServiceCommand.getData(x);
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
      .refuseServiceCommand(x, (err, res) => {
        console.log("refused");
        this.setState({ st: 2 });
      });*/
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
        .refuseServiceCommand.getData(x);
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
        <th scope="row">{this.props.ids}</th>
        <td>
          <div>{this.zeyed()}</div>
        </td>
        <td>
          <ul>
            <li>
              <b>Debut:: </b>
              {new Date(this.state.debut * 1000).toDateString()}
            </li>
            <li>
              <b>End: </b>
              {new Date(this.state.end * 1000).toDateString()}
            </li>
          </ul>
        </td>
        <td>{new Date(this.state.date * 1000).toDateString()}</td>
        <td>{this.showState()}</td>

        <td className="table-active">
          <button
            disabled={this.state.st === 0 ? false : true}
            className="btn btn-success btn-sm btn-block"
            onClick={() => this.handleAccept(this.props.ids)}
          >
            {" "}
            accept
          </button>

          <button
            disabled={this.state.st === 0 ? false : true}
            className="btn btn-danger btn-sm btn-block"
            onClick={() => this.handleRefuse(this.props.ids)}
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

export default ServiceCommands;
