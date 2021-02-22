import React, { Component } from "react";
import aze from "./ressources/dark.png";
import { MDBInput } from "mdbreact";
import Web3 from "web3";
import { ContractsAbi, ContractAdress } from "./Smart";
import Tx from "ethereumjs-tx";
import AuthService from './sprint1/AuthService';
import popup2 from "./popup2";
import popup from "./popup";


var Auth = new AuthService();
const localProvider = `http://127.0.0.1:8545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);
 

class NotFound extends Component {
  state = {

    fname: "",
    lname: "",
    pw : '',
    change: true,
    logged:""
  };

  handlefname =(e)=>{ 
    this.setState({ fname: e.target.value });

  }
  handlelname =(e)=>{ 
    this.setState({ lname: e.target.value });

  }


  handlepw =(e)=>{ 
    this.setState({ pw: e.target.value });

  }

  changin = () => {
    this.setState({ change: !this.state.change });
  };


  handleRegister(fname,lname,pw){    
    if(fname===''||lname===''||pw==='') {
popup2()    }          
    else { 
    
    var address = '0x19260B0D7e033b55D97FD44F20c265A639cdb8e3'
    var pky='f50fb55e7a64f7b448a349e6f994024bf4880478a3abcc83d55fccb0979bbf06'
    var privateKey = Buffer.from(
      pky,
      "hex"
    );
    //const web3 = new Web3("http://localhost:7545");
    console.log("begin1");

    web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .newClient.getData(fname,lname,pw);
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
        if (!err) {
          console.log(hash);
          popup();
        } else console.log(err);
      });
    }); }
  }


  


  handleFormSubmit(pw){                
    if(pw==='') {
      popup2()    } else{
    var address = '0x19260B0D7e033b55D97FD44F20c265A639cdb8e3e'

    web3.eth
    .contract(ContractsAbi)
    .at(ContractAdress).getauth({ from: address },(err,res)=>{
 console.log(res)
          if(res[3]==='ACCEPTED'&& res[4]===pw)  {
            Auth.login().then(res =>{
 
            })
  .catch(err => {
      alert(err);
}) }
      if (res[3]==="REJECTED"){alert('Your request has been rejected , Sorry !')}
      if (res[3]==="REQUESTED"){alert('Your request has not been handled yet !')}
      if(res[3]==='ACCEPTED'&& !(res[4]===this.state.pw)) {alert('Wrong password , try again !')}


      })
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
      <React.Fragment>
        <div style={sectionStyle}>
        
          <div className="container text-center text-white fahmi pt-4">
            <h2>Welcome</h2>
            {this.state.change === true ? (
              <div className="row">
                <div className="col pt-5 pr-2">
                  <div className=" pt-5" align="left">
                    <h3>Join Us Right Now !</h3>
                    <hr className="white" />
                    K2lis offers financial products and services for micro-entrepreneurs based on blockchain technology and smart contracts .


                  </div>
                </div>
                <div className="col pt-5">
                  <div className=" pt-5 mr-5 ml-5">
                    <form
                      onSubmit={e => e.preventDefault()}
                      class="text-center border rounded border-light p-4"
                    >
                      <p class="h2 mb-3">
                        Sign Up <i class="far fa-user-circle" />
                      </p>

                      <MDBInput label="First Name" outline onChange={this.handlefname}/>

                      <MDBInput label="Last Name" outline onChange={this.handlelname}/>
                      <MDBInput type ='password' label="Password" outline onChange={this.handlepw}/>

 
                      <button className="btn peach-gradient py-2 px-4 btn-block text-white" onClick={()=>this.handleRegister(this.state.fname,this.state.lname,this.state.pw)}>
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-5 mr-5 ml-5">
                <div className="mr-5 ml-5">
                  <form
                    onSubmit={e => e.preventDefault()}
                    class="text-center border rounded border-light p-4"
                  >
                    <p class="h2 mb-3">
                      Login <i className="fas fa-sign-in-alt" />
                    </p>

                    <MDBInput type='password' label="Password" outline onChange={this.handlepw} />

                    <button className="btn peach-gradient py-2 px-4 btn-block text-white" onClick={()=>this.handleFormSubmit(this.state.pw)}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}

            <br />
            <br />

            <button
              className="icons-sm btn-lg rounded btn-outline-warning dribbble-ic"
              onClick={this.changin}
            >
              {this.state.change === true ? (
                <i className="fas fa-sign-in-alt" />
              ) : (
                <i class="far fa-user-circle" />
              )}
            </button>
            <br />
            {this.state.change === true ? (
              <small>Already own an account? </small>
            ) : (
              <small>Create an account </small>
            )}
          </div>
        </div>
      </React.Fragment>
      
    );
  }
}

export default NotFound;
