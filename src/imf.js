import React, { Component } from 'react';
  import Button from '@material-ui/core/Button';
 import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Web3 from "web3"; 
import { ContractsAbi, ContractAdress } from "./Smart";
import Tx from "ethereumjs-tx";
import popup from "./popup";

const localProvider = `http://127.0.0.1:7545`; // ganache
const provider = new Web3.providers.HttpProvider(localProvider);
const web3 = new Web3(provider);
class imf extends Component {
  
    state = {
     array:[] , 
 
  }
    constructor() {
        super();
         this.handleShow = this.handleShow.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this); 

 
      }
      
      componentDidMount(){
        this.handleShow();

       }
    
      handleShow()
      {
        var address = localStorage.getItem('address');

        web3.eth
        .contract(ContractsAbi)
        .at(ContractAdress).getauthlength({ from: address },(error, res) => {
           console.log(res.c[0])
           if(res.c[0]>0){
            for ( let i=0 ; i <= res.c[0]-1; i++) {
           web3.eth
           .contract(ContractsAbi)
           .at(ContractAdress).getimf(i,(err,res)=>
             {  
              
                 this.setState({ array: [...this.state.array, res] })    
                console.log(this.state.array)

               })
                
        }                 
     }})}



     

   handleAccept(i) 
   {
    var address = localStorage.getItem('address');
    var pky=localStorage.getItem('privateKey');
    var privateKey = Buffer.from(
      pky,
      "hex"
    );
      web3.eth.getTransactionCount(address, function(err, nonce) {
      var d = new web3.eth.contract(ContractsAbi)
        .at(ContractAdress)
        .AcceptClient.getData(i);
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
          console.log(hash);popup()
        } else console.log(err);
      });
    });    }      
     
    

    handleReject(i) 
    {
     var address = localStorage.getItem('address');
     var pky=localStorage.getItem('privateKey');
     var privateKey = Buffer.from(
       pky,
       "hex"
     );
       web3.eth.getTransactionCount(address, function(err, nonce) {
       var d = new web3.eth.contract(ContractsAbi)
         .at(ContractAdress)
         .RejectClient.getData(i);
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
           console.log(hash);popup()
         } else console.log(err);
       });
     });    }   
   
        
         
    
        
    render(){

      const classes = theme => ({
        root: {
          width: '100%',
          marginTop: theme.spacing.unit * 3,
          overflowX: 'auto',
        },
        table: {
          minWidth: 700,
          button: {
            margin: theme.spacing.unit,
          },
          leftIcon: {
            marginRight: theme.spacing.unit,
          },
          rightIcon: {
            marginLeft: theme.spacing.unit,
          },
          iconSmall: {
            fontSize: 20,
          },
        }, margin: {
          margin: theme.spacing.unit,
        },
        extendedIcon: {
          marginRight: theme.spacing.unit,
        },
      });

       




      if (this.state.array.length<1){
      return (<div className='container'><br></br><div className="alert alert-success" role="alert">
      Nothing to be paid at the moment!<br></br><br></br>
      <a href="/" >Go Back</a>

      </div></div>)} 




 
 return ( 
   
   
   
   
<div><Paper className={classes.root}>
      <Table className={classes.table}> 
      <TableHead>
          <TableRow>
          <TableCell align="center">fname</TableCell>
          <TableCell align="center">lname</TableCell>
          <TableCell align="center">password</TableCell>
          <TableCell align="center">state</TableCell>

 
            
          </TableRow>
        </TableHead>


 { this.state.array.map((item,index) =>  
 
          <TableBody>
  
<TableRow key={index}>
<TableCell align="center">{item[1]}</TableCell>
<TableCell align="center">{item[2]}</TableCell>
<TableCell align="center">{item[4]}</TableCell>


   <TableCell align="center">
   {item[3] === 'REQUESTED'?  
   <div> <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.handleAccept(index)}>
Accept  
</Button><br></br><br></br><Button variant="contained" color="secondary" className={classes.button} onClick={()=>this.handleReject(index)}>
Reject  
</Button></div> : <div>{item[3]}</div> }</TableCell>

 
 </TableRow></TableBody>

) }
    </Table>
    </Paper> </div>)
      }
  }
 

       
  export default imf ;
