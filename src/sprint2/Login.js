import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared2";
import { MDBInput } from "mdbreact";
import aze from "../ressources/dark.png";
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";
import popup2 from "../popup2.js";


const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Login extends Component {
  
  state = {
    fname: "",
    lname: "",
    cin: "",
    email: "",
    adr: "",
    city: "",
    number: "",
    amount: 0
  };

  constructor() {
    super();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleCINChange = this.handleCINChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ fname: e.target.value });
  }

  handleLastChange(e) {
    this.setState({ lname: e.target.value });
  }

  handleCINChange(e) {
    this.setState({ cin: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ adr: e.target.value });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  handleNumberChange(e) {
    this.setState({ number: e.target.value });
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleSubmit() {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newTransfer(
        this.state.fname, this.state.lname, this.state.cin, this.state.email, this.state.adr, this.state.city, this.state.number, this.state.amount,
        (err, res) => {
          console.log("demande de fonds declaré");
        }
      );
      */
    let fname = this.state.fname;
    let lname = this.state.lname;
    let cin = this.state.cin;
    let email = this.state.email;
    let adr = this.state.adr;
    let city = this.state.city;
    let number = this.state.number;
    let amount = this.state.amount;
    if(fname==''||lname==''||email==''||adr==''||city==''||amount==''||number==''||cin=='') {
      popup2()    } else {
    console.log("begin");

    var address = localStorage.getItem('address')
    var pky = localStorage.getItem('privateKey')

    var privateKey = Buffer.from(
      pky,
      "hex"
    );

    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .newTransfer.getData(
          fname,
          lname,
          cin,
          email,
          adr,
          city,
          number,
          amount
        );
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
        if (!err) {
          console.log(hash);popup()
        } else console.log(err);
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
            Deposit Funds
          </h1>

          <div className="col-md-12 mb-5">
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-row">
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
                    onChange={this.handleLastChange}
                    outline
                  />
                </div>
              </div>
              <div className="form-group">
                <MDBInput
                  label="Identity Card Number"
                  type="number"
                  onChange={this.handleCINChange}
                  outline
                />
              </div>

              <div className="form-group">
                <MDBInput
                  label="E-mail"
                  onChange={this.handleEmailChange}
                  outline
                />
              </div>
              <div className="form-group">
                <MDBInput
                  label="Address"
                  onChange={this.handleAddressChange}
                  outline
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <MDBInput
                    label="City"
                    onChange={this.handleCityChange}
                    outline
                  />
                </div>
                <div className="form-group col-md-6">
                  <MDBInput
                    label="Phone Number"
                    type="number"
                    onChange={this.handleNumberChange}
                    outline
                  />
                </div>
              </div>
              <div className="form-group">
                <MDBInput
                  label="Amount to be deposited"
                  className=" yellow lighten-4"
                  type="number"
                  onChange={this.handleAmountChange}
                  outline
                />
              </div>

              <small id="emailHelp" className="form-text text-muted">
                We'll never share your details with anyone else.
              </small>

              <button
                type="submit"
                className="btn btn-success py-2 px-4 btn-block text-white fahmi"
                onClick={() => this.handleSubmit()}
              >
                Submit form
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
