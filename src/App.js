import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "./popup.css";
import Body from "./sprint1/Body.js";
import Subscribe from "./sprint1/Subscribe.js";
import Login from "./sprint2/Login.js";
import Choose from "./sprint1/choose"; //?
import Confirm from "./sprint1/confirm"; //?
import LoanSituations from "./sprint1/loanSituations";
import TransferNews from "./sprint2/transferNews";
import TransferSituations from "./sprint2/transferSituations";
import Posting from "./sprint3/posting";
import Market from "./sprint3/market";
import MyPost from "./sprint3/myPost";
import NotFound from "./login";
import EcheancesMenu from "./sprint1/echeancesMenu";
import Navi from "./sprint1/Navbar";
import CrowdForm from "./sprint4/crowdForm";
import Crowds from "./sprint4/crowds";
import OwnProjects from "./sprint4/ownProjects";
import OwnInvestment from "./sprint4/ownInvestment";
import AcceptProject from "./sprint4/acceptProject";
import Imf from "./imf";
 
library.add(faIgloo);

class App extends Component {
  state = {
  logged:false,
  admin:false
  };

  wallet=()=>
   {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/localstorage/", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
      if (xhr.status === 200) {
            if (JSON.parse(xhr.responseText).address[1]=="x"){
            var address = JSON.parse(xhr.responseText).address
          }
         else { var address ="0x"+JSON.parse(xhr.responseText).address}
          var pkey = JSON.parse(xhr.responseText).pkey
          localStorage.setItem("address", address);
          localStorage.setItem("privateKey", pkey)
        
     console.log('wallet info loaded succesfully !!')
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.send()
   }
componentWillMount(){
       
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/localstorage/", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
  if (xhr.status === 200) {
        if (JSON.parse(xhr.responseText).address[1]=="x"){
        var address = JSON.parse(xhr.responseText).address
      }
     else { var address ="0x"+JSON.parse(xhr.responseText).address}
      var pkey = JSON.parse(xhr.responseText).pkey
      localStorage.setItem("address", address);
      localStorage.setItem("privateKey", pkey)
    
 
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.send()
        this.loggedIn()
}
loggedIn=()=> {
  var token=localStorage.getItem('id_token')
  
   window.fetch('http://localhost:5000/loggedin?q='+token, {
      method: 'POST',
      body: JSON.stringify({
           
        })
      }).then(res => {
        return res.json();          
   }).then(myJson=> {
     console.log(myJson.result)
     console.log(myJson.admin)
     if (myJson.admin==true) {this.setState({admin:true})}

 if (myJson.result==true) {this.setState({logged:true})}
});
setInterval(()=>{ this.wallet(); }, 3000);
 }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!

  render() {
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
       this.state.logged === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
    const Logged = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
       this.state.logged === false
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    )
    const Admin = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
       this.state.admin === true && this.state.logged === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      
      <React.Fragment>
        {this.state.logged ? <Navi {...this.state}/> : null}
 
 

        <div id="popup">
        <div className="alert popup alert-success " style={{bottom: '0px', zIndex: 999, display: 'none'}}>
        <div className="container">
        <div className="alert-warning ng-binding" ng-bind-html="alert.message">Your TX has been broadcast to the network. <br />This does not mean it has been mined &amp; sent. <br />During times of extreme volume, it may take 3+ hours to send. 
        </div>
        </div>
        </div></div>
        <div id="popup2">
        <div className="alert popup alert-danger " style={{bottom: '0px', zIndex: 999, display: 'none'}}>
        <div className="container">
        <div className=" ng-binding" ng-bind-html="alert.message"> You have to fill in all the fields <br /><strong>Try Again !!</strong> 
        </div>
        </div>
        </div></div>

        <Switch>
        <Route path='/demander' component={Subscribe} exact />
        <PrivateRoute path='/' component={Body} exact />
        <Route path='/imf' component={Imf} exact />

         <Admin path='/choose' component={Choose} exact />
        <PrivateRoute path='/confirm' component={Confirm} exact />
        <PrivateRoute path='/situation' component={LoanSituations} exact />
        <PrivateRoute path='/echeancesMenu' component={EcheancesMenu} exact />

 
          {/* SPRINT 2 */}
          <Route path='/deposer' component={Login} exact />
          <Admin path='/newfunds' component={TransferNews} exact />
          <PrivateRoute path='/TransferSituations' component={TransferSituations} exact />
 

          {/* SPRINT 3 */}
          <PrivateRoute path='/publier' component={Posting} exact />
          <PrivateRoute path='/mypost' component={MyPost} exact />
          <PrivateRoute path='/market' component={Market} exact />


          {/* SPRINT 4 */}
          <PrivateRoute path='/crowdForm' component={CrowdForm} exact />
          <Admin path='/acceptProject' component={AcceptProject} exact />
          <PrivateRoute path='/crowds' component={Crowds} exact />
          <PrivateRoute path='/myProjects' component={OwnProjects} exact />
          <PrivateRoute path='/myInvestments' component={OwnInvestment} exact />

          
          <Logged path='/login' component={NotFound} exact />

 
         </Switch>
     
      </React.Fragment>
    );
  }
}

export default App;
