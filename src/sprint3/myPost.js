import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import CardDeck from "react-bootstrap/CardDeck";
import ProductSub from "./productSub";
import ServiceSub from "./serviceSub";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class MyPost extends Component {
  state = {
    b: true,
    prods: [],
    // newProds: [],
    servs: []
  };

  componentDidMount() {
    console.log("myPost.js");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLengthOfaParticularProduct(
        { from: address },
        (err, res) => {
          for (let i = 0; i < res.c[0]; i++) {
            //console.log("hi");
            web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .getIndexFromAParticularProduct(
                i,
                { from: address },
                (err, res) => {
                  this.state.prods.push(res.c[0]);
                  this.setState({ prods: this.state.prods });
                }
              );
          }
          console.log("prod", this.state.prods);
        }
      );

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getLengthOfaParticularService(
        { from: address },
        (err, res) => {
          for (let i = 0; i < res.c[0]; i++) {
            //console.log("hi");
            web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .getIndexFromAParticularService(
                i,
                { from: address },
                (err, res) => {
                  this.state.servs.push(res.c[0]);
                  this.setState({ servs: this.state.servs });
                }
              );
          }
          console.log("serv", this.state.servs);
        }
      );
  }

  render() {
    if (this.state.prods.length === 0 && this.state.servs.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like you haven't applied for nether a product nor
            a service.
          </p>
          <footer className="blockquote-footer">
            <Link to="/publier">
              You can visit this link to apply for one of them
            </Link>
          </footer>
        </blockquote>
      );
    return (
      <React.Fragment>
        <hr />
        <div className="container">
          <button
            className="btn btn-outline-dark btn-sm btn-block"
            onClick={() => {
              {
                this.setState({ b: !this.state.b });
              }
            }}
          >
            {this.state.b === true ? "Products Posted" : "Services Posted"}{" "}
            <i className="fas fa-exchange-alt" />
          </button>
          <hr />
          {this.state.b === true ? (
            <React.Fragment>
              {this.state.prods.length === 0 ? (
                <small className="pl-3">
                  {" "}
                  You don't own any Product{" "}
                  <Link to="/publier">Publish a Product Here</Link>
                </small>
              ) : (
                <CardDeck style={this.calculateWidthProds()}>
                  {this.state.prods.map(el => (
                    <ProductSub key={el} id={el} />
                  ))}
                </CardDeck>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.servs.length === 0 ? (
                <small className="pl-3">
                  {" "}
                  You don't own any Service{" "}
                  <Link to="/publier">Publish a Service Here</Link>
                </small>
              ) : (
                <CardDeck style={this.calculateWidthServs()}>
                  {this.state.servs.map(el => (
                    <ServiceSub key={el} id={el} />
                  ))}
                </CardDeck>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }

  calculateWidthProds() {
    let w = 17.5;
    w = w * this.state.prods.length;
    let str = w + "rem";
    return { width: str };
  }

  calculateWidthServs() {
    let w = 17.5;
    w = w * this.state.servs.length;
    let str = w + "rem";
    return { width: str };
  }
}

export default MyPost;
