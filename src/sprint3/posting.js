import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import { MDBInput } from "mdbreact";
import aze from "../ressources/dark.png";

import Tx from "ethereumjs-tx";
import Web3 from "web3";
import popup from "../popup";
import popup2 from "../popup2.js";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Posting extends Component {
  state = {
    form: 0,

    serviceTitle: "",
    serviceDebut: 0,
    serviceEnd: 0,
    serviceDescription: "",
    serviceImg: "",
    servicePrice: 0,

    productTitle: "",
    productBrand: "",
    productDescription: "",
    productImg: "",
    productPrice: 0,
    productQuantity: 0
  };

  constructor() {
    super();

    // prod funcs
    this.handleProdTitle = this.handleProdTitle.bind(this);
    this.handleProdBrand = this.handleProdBrand.bind(this);
    this.handleProdDescription = this.handleProdDescription.bind(this);
    this.handleProdImg = this.handleProdImg.bind(this);
    this.handleProdPrice = this.handleProdPrice.bind(this);
    this.handleProdQuantity = this.handleProdQuantity.bind(this);

    // serv funcs
    this.handleServTitle = this.handleServTitle.bind(this);
    this.handleServDebut = this.handleServDebut.bind(this);
    this.handleServEnd = this.handleServEnd.bind(this);
    this.handleServDescription = this.handleServDescription.bind(this);
    this.handleServImg = this.handleServImg.bind(this);
    this.handleServPrice = this.handleServPrice.bind(this);
  }
  // prod funcs
  handleProdTitle(e) {
    this.setState({ productTitle: e.target.value });
  }
  handleProdBrand(e) {
    this.setState({ productBrand: e.target.value });
  }
  handleProdDescription(e) {
    this.setState({ productDescription: e.target.value });
  }
  handleProdImg(e) {
    this.setState({ productImg: e.target.value });
  }
  handleProdPrice(e) {
    this.setState({ productPrice: e.target.value });
  }
  handleProdQuantity(e) {
    this.setState({ productQuantity: e.target.value });
  }

  // serv funcs
  handleServTitle(e) {
    this.setState({ serviceTitle: e.target.value });
  }
  handleServDebut(e) {
    console.log(new Date(e.target.value) / 1000);
    //let date = (new Date()).getTime();
    //let birthDateInUnixTimestamp = date / 1000;
    this.setState({ serviceDebut: new Date(e.target.value) / 1000 });
  }
  handleServEnd(e) {
    this.setState({ serviceEnd: new Date(e.target.value) / 1000 });
  }
  handleServDescription(e) {
    this.setState({ serviceDescription: e.target.value });
  }
  handleServImg(e) {
    this.setState({ serviceImg: e.target.value });
  }
  handleServPrice(e) {
    this.setState({ servicePrice: e.target.value });
  }

  handleSubmitProd() {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newProduct(
        this.state.productImg,
        this.state.productTitle,
        this.state.productPrice,
        this.state.productQuantity,
        this.state.productDescription,
        this.state.productBrand,

        (err, res) => {
          console.log("product declared");
        }
      );
      */
    let productImg = this.state.productImg;
    let productTitle = this.state.productTitle;
    let productPrice = this.state.productPrice;
    let productQuantity = this.state.productQuantity;
    let productDescription = this.state.productDescription;
    let productBrand = this.state.productBrand;

    if(productImg==''||productTitle==''||productPrice==''||productQuantity==''||productDescription==''||productBrand=='') {
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
        .newProduct.getData(
          productImg,
          productTitle,
          productPrice,
          productQuantity,
          productDescription,
          productBrand
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
        if (!err) {console.log(hash);popup()}
        else console.log(err);
      });
    });
    console.log("product declared");
  }
  }
  handleSubmitServ() {
    /*
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .newService(
        this.state.serviceImg,
        this.state.serviceTitle,
        this.state.servicePrice,
        this.state.serviceDebut,
        this.state.serviceEnd,
        this.state.serviceDescription,

        (err, res) => {
          console.log("service declared");
        }
      );
      */

    let serviceImg = this.state.serviceImg;
    let serviceTitle = this.state.serviceTitle;
    let servicePrice = this.state.servicePrice;
    let serviceDebut = this.state.serviceDebut;
    let serviceEnd = this.state.serviceEnd;
    let serviceDescription = this.state.serviceDescription;
    if(serviceImg==''||serviceTitle==''||servicePrice==''||serviceDebut==''||serviceEnd==''||serviceDescription=='') {
      popup2()    } 
      else {

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
        .newService.getData(
          serviceImg,
          serviceTitle,
          servicePrice,
          serviceDebut,
          serviceEnd,
          serviceDescription
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
        if (!err) { console.log(hash);popup()}
        else console.log(err);
      });
    });
    console.log("service declared");
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
          style={{ width: "65%" }}
        >
          <div className="row">
            <div className="col-4" style={{ paddingTop: "70px" }}>
              <button
                type="button"
                className="btn btn-outline-dark  btn-sm "
                style={{ width: "75%" }}
                onClick={() => this.changeProdform()}
              >
                Publish A Product
              </button>
              <button
                type="button"
                className="btn btn-outline-dark  btn-sm  "
                style={{ width: "75%" }}
                onClick={() => this.changeServform()}
              >
                Publish A Service
              </button>
            </div>
            <div className="col">
              {this.state.form === 0 ? (
                <div className="col-md-30 mb-5 ">
                  <form onSubmit={this.handleSubmit}>
                    <h1 className="font-weight-bold text-center fahmi red-text accent-4">
                      Product Form
                    </h1>
                    <div className="form-group">
                      <MDBInput
                        label="Title"
                        onChange={this.handleProdTitle}
                        outline
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <MDBInput
                          label="Brand"
                          onChange={this.handleProdBrand}
                          outline
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <MDBInput
                          label="Description Of The Product"
                          type="textarea"
                          rows="4"
                          onChange={this.handleProdDescription}
                          outline
                        />
                      </div>
                      <div className="col-7">
                        <MDBInput
                          label="img URL"
                          onChange={this.handleProdImg}
                          outline
                        />
                      </div>
                      <div className="col-3">
                        <MDBInput
                          label="Price"
                          type="number"
                          onChange={this.handleProdPrice}
                          outline
                        />
                      </div>
                      <div className="col-2">
                        <MDBInput
                          label="Qte"
                          type="number"
                          onChange={this.handleProdQuantity}
                          outline
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <br />
                      <button
                        className="btn btn-success py-2 px-4 btn-block text-white fahmi"
                        onClick={() => this.handleSubmitProd()}
                      >
                        Submit Form
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="col-md-12 mb-5">
                  <form onSubmit={this.handleSubmit}>
                    <h1 className="font-weight-bold text-center fahmi red-text accent-4">
                      Service Form
                    </h1>
                    <div className="form-group">
                      <MDBInput
                        label="Title"
                        onChange={this.handleServTitle}
                        outline
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <MDBInput
                          type="date"
                          label="Debut Of the Service"
                          onChange={this.handleServDebut}
                          outline
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <MDBInput
                          type="date"
                          label="End Of the Service"
                          onChange={this.handleServEnd}
                          outline
                        />
                      </div>
                      <div className="form-group">
                        <MDBInput
                          label="Description Of The Service"
                          type="textarea"
                          rows="4"
                          cols="50"
                          onChange={this.handleServDescription}
                          outline
                        />
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <MDBInput
                            label="img URL"
                            onChange={this.handleServImg}
                            outline
                          />
                        </div>
                        <div className="col">
                          <MDBInput
                            label="Price"
                            type="number"
                            onChange={this.handleServPrice}
                            outline
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <br />
                      <button
                        className="btn btn-success py-2 px-4 btn-block text-white fahmi"
                        onClick={() => this.handleSubmitServ()}
                      >
                        Submit Form
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  changeProdform() {
    this.setState({ form: 0 });
    console.log("form changed to prod");
  }
  changeServform() {
    this.setState({ form: 1 });
    console.log("form changed to serv");
  }
}

export default Posting;
