import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import ProdDetails from "./prodDetails";
import ServDetails from "./servDetails";
import MyCommands from "./commands/myCommands";
import { Link } from "react-router-dom";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class Market extends Component {
  state = {
    active: true,
    lenProd: [],
    lenServ: [],
    lenProdCmd: [],
    lenServCmd: [],
    modalShow: false
  };

  componentDidMount() {
    console.log("market.js");
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProductsLength(
        { from: address },
        (err, res) => {
          for (let i = 0; i < res.c[0]; i++) {
            this.state.lenProd.push(i);
            this.setState({ lenProd: this.state.lenProd });
          }
          console.log("length of prods list ", this.state.lenProd);
        }
      );

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getServicesLength(
        { from: address },
        (err, res) => {
          for (let i = 0; i < res.c[0]; i++) {
            this.state.lenServ.push(i);
            this.setState({ lenServ: this.state.lenServ });
          }
          console.log("length of servs list ", this.state.lenServ);
        }
      );

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getMyCommandsProdIndexes(
        { from: address },
        (err, res) => {
          console.log("tableau1", res);

          for (let i = 0; i < res.length; i++) {
            this.state.lenProdCmd.push(res[i].c[0]);
            this.setState({ lenProdCmd: this.state.lenProdCmd });
          }
        }
      );

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getMyCommandsServIndexes(
        { from: address },
        (err, res) => {
          console.log("tableau2", res);

          for (let i = 0; i < res.length; i++) {
            this.state.lenServCmd.push(res[i].c[0]);
            this.setState({ lenServCmd: this.state.lenServCmd });
          }
        }
      );
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    if (this.state.lenProd.length === 0 && this.state.lenServ.length === 0)
      return (
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            We're Sorry, Seems like the market is empty at the moment
          </p>
          <footer className="blockquote-footer">
            <Link to="/">back to home page</Link>
          </footer>
        </blockquote>
      );

    return (
      <React.Fragment>
        <div className="container">
          <table className="table table-sm">
            <tbody>
              <tr>
                <th>
                  <button
                    className={this.makeChange1()}
                    onClick={() => this.changeProdList()}
                  >
                    <b>List of Products</b>
                  </button>
                </th>
                <th>
                  <button
                    className={this.makeChange2()}
                    onClick={() => this.changeServList()}
                  >
                    <b>List of Services</b>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        {/*  nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn   */}

        <button
          className="btn-floating btn-danger btn-sm"
          onClick={() => this.setState({ modalShow: true })}
        >
          <i className="fas fa-cart-plus" />
        </button>
        <MyCommands
          show={this.state.modalShow}
          onHide={modalClose}
          tabprod={this.state.lenProdCmd}
          tabserv={this.state.lenServCmd}
        />

        {/*  nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn   */}

        {this.state.active === true ? (
          <React.Fragment>
            {this.state.lenProd.length === 0 ? (
              <small className="pl-3">
                {" "}
                There's no product at the moment{" "}
                <Link to="/publier">Publish a Product Here</Link>
              </small>
            ) : (
              <table className="table table-sm">
                <thead align="center">
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Purchase</th>
                  </tr>
                </thead>
                <tbody align="center">
                  {this.state.lenProd.map(id => (
                    <ProdDetails key={id} id={id} />
                  ))}
                </tbody>
              </table>
            )}
          </React.Fragment>
        ) : (
          ///////////
          <React.Fragment>
            {this.state.lenServ.length === 0 ? (
              <small className="pl-3">
                {" "}
                There's no service at the moment{" "}
                <Link to="/publier">Publish a Service Here</Link>
              </small>
            ) : (
              <table className="table table-sm">
                <thead align="center">
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Details</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Purchase</th>
                  </tr>
                </thead>
                <tbody align="center">
                  {this.state.lenServ.map(id => (
                    <ServDetails key={id} id={id} />
                  ))}
                </tbody>
              </table>
            )}
          </React.Fragment>
          //////////
        )}
      </React.Fragment>
    );
  }

  makeChange1() {
    let str = "btn btn-outline-dark btn-sm btn-block";
    this.state.active === true ? (str += " active") : (str += "");
    return str;
  }

  makeChange2() {
    let str = "btn btn-outline-dark btn-sm btn-block";
    this.state.active === false ? (str += " active") : (str += "");
    return str;
  }

  changeProdList() {
    this.setState({ active: true });
    console.log("prod list");
  }

  changeServList() {
    this.setState({ active: false });
    console.log("serv list");
  }
}

export default Market;
