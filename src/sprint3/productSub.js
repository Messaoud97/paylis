import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ContractsAbi, ContractAdress } from "../web3/shared3";
import MyCommandProductVertically from "./boot/myCommandProductVertically";
import Web3 from "web3";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);

class ProductSub extends Component {
  state = {
    title: "",
    img: "",
    price: 0,
    quantity: 0,
    description: "",
    brand: "",
    st: ""
  };

  constructor() {
    super();
    this.state = { modalShow: false };
  }

  componentDidMount() {
    var address = localStorage.getItem('address')

    web3.eth
      .contract(ContractsAbi)
      .at(ContractAdress)
      .getProductsInfo(
        this.props.id,
        { from: address },
        (err, res) => {
          console.log(res);
          this.setState({ img: res[0] });
          this.setState({ title: res[1] });
          this.setState({ price: res[2].c[0] });
          this.setState({ quantity: res[3].c[0] });
          this.setState({ description: res[4] });
          this.setState({ brand: res[5] });
          this.setState({ st: res[6].c[0] });
        }
      );
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Card>
        <Card.Img
          variant="top"
          src={this.state.img}
          alt="mteei"
          style={{ width: "100%", height: "12rem" }}
        />
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Card.Text>
            <React.Fragment>
              <ul>
                <li>
                  <b>Brand :</b> {this.state.brand}
                </li>
                <li>
                  <b>Price :</b> {this.state.price}$
                </li>
                <li>
                  <b>Quantity :</b> {this.state.quantity}
                </li>
              </ul>
            </React.Fragment>
          </Card.Text>
          <Card.Footer className="d-flex justify-content-end">
            {" "}
            <Button
              variant="btn btn-indigo btn-sm btn-block"
              onClick={() => this.setState({ modalShow: true })}
            >
              See Commands
            </Button>
            <MyCommandProductVertically
              /*
              title={this.state.title}
              price={this.state.price}
              quantity={this.state.quantity}
              description={this.state.description}
              brand={this.state.brand}
              */
              id={this.props.id}
              show={this.state.modalShow}
              onHide={modalClose}
            />
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductSub;
