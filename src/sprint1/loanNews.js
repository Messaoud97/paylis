import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import MyContract from "./myContract";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class LoanNews extends Component {
  state = {
    hide: false,
    pubKey: "",
    name: "",
    lname: "",
    credit: 0,
    loanState: 0
  };

  constructor() {
    super();
    this.state = { modalShow: false };
  }

  componentDidMount() {
    console.log("loanNews.js");
    var address = localStorage.getItem('address')

    const x = this.props.id;
    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLoanState(
        x,
        { from: address },
        (err, res) => {
          this.setState({ loanState: res.c[0] });
          console.log("x is : ", x);
          console.log("loan state is : ", res.c[0]);
        }
      );
  }

  handleListing(_id) {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLoanById(
        _id,
        { from: address },
        (error, res) => {
          this.setState({ pubKey: res[0] });
          this.setState({ name: res[1] });
          this.setState({ lname: res[2] });
          this.setState({ credit: res[6].c[0] });
          console.log("key", this.state.pubKey);
          console.log("name", this.state.name);
          console.log("lname", this.state.lname);
          console.log("credit", this.state.credit);
          console.log("loan state", this.state.loanState);

          this.setState({ hide: !this.state.hide });
        }
      );
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <tr>
        <th scope="row" align="center">
          {this.props.index}
        </th>
        <td>
          <input
            type="button"
            className="btn btn-secondary text-white btn-block btn-sm"
            value={!this.state.hide ? "Show Details" : "Hide Details"}
            onClick={() => this.handleListing(this.props.id)}
          />
          {this.state.hide ? (
            <React.Fragment>
              <br />
              <b>key Client: </b> {this.state.pubKey} <br />
              <b>First Name Client: </b> {this.state.name} <br />
              <b>Last Name Client: </b> {this.state.lname} <br />
              <b>Amount Wanted: </b> {this.state.credit} <br />
              <b>Loan state: </b> {this.stateShow()} <br />
              <button
                disabled={
                  this.state.loanState === 0 || this.state.loanState === 2
                    ? true
                    : false
                }
                className="btn btn-outline-info btn-sm"
                className={
                  this.state.loanState === 1
                    ? "btn btn-info btn-sm"
                    : "btn btn-outline-info btn-sm"
                }
                onClick={() => this.setState({ modalShow: true })}
              >
                see the contract
              </button>
              <MyContract
                idl={this.props.id}
                show={this.state.modalShow}
                onHide={modalClose}
              />
            </React.Fragment>
          ) : null}
        </td>
        <th className="pl-5">
          {" "}
          the state of this particular loan is:{" "}
          <span className={this.pickColor()}>{this.stateShow()}</span>
        </th>
      </tr>
    );
  }

  pickColor() {
    let str = "fahmi text-";
    if (this.state.loanState === 0) str += "dark";
    else if (this.state.loanState === 1) str += "success";
    else str += "danger";
    return str;
  }

  stateShow() {
    switch (this.state.loanState) {
      case 0:
        return "Waiting";
      case 1:
        return "Accepted";
      case 2:
        return "Refused";
      default:
        break;
    }
  }
}

export default LoanNews;
