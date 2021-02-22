import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared4";
import { MDBInput } from "mdbreact";
import aze from "../ressources/dark.png";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";
import popup2 from "../popup2.js";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class CrowdForm extends Component {
  state = {
    account: {
      name: "",
      contact: 0,
      title: "",
      dateL: 0,
      desc: "",
      amount: 0
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = () => {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newProject(
        this.state.account.name,
        this.state.account.contact,
        this.state.account.title,
        new Date(this.state.account.dateL) / 1000,
        this.state.account.desc,
        this.state.account.amount,
        (err, res) => {
          console.log("announcement approved");
        }
      );
    console.log("submitted");
    */

    let name = this.state.account.name;
    let contact = this.state.account.contact;
    let title = this.state.account.title;
    let dateL = new Date(this.state.account.dateL) / 1000;
    let desc = this.state.account.desc;
    let amount = this.state.account.amount;
    if(name==''||contact==''||title==''||dateL==''||desc==''||amount=='') {
      popup2()    } else {
    console.log("begin");

    var address = localStorage.getItem('address')
    var pky = localStorage.getItem('privateKey')

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
        .newProject.getData(name, contact, title, dateL, desc, amount);
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
    console.log("announcement approved");
  };
  }
  render() {
    const { name, contact, title, dateL, desc, amount } = this.state;
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
          className="container center_div p-4 white rounded shadow-sm"
          style={{ width: "65%", paddingBottom: "15px" }}
        >
          <h1 className="font-weight-bold text-center fahmi red-text accent-4">
            Publish An Announcement
          </h1>
          <div className="col-md-12 mb-5">
            <form onSubmit={e => e.preventDefault()}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <MDBInput
                    label="Full Name"
                    onChange={this.handleChange}
                    value={name}
                    name="name"
                    outline
                  />
                </div>
                <div class="form-group col-md-6">
                  <MDBInput
                    label="Contact (phone_number)"
                    type="number"
                    onChange={this.handleChange}
                    value={contact}
                    name="contact"
                    outline
                  />
                </div>
                <div class="form-group col-md-6">
                  <MDBInput
                    label="Project Title"
                    onChange={this.handleChange}
                    value={title}
                    name="title"
                    outline
                  />
                </div>
                <div class="form-group col-md-6">
                  <MDBInput
                    label="Project Deadline"
                    type="date"
                    onChange={this.handleChange}
                    value={dateL}
                    name="dateL"
                    outline
                  />
                </div>
              </div>
              <div class="form-group">
                <MDBInput
                  label="Description Of The Project"
                  type="textarea"
                  style={{ width: "100%" }}
                  value={desc}
                  name="desc"
                  onChange={this.handleChange}
                  outline
                />
              </div>

              <div
                class="form-group"
                style={{
                  textAlign: "center",
                  marginLeft: "150px",
                  marginRight: "150px"
                }}
              >
                <MDBInput
                  label="Amount Wanted"
                  type="number"
                  onChange={this.handleChange}
                  value={amount}
                  name="amount"
                  outline
                />
              </div>

              <button
                type="submit"
                className="btn btn-success py-2 px-4 btn-block text-white fahmi"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default CrowdForm;
