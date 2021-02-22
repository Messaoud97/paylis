import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import aze from "../ressources/dark.png";
import Tx from "ethereumjs-tx";
//const Web3 = require("web3");
import Web3 from "web3";
import popup from "../popup.js";
import popup2 from "../popup2.js";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Subscribe extends Component {
  state = {
    result: [],
    // proposal
    name: "",
    lname: "",
    email: "",
    adress: "",
    motivation: "",
    credit: 0
    // eacheanceIndexes
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handleadressChange = this.handleadressChange.bind(this);
    this.handlemotivationChange = this.handlemotivationChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleLnameChange(e) {
    this.setState({ lname: e.target.value });
  }

  handleemailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleadressChange(e) {
    this.setState({ adress: e.target.value });
  }

  handlemotivationChange(e) {
    this.setState({ motivation: e.target.value });
  }

  handleCreditChange(e) {
    this.setState({ credit: e.target.value });
  }
  handleres(res) {
    this.setState({ result: res });
  }

  handleSubmit() {
    let name = this.state.name;
    let lname = this.state.lname;
    let email = this.state.email;
    let adress = this.state.adress;
    let motivation = this.state.motivation;
    let credit = this.state.credit;
    if(name==''||lname==''||email==''||adress==''||motivation==''||credit=='') {
      popup2()    } 
      else{
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newLoan(name, lname, email, adress, motivation, credit, function() {
        console.log("done");
      });
      */
    /********************************************** */
    /*
      window.web3.eth.getAccounts((error, accounts) => {
        this.setState({ account: accounts[0] }); 
      });
      */

    console.log("begin");

    var address = localStorage.getItem('address')
    var pky=localStorage.getItem('privateKey');
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
        .newLoan.getData(name, lname, email, adress, motivation, credit);
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
        if (!err) {console.log(hash);
          popup()
        }
        else console.log(err);
      });
    });
  }
  }
  render() {
    let Background = aze;
    var sectionStyle = {
      width: "100%",
      height: "690px",
      backgroundImage: `url(${Background})`,
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };
    return (
      <section style={sectionStyle}>
        <div
          className="container center_div p-2 white rounded shadow-sm"
          style={{ width: "60%" }}
        >
          <h1 className="font-weight-bold text-center fahmi red-text accent-4">
            Demand For Credits
          </h1>
          <div className="col-md-12 mb-5">
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-row col-md-12">
                <div className="form-group col-md-6">
                  <MDBInput
                    label="First Name"
                    onChange={this.handleNameChange}
                    outline
                  />
                </div>
                <div className="form-group col-md-6">
                  <MDBInput
                    label="Last Name"
                    onChange={this.handleLnameChange}
                    outline
                  />
                </div>
              </div>

              <div className="col-md-12">
                <MDBInput
                  label="E-mail"
                  onChange={this.handleemailChange}
                  outline
                />
              </div>

              <div className="col-md-12">
                <MDBInput
                  label="Address"
                  onChange={this.handleadressChange}
                  outline
                />
              </div>

              <div className="col-md-12">
                <MDBInput
                  label="Demand Motivation"
                  onChange={this.handlemotivationChange}
                  outline
                />
              </div>

              <div className="col-md-12">
                <MDBInput
                  type="number"
                  label="Credit Amount"
                  onChange={this.handleCreditChange}
                  outline
                />
              </div>

              <div className="col-md-12">
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-success py-2 px-4 btn-block text-white fahmi"
                >
                  Send request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Subscribe;
