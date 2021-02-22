import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class MyVerticallyCenteredModal extends React.Component {
  componentDidMount() {
    console.log("myVerticallycenteredModal.jsx");
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Details</h4>
          <ul>
            <li>Title : {this.props.title}</li>
            <li>
              {" "}
              Price :{" "}
              <span className="text-success">{this.props.price} IMFT </span>
            </li>
            <li>Quantity : {this.props.quantity}</li>
            <li>Brand : {this.props.brand}</li>
            <li>Description : {this.props.description}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;
