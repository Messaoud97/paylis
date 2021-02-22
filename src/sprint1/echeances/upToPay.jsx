import React, { Component } from "react";

class UpToPay extends Component {
  state = {
    pEch: []
  };

  componentDidMount() {
    console.log("upToPay.jsx");
    let pEch = this.props.ech.filter(p => p.state === 0);
    console.log("azerty");
    this.setState({ pEch });
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="fahmi">Future Commitments To Pay</h3>
        {/* 
        {this.state.pEch.map(el => (
          <div className="alert alert-info" key={el.deadL}>
            <b> Amount : {el.amount} $ -- </b>
            <b>DeadLine : {new Date(el.deadL * 1000).toDateString()} --</b>
            <b>State : {el.state === 0 ? "Not Paid" : "Already Paid"}</b>
          </div>
        ))}
          */}

        <ul class="list-group">
          {this.state.pEch.map(el => (
            <li class="list-group-item">
              <div className="row">
                <div className="col fahmi">
                  Amount : <p className="text-danger">{el.amount} IMFT</p>
                  DeadLine : {new Date(el.deadL * 1000).toString()} <br /> State
                  : {el.state === 0 ? "Not Paid" : "Already Paid"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default UpToPay;
