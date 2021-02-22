import React, { Component } from "react";
import { ContractsAbi, ContractAdress } from "../web3/shared";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TokenAbi1, TokenAddress1 } from "../web3/TokenShared1";
import { TokenAbi2, TokenAddress2 } from "../web3/TokenShared2";
import ls from "local-storage";
import Web3 from "web3";
import AuthService from './AuthService';

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);
const Auth = new AuthService();

class Navi extends Component {
  state = {
    // indexes
     echIndexes: [],
    // data
    echeances: [],
    // counter
    mane: 0,
    // acc
    account: 0,
    // eth
    eth: 0,
    // imft
    imft: 0,
    // imftr
    imftr: 0
  };
 componentDidMount() {
     
  var address = localStorage.getItem('address')

    this.setState({account:address})
     window.web3.eth.getBalance(address, (err, res) => {
        console.log("amount of ETH in ether: ", window.web3.fromWei(res.valueOf(), "ether"));
  this.setState({ eth: web3.fromWei(res.valueOf(), "ether") });
   });  
//imftr
window.web3.eth
.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from_",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfers",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
])
 .at('0xb55441b7c0f50eff69326b14aa35907da85353e0')
.balanceOf(address, (err, res) => {
console.log("amount of IMFT", res.valueOf());
   this.setState({ imftr: res.valueOf() });
}); 




//imft
   window.web3.eth
       .contract([
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_from",
              "type": "address"
            },
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint32"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseApproval",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "balance",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseApproval",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            },
            {
              "name": "_spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "from_",
              "type": "address"
            },
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfers",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        }
      ])
        .at('0x97d268c69da26b9ef66d1f13028d14eea6f54a96')
      .balanceOf(address, (err, res) => {
   console.log("amount of IMFT", res.valueOf());
          this.setState({ imft: res.valueOf() });
       }); 
  //     window.web3.eth
  //       .contract(TokenAbi2)
  //       .at('0xb55441b7c0f50eff69326b14aa35907da85353e0')
  //       .balanceOf(this.state.account, (err, res) => {
  //         // console.log("amount of IMFTR", res.valueOf());
  //         this.setState({ imftr: res.valueOf() });
  //       });
  //   });

    web3.eth
     .contract(ContractsAbi)
     .at(ContractAdress)
    .getEcheancesIndexes(
      { from: address },
   (error, res) => {
      let ech = [];
     for (let i = 0; i < res.length; i++) {
       ech[i] = res[i].c[0];
     }
     this.setState({ echIndexes: ech });
     console.log("eacheances", this.state.echIndexes);

     let y = [];
     let sp = 0;
     for (let i = 0; i < this.state.echIndexes.length; i++) {
       web3.eth
         .contract(ContractsAbi)
         .at(ContractAdress)
       .getEcheanceInfo(
           this.state.echIndexes[i],
          { from: address },
          (error, res) => {
            let x = {
              adr: "",
              deadL: 0,
              amount: 0,
              state: 0
          };
          x.adr = res[0];
          x.deadL = res[1].c[0];
            x.amount = res[2].c[0];
            x.state = res[3].c[0];
            if (
              Date.now() / 1000 - 3456000 <= x.deadL &&
              x.deadL <= Date.now() / 1000 + 3456000 &&
              x.state === 0 // 172800 for 2 days
            ) {
              sp++;
              console.log("sp", sp);
            }
            this.setState({ mane: sp });
            //console.log("x", x);
            y.push(x);
            this.setState({ echeances: y });
          }
        );
    }
    console.log("y", y);
  }
   );
   }

  render() {
     return (
      //////////////////////////////////////////////////
      <nav className="site-header border-bottom border-dark chaabane sticky-top py-0.5">
        <small id="emailHelp" className=" fahmi text-muted float-left">
          your account: {this.state.account}
        </small>

        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <h2 className="fahmi">
            <NavLink to="/" className="text-dark pt-3">
              <i>Home</i>
            </NavLink>
          </h2>
          {/*  sprint  1*/}
          <NavDropdown className="fahmi" title="Credit Application">
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/demander">
                Loan Form
              </NavLink>
            </NavDropdown.Item>
            {this.props.admin ? <NavDropdown.Item>
                <NavLink className="nav-link fahmi" to="/choose">
                  Accept Loans
                </NavLink>
              </NavDropdown.Item> : null }
               
            

            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/situation">
                Loan Situation
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          {/*  sprint  2*/}
          <NavDropdown className="fahmi" title="Deposit of Funds">
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/deposer">
                Deposit Form
              </NavLink>
            </NavDropdown.Item>

            {this.props.admin ? <NavDropdown.Item>
                <NavLink className="nav-link fahmi" to="/newfunds">
                Accept Deposits
                </NavLink>
              </NavDropdown.Item> : null }
 
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/TransferSituations">
                Deposit Situation
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          {/*  sprint  3*/}
          <NavDropdown className="fahmi" title="Market">
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/publier">
                Publishing
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/market">
                Market
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/mypost">
                My Publications
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          {/*  sprint  4*/}
          <NavDropdown className="fahmi" title="CrowdFunding">
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/crowdForm">
                Formulaire
              </NavLink>
            </NavDropdown.Item>
            {this.props.admin ? <NavDropdown.Item>
                <NavLink className="nav-link fahmi" to="/acceptProject">
                Accept Demands
                </NavLink>
              </NavDropdown.Item> : null }

            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/crowds">
                See Crowds
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/myProjects">
                See Posts
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink className="nav-link fahmi" to="/myInvestments">
                See Investments
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          {this.props.admin ?  
            <NavLink className="nav-link fahmi" to='/imf'>
                New adherent
              </NavLink>
                : null }
          
          <small className=" fahmi text-muted text-danger float-right mr-7">
            ETH: {this.state.eth}
            <br />
            IMFT: {this.state.imft}
            <br />
            IMFR: {this.state.imftr}
          </small>
          <NavLink className="nav-link fahmi" to="/" onClick={()=>Auth.logout()}>
                Logout
              </NavLink>
          <h4>
            <NavLink
              to={{
                pathname: "/echeancesMenu"
              }}
              className="nav-link fahmi"
            >
              <i className="pl-3 pr-3 far fa-bell" />
              <NotificationBadge
                count={this.state.mane}
                effect={Effect.SCALE}
                style={{
                  color: "green",
                  backgroundColor: "yellow"
                }}
              />
            </NavLink>
           
          </h4>
        </div>
      </nav>
      
    );
  }
}

export default Navi;
