import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import History from "./echeances/history";
import UpToPay from "./echeances/upToPay";
import ToPay from "./echeances/toPay";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class EcheancesMenu extends Component {
  state = {
    // indexes
    echIndexes: [],
    // data
    echeances: [],
    // index
    ind: [],
    //render
    choix: 3
  };

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getEcheancesIndexes(
        { from: address },
        (error, res) => {
          let ech = [];
          for (let i = 0; i < res.length; i++) {
            ech[i] = res[i].c[0];
          }
          this.setState({ echIndexes: ech });
          console.log("eacheances", this.state.echIndexes);

          let y = [];
          let sp = [];
          let ine = [];
          for (let i = 0; i < this.state.echIndexes.length; i++) {
            web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .getEcheanceInfo(
                this.state.echIndexes[i],
                { from: address },
                (error, res) => {
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
                  if (
                    Date.now() / 1000 - 3456000 <= x.deadL &&
                    x.deadL <= Date.now() / 1000 + 3456000
                  ) {
                    sp.push(x);
                    console.log("sp", sp);
                    ine.push(this.state.echIndexes[i]);
                    console.log("ine", ine);
                  }
                  this.setState({ mane: sp });
                  this.setState({ ind: ine });
                  //console.log("x", x);
                  y.push(x);
                  this.setState({ echeances: y });
                }
              );
          }
          console.log("y", y);
          console.log("sp", sp);
        }
      );
  }

  showToPay = () => {
    this.setState({ choix: 1 });
  };

  showPaid = () => {
    this.setState({ choix: 2 });
  };

  showHistory = () => {
    this.setState({ choix: 3 });
  };

  render() {
    return (
      <React.Fragment>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                className="btn btn-outline-dark btn-block btn-sm"
                onClick={this.showToPay}
              >
                Echance To Pay
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-dark btn-block btn-sm"
                onClick={this.showPaid}
              >
                Up Coming Echeance
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-dark btn-block btn-sm"
                onClick={this.showHistory}
              >
                History
              </button>
            </div>
          </div>
          <hr />
          {this.handleRendering()}
        </div>
      </React.Fragment>
    );
  }

  handleRendering() {
    switch (this.state.choix) {
      case 1:
        return <ToPay ind={this.state.ind} />;
      case 2:
        return <UpToPay ech={this.state.echeances} />;
      case 3:
        return <History ech={this.state.echeances} />;
      default:
        break;
    }
  }
}

export default EcheancesMenu;
