import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../../web3/shared";
import { TokenAbi, TokenAddress } from "../../web3/TokenShared1";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../../popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ToPay extends Component {
  state = {
    element: []
  };

  componentDidMount() {
    console.log("toPay.jsx");
    var address = localStorage.getItem('address')
    let y = [...this.state.element];
    for (let i = 0; i < this.props.ind.length; i++) {
      web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress)
        .getEcheanceInfo(
          this.props.ind[i],
          { from: address },
          (error, res) => {
            console.log("that is it ", res);
            console.log("toPay ", this.props.ind[i]);
            let x = {
              adr: "",
              deadL: 0,
              amount: 0,
              state: 0
            };
            x.adr = res[0];
            x.deadL = res[1].c[0];
            x.amount = res[2].c[0];
            x.state = res[3].c[0];

            y.push(x);
            this.setState({ element: y });
          }
        );
    }
  }

  payin(x, index) {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .accomplishEcheance(x, this.state.element[index].amount, (error, res) => {
        console.log("paid");
        
      });*/
    let y = this.state.element[index].amount;
    console.log("begin");

    var address = localStorage.getItem('address');
    var pky = localStorage.getItem('privateKey');

    var privateKey = Buffer.from(
      pky,
      "hex"
    );
    //const web3 = new Web3("http://localhost:7545");
    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress)
        .accomplishEcheance.getData(x, y);
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
        if (!err){popup(); console.log(hash);}
        else console.log(err);
      });
    });
    console.log("paid");
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="fahmi">Financial Commitments </h3>
        {/* 
        {this.state.element.map((el, index) => (
          <div className="alert alert-success" key={el.deadL}>
            <b> Amount : {el.amount} $ -- </b>
            <b>DeadLine : {new Date(el.deadL * 1000).toDateString()} --</b>
            <b>State : {el.state === 0 ? "Not Paid" : "Already Paid"}</b>
            <button
              disabled={el.state === 0 ? false : true}
              className="btn btn-danger btn-sm btn-block"
              onClick={() => this.payin(this.props.ind[index], index)}
            >
              Pay Now
            </button>
          </div>
        ))}
        */}
        <ul class="list-group">
          {this.state.element.map((el, index) => (
            <li class="list-group-item">
              <div className="row">
                <div className="col fahmi">
                  Amount : <p className="text-danger">{el.amount} IMFT</p>
                  DeadLine : {new Date(
                    el.deadL * 1000
                  ).toDateString()} <br /> State :{" "}
                  {el.state === 0 ? "Not Paid" : "Already Paid"}
                </div>

                {/*
              <b> Amount : {el.amount} $ -- </b>
              <b>DeadLine : {new Date(el.deadL * 1000).toDateString()} --</b>
              <b>State : {el.state === 0 ? "Not Paid" : "Already Paid"}</b>
               
              <button
                disabled={el.state === 0 ? false : true}
                className="btn btn-danger btn-sm btn-block"
                onClick={() => this.payin(this.props.ind[index], index)}
              >
                Pay Now
              </button>
              
              <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              */}
                <div className="col">
                  <button
                    type="button"
                    disabled={el.state === 0 ? false : true}
                    className="btn btn-dark-green btn-sm btn-block fahmi"
                    onClick={() => this.payin(this.props.ind[index], index)}
                  >
                    Pay Now{" "}
                    {el.state === 0 ? (
                      <div
                        class="spinner-grow spinner-grow-sm text-light "
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : null}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default ToPay;
