import React, { Component } from "react";

class CrowdsSubSub extends Component {
  state = {
    project: {}
  };

  componentDidMount() {
    console.log("crowdssubsub.jsx");
    const project = this.props.p;
    this.setState({ project }, () => {
      console.log("proejct here ", this.state.project);
    });
  }
  render() {
    return (
      <tr>
        <td>{this.state.project.title}</td>
        <td>
          <b>Title: </b>
          {this.state.project.title} <br />
          <b>Description: </b>
          {this.state.project.description} <br />
          <b>State: </b>
          {this.state.project.state === 0 ? "Available" : "Closed"}
        </td>
        <td>{new Date(this.state.project.deadLine * 1000).toDateString()}</td>
        <td>
          {" "}
          <b>Name: </b>
          {this.state.project.owner} <br />
          <b>Address: </b>
          {this.state.project.demanderAdd}
        </td>
        <td>{this.state.project.amount}</td>
        <td>{this.state.project.collected}</td>
        <td>
          {this.state.show === true ? (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                required
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success btn-sm"
                  type="button"
                  onClick={() => this.handleInvesting(this.props.idP)}
                >
                  Transfer
                </button>
              </div>
            </div>
          ) : null}

          <button
            disabled={this.state.show || this.state.project.state !== 0}
            className="btn btn-danger btn-sm btn-block"
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            {" "}
            submit{" "}
          </button>
        </td>
      </tr>
    );
  }
}

export default CrowdsSubSub;
