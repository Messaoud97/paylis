
pragma solidity ^0.4.18;
 
 
 
/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;
 
 
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
 
 
  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }
 
  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
 
  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
 
}
 
 
/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Ownable {
  event Pause();
  event Unpause();
 
  bool public paused = false;
 
 
  /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
  modifier whenNotPaused() {
    require(!paused);
    _;
  }
 
  /**
   * @dev Modifier to make a function callable only when the contract is paused.
   */
  modifier whenPaused() {
    require(paused);
    _;
  }
 
  /**
   * @dev called by the owner to pause, triggers stopped state
   */
  function pause() onlyOwner whenNotPaused public {
    paused = true;
    Pause();
  }
 
  /**
   * @dev called by the owner to unpause, returns to normal state
   */
  function unpause() onlyOwner whenPaused public {
    paused = false;
    Unpause();
  }
}
 
 
 
 
/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
 
 
 
 
 
/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}
 
 
 
 
 
 
 
 
contract Depot is Ownable, Pausable {
 
 //code fahmi start
 
  enum transferState {
        REQUESTED,
        CONFIRMED,
        ACCEPTED,
        REJECTED,
        HALFCONFIRMED
    }
    
    /*
    struct dInfo {
        address depositor;
        string fname;
        string lname;
        string cin;
        uint amount;
        transferState state;
    }
    */
    
    
    struct Transfer {
        address depositor;
        string fname;
        string lname;
        string cin;
        string email;
        string adr;
        string city;
        string PhoneNumber;
        uint amount;
        transferState state;
        uint sended;
     }  
  //code fahmi end

  /**
 * @dev Details of each transfer * @param contract_ contract address of ER20 token to transfer * @param to_ receiving account * @param amount_ number of tokens to transfer to_ account * @param failed_ if transfer was successful or not */  
 struct ercTransfer {
  address contract_;
  address to_;
  uint amount_;
  bool failed_;
 }
  /**
 * @dev a mapping from transaction ID's to the sender address * that initiates them. Owners can create several transactions */  
 mapping(address => uint[]) public transactionIndexesToSender;
 
 
  /**
 * @dev a list of all transfers successful or unsuccessful */ 
 ercTransfer[] public transactions;
 
  address public owner;
 
 
 //code fahmi start
 
   Transfer [] /*public*/ allTransfers;

    mapping (address => uint []) public userTransfers;
 
 
 
 //code fahmi end
 
  /**
 * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */  
 mapping(bytes32 => address) public tokens;
 
  ERC20 public ERC20Interface;
  ERC20 public ERC20Interface2;
 
  /**
 * @dev Event to notify if transfer successful or failed * after account approval verified */  
 event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);
 
  event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);
 
  function Depot () public {
  owner = msg.sender;
 }
  /**
 * @dev add address of token to list of supported tokens using * token symbol as identifier in mapping */  
 function addNewToken(bytes32 symbol_, address address_) public onlyOwner returns (bool) {
  tokens[symbol_] = address_;
 
  return true;
 }
  /**
 * @dev remove address of token we no more support */ 
 function removeToken(bytes32 symbol_) public onlyOwner returns (bool) {
  require(tokens[symbol_] != 0x0);
 
  delete(tokens[symbol_]);
 
  return true;
 }
  /**
 * @dev method that handles transfer of ERC20 tokens to other address * it assumes the calling address has approved this contract * as spender * @param symbol_ identifier mapping to a token contract address * @param to_ beneficiary address * @param amount_ numbers of token to transfer */ 
 
 function transferTokens(bytes32 symbol_, bytes32 symbol_2, uint _me) public whenNotPaused{
  require(tokens[symbol_] != 0x0);
  require(tokens[symbol_2] != 0x0);
 // require(allTransfers[_me].amount > 0);
    uint result = getMoney({_idR : _me});
    require(result == allTransfers[_me].amount);
        
  address contract_ = tokens[symbol_];
  address contract_2 = tokens[symbol_2];
  address from_ = owner;
 
  ERC20Interface2 = ERC20(contract_2);
  ERC20Interface = ERC20(contract_);
 
  ERC20Interface.transferFrom(from_, allTransfers[_me].depositor, allTransfers[_me].amount);
  ERC20Interface2.transferFrom(from_, allTransfers[_me].depositor, 1);
  //confirmState({ _id : _me});


 }
  /**
 * @dev allow contract to receive funds */  
 function() public payable {}
 
  /**
 * @dev withdraw funds from this contract * @param beneficiary address to receive ether */  
 function withdraw(address beneficiary) public payable onlyOwner whenNotPaused {
  beneficiary.transfer(address(this).balance);
 }
 
 //code fahmi start
      function newTransfer(string memory _fname,string memory _lname, string memory _cin, string memory _email, string memory _adr, string memory _city, string memory _PhoneNumber, uint _amount) public {
        
        Transfer memory transfer = Transfer(msg.sender, _fname, _lname, _cin, _email, _adr, _city, _PhoneNumber, _amount, transferState.REQUESTED,0);
        userTransfers[msg.sender].push(allTransfers.length);
        allTransfers.push(transfer);
    }
    
    function getTransferInfo(uint _id) public view returns (address _borrower, string memory fname, string memory lname,string memory adr, uint amount,transferState state) {
        Transfer memory transfer = allTransfers[_id];
        return (transfer.depositor, transfer.fname, transfer.lname, transfer.adr, transfer.amount, transfer.state);
    }
    
    /*
    function getUserTransfers() public view returns (uint[] memory transfers){
        return userTransfers[msg.sender];
    }
    */
    
    function getTransferLength() public view returns (uint) {
        return allTransfers.length;
    }
    
    function acceptState(uint _id) public {
         allTransfers[_id].state=transferState.ACCEPTED;
    }
    
    function confirmState(uint _id) public {
         allTransfers[_id].state=transferState.CONFIRMED;
    }
    
    function rejectState(uint _id) public {
         allTransfers[_id].state=transferState.REJECTED;
    }
    
    function getAccountTransferIndex(uint _id) public view returns (uint) {
        return userTransfers[msg.sender][_id];
    }
    
    function getLengthOfParticularTransfer() public view returns (uint){
        return userTransfers[msg.sender].length;
    }
    
    function getTransferState(uint _resourceID)  public view returns(transferState){
        Transfer memory t = allTransfers[_resourceID]; 
        return (t.state);
        
    }
    
    function setSent(uint _idR ,uint money) public {
        require(msg.sender == allTransfers[_idR].depositor);
        allTransfers[_idR].sended = money;
        allTransfers[_idR].state=transferState.HALFCONFIRMED;
    }
    
    function getMoney(uint _idR) public view returns (uint) {
        Transfer memory t = allTransfers[_idR]; 
        return (t.sended);
    }
    
    function convertttt() public pure returns (bytes32 result) {
    string memory testFoo = "IMFT";
        assembly {
            result := mload(add(testFoo, 32))
        }
    }
    
    function convertttt2() public pure returns (bytes32 result) {
    string memory testFoo = "IMFTR";
        assembly {
            result := mload(add(testFoo, 32))
        }
    }
 
    function confirmTransfer(uint _me) public payable {
        uint result = getMoney({_idR : _me});
        require(result == allTransfers[_me].amount);
         transferTokens(convertttt(),convertttt2(),_me);

        confirmState({ _id : _me});
    }
 // code fahmi end  
    
    
    
    
}
