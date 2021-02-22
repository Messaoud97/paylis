import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import ServiceCommands from "../commands/serviceCommands";
import MyProdCmds from "./myProdCmds";
import MyServCmds from "./myServCmds";

class MyCommands extends React.Component {
  state = {
    which: true
  };

  componentDidMount() {
    console.log("myCommands.jsx");
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="fahmi">My Commands</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row" style={{ paddingBottom: "30px" }}>
              <div className="col-6">
                <button
                  className="btn btn-outline-dark btn-block btn-sm"
                  onClick={() => {
                    {
                      this.setState({ which: true });
                    }
                  }}
                >
                  Product Commands
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-outline-dark btn-block btn-sm"
                  onClick={() => {
                    {
                      this.setState({ which: false });
                    }
                  }}
                >
                  Service Commands
                </button>
              </div>
            </div>
            {this.state.which === true ? (
              <React.Fragment>
                {this.props.tabprod.length === 0 ? (
                  <small className="green-text fahmi">
                    {" "}
                    ..you haven't applied for any product yet..
                  </small>
                ) : (
                  <table className="table">
                    <thead align="center">
                      <tr>
                        <th scope="col">Cmd Id</th>
                        <th scope="col">Prod Id</th>
                        <th scope="col">Qte</th>
                        <th scope="col">Date of The ReQ</th>
                        <th scope="col">State</th>
                        <th>Send IMFT</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      {this.props.tabprod.map(el => (
                        <MyProdCmds key={el} idpc={el} />
                      ))}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            ) : (
              //////////////
              <React.Fragment>
                {this.props.tabserv.length === 0 ? (
                  <small className="green-text fahmi">
                    {" "}
                    ..you haven't applied for any service yet..
                  </small>
                ) : (
                  <table className="table">
                    <thead align="center">
                      <tr>
                        <th scope="col">Cmd Id</th>
                        <th scope="col">Serv Id</th>
                        <th scope="col">Debut/End</th>
                        <th scope="col">Date of The ReQ</th>
                        <th scope="col">State</th>
                        <th>Send IMFT</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      {this.props.tabserv.map(el => (
                        <MyServCmds key={el} idsc={el} />
                      ))}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
              //////////////
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger btn-sm btn-block"
            onClick={this.props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyCommands;
