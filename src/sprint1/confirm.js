import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";

class Confirm extends Component {
  state = {
    name: "",
    lname: "",
    email: "",
    dateDebut: 0,
    deadLine: 0,
    amoutInReturn: 0,
    ProposalState: 0,
    hide: false,
    disactiveButton: false
  };

  handleShow() {
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProposal((error, res) => {
        console.log(res);
        console.log(this.state.result);
        this.setState({ name: res[0] });
        this.setState({ lname: res[1] });
        this.setState({ email: res[2] });
        this.setState({ dateDebut: res[3].c[0] });
        this.setState({ deadLine: res[4].c[0] });
        this.setState({ amoutInReturn: res[5].c[0] });
        this.setState({ ProposalState: res[6].c[0] });
        console.log("name", this.state.name);
        console.log("last", this.state.lname);
        console.log("date debut", this.state.dateDebut);
        console.log("deadline", this.state.deadLine);
        console.log("amount", this.state.amoutInReturn);
        console.log("State", this.state.ProposalState);

        this.setState({ hide: !this.state.hide });
      });
  }

  // sing the proposal
  handleSign() {
    
    window.web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .SignProposal(() => {
        console.log("signed");
        this.setState({ ProposalState: 1 });

        this.setState({ disactiveButton: true });
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* ------------------------------------------------------ */}
        <header className="site-navbar py-1" role="banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-xl-2">
                <h1 className="mb-0">
                  <a href="/" className="text-black h2 mb-0">
                    K2Lis
                  </a>
                </h1>
              </div>
              <div className="col-10 col-md-8 d-none d-xl-block">
                <nav
                  className="site-navigation position-relative text-right text-lg-center"
                  role="navigation"
                />
              </div>
              <div className="col-6 col-xl-2 text-right">
                <div className="d-none d-xl-inline-block">
                  <ul
                    className="site-menu js-clone-nav ml-auto list-unstyled d-flex text-right mb-0"
                    data-class="social"
                  >
                    <li>
                      <a href="/" className="pl-3 pr-3 text-black">
                        <span className="icon-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="/" className="pl-3 pr-3 text-black">
                        <span className="icon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="/" className="pl-3 pr-3 text-black">
                        <span className="icon-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
                  style={{ position: "relative", top: "3px" }}
                >
                  <a
                    href="/"
                    className="site-menu-toggle js-menu-toggle text-black"
                  >
                    <span className="icon-menu h3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <hr />
        {/* --------------------------------------------------------------------------------- */}
        <div className="container-fluid p-3 mb-2">
          <div className="row">
            <div className="col-lg-6">
              {this.state.hide ? (
                <React.Fragment>
                  <ul>
                    <li>
                      {" "}
                      <b>First Name : </b>
                      {this.state.name}
                    </li>
                    <li>
                      <b>Email : </b>
                      {this.state.email}
                    </li>
                    <li>
                      <b>DebutContrat : </b>{" "}
                      {new Date(this.state.dateDebut * 1000).toString()}
                    </li>
                    <li>
                      <b>deadLine : </b>{" "}
                      {new Date(this.state.deadLine * 10000).toString()}
                    </li>
                    <li>
                      <b>Amount In Return : </b>
                      {this.state.amoutInReturn}
                    </li>
                    <li>
                      <b>State :</b>{" "}
                      {this.state.ProposalState === 0 ? "waiting" : "confirmed"}
                    </li>
                  </ul>
                  <input
                    type="submit"
                    disabled={this.state.ProposalState === 0 ? false : true}
                    value="Sign The Proposal"
                    onClick={() => this.handleSign()}
                    className="btn btn-danger py-2 px-4 btn-block"
                  />{" "}
                  <br />
                </React.Fragment>
              ) : null}
              <input
                type="submit"
                value={!this.state.hide ? "Show Details" : "Hide Details"}
                onClick={() => this.handleShow()}
                className="btn btn-success py-2 px-4 text-white btn-block"
              />
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default Confirm;
