var account = "0x0d0815d5c4FaC2827C5B21F0f0F0f55B29Ad721A";

var privateKey = Buffer.from(
  "afe7319165e5bce1e8f2684993b929605e1e0bad5a2a257d60a0d7a3cec62ebf",
  "hex"
);
let y = this.props.idP;
window.web3.eth.getTransactionCount(account, function(err, nonce) {
  var data = window.web3.eth
    .contract(ContractsAbi)
    .at(ContractAdress)
    .failProject.getData(y);

  var tx = new Tx({
    nonce: nonce,
    gasPrice: "0x09184e72a000",
    gasLimit: "0x30000",
    to: ContractAdress,
    value: 0,
    data: data
  });

  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  window.web3.eth.sendRawTransaction(
    "0x" + serializedTx.toString("hex"),
    function(err, hash) {
      console.log(hash);
    }
  );
});

/********************************************************************** */

/*
handleRegister(acc,lname,pw){ 

    //const web3 = new Web3('http://localhost:7545');
    
    //var account = localStorage.getItem('address');
    //var privateKey = Buffer.from(localStorage.getItem('privateKey'),"hex");
    
    web3.eth.getTransactionCount(acc, function(err,
    nonce) {
    
    var data = smart.newClient.getData(fname,lname,pw);
    
    var tx = new Tx({
    nonce: nonce,
    gasPrice: "0x4a817c800",
    gasLimit: "0x30000",
    from: account,
    to: "0xd728fd159f882d4d2ed6ed83550cc73faf8983a3",
    value: 0,
    data: data
    });
    
    tx.sign(privateKey);
    
    var raw = "0x" + tx.serialize().toString("hex");
    
    web3.eth.sendSignedTransaction(raw, function(err,txhash)
        {
            console.log(txhash)
        });
    
        
    document.getElementById('ahmed').classList.toggle('hide')
    setTimeout(function(){document.getElementById('ahmed').classList.toggle('hide')
    }, 3000);
        
    });
 
    }    
*/

/*

     window.web3.eth.getTransactionCount(account, function(err, nonce) {
            var data = window.web3.eth
              .contract(ContractsAbi)
              .at(ContractAdress)
              .confirmPTransfer.getData(y);

            var tx = new Tx({
              nonce: nonce,
              gasPrice: "0x09184e72a000",
              gasLimit: "0x30000",
              to: ContractAdress,
              value: 0,
              data: data
            });
            
            tx.sign(Buffer.from(privateKey, "hex"));
            var raw = "0x" + tx.serialize().toString("hex");
            window.web3.eth.sendRawTransaction(raw, function(
              err,
              transactionHash
            ) {
              console.log("yoo");
              console.log(transactionHash);
            });
          });


            tx.sign(privateKey);
            var serializedTx = tx.serialize();
            window.web3.eth.sendRawTransaction(
              "0x" + serializedTx.toString("hex"),
              function(err, hash) {
                console.log("hi nonce", nonce);
                if (!err) console.log(hash);
                else {
                  console.log(err);
                  console.log("nonce", nonce);
                }
              }
            );
          });

          */
