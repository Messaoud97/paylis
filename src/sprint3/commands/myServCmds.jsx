import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../../web3/shared3";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class MyServCmds extends Component {
  state = {
    ids: 0,
    deb: 0,
    end: 0,
    datec: 0,
    st: 0
  };

  componentDidMount() {
    console.log("myServCmds.jsx");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getCommandServiceInfo(
        this.props.idsc,
        { from: address },
        (err, res) => {
          console.log(res);
          this.setState({ ids: res[0].c[0] });
          this.setState({ deb: res[1].c[0] });
          this.setState({ end: res[2].c[0] });
          this.setState({ datec: res[4].c[0] });
          this.setState({ st: res[5].c[0] });
        }
      );
  }

  handleTransfer = (x, y) => {
    /*
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .confirmSTransfer(y, (err, res) => {
        console.log("consider it done");
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
        .confirmSTransfer.getData(y);
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
        if (!err) {popup();console.log(hash);} 
        else console.log(err);
      });
    });
    console.log("consider it done");
  };

  render() {
    return (
      <tr>
        <td>{this.props.idsc}</td>
        <td>{this.state.ids}</td>
        <td>
          <ul>
            <li>
              <b>debut: </b>
              {new Date(this.state.deb * 1000).toDateString()}
            </li>
            <li>
              <b>end: </b>
              {new Date(this.state.end * 1000).toDateString()}
            </li>
          </ul>
        </td>
        <td>{new Date(this.state.datec * 1000).toDateString()}</td>
        <td>{this.showState()}</td>
        <td>
          <button
            className="btn btn-success fahmi btn-sm btn-block"
            disabled={this.state.st === 1 ? false : true}
            onClick={() => this.handleTransfer(this.state.ids, this.props.idsc)}
          >
            {" "}
            send{" "}
          </button>
        </td>
      </tr>
    );
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

export default MyServCmds;
