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
  function transfers(address from_,address _to, uint256 _value) public returns (bool);
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
 
 







contract Octroi    is Ownable, Pausable {
    
    address public owner;
    
    enum EcheanceState {
        WAITING,
        ACCOMPLISHED
    }
    
    struct Echeance {
        address charger;
        uint deadLine;
        uint amount;
        EcheanceState state;
    }
    
    enum ProposalState {
        WAITING,
        CONFIRMED,
        REFUSED
    }
    
    struct Proposal {
        address reciever;
        uint loanId;
        string fname;
        string lname;
        string email;
        uint startDate;
        uint dueDate;
        uint amountInReturn;
        ProposalState state; 
    }
    
    
    enum LoanState {
        WAITING,
        ACCEPTED,
        REFUSED
    }
    
    
    struct Loan {
        address borrower;
        string fname;
        string lname;
        string email;
        string adr;
        string motivation;
        LoanState state;
        uint amount;
     }
     
    
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
 

     
    mapping (address=>uint[]) public loanMap;
    Loan[] loanList;
    
    mapping (address=>uint[]) public proposalMap;
    Proposal[] proposalList;
    
    mapping (address=>uint[]) public echeanceMap;
    Echeance[] echeanceList;
 
 
  /**
 * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */  
 mapping(bytes32 => address) public tokens;
 
  ERC20 public ERC20Interface;
 
  /**
 * @dev Event to notify if transfer successful or failed * after account approval verified */  
 event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);
 
  event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);
 
  function Octroi () public {
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
 
 function transferTokens(bytes32 symbol_, uint _me) public whenNotPaused {
  require(tokens[symbol_] != 0x0);
      
  address contract_ = tokens[symbol_];
  address from_ = owner; 
 
  ERC20Interface = ERC20(contract_); 
         uint _id = proposalList[_me].loanId; 

 
  ERC20Interface.transferFrom(from_,loanList[_id].borrower, loanList[_id].amount);
 

 }
 
 function transferBackTokens(bytes32 symbol_, address adh, uint amount) public whenNotPaused {
     require(tokens[symbol_] != 0x0);
      
  address contract_ = tokens[symbol_];
  address from_ = adh; 
  ERC20Interface = ERC20(contract_); 
  
  ERC20Interface.transfers(from_,owner, amount);
     
 }
 
  /**
 * @dev allow contract to receive funds */  
 function() public payable {}
 
  /**
 * @dev withdraw funds from this contract * @param beneficiary address to receive ether */  
 function withdraw(address beneficiary) public payable onlyOwner whenNotPaused {
  beneficiary.transfer(address(this).balance);
 }
 
 
 
 
    
    function newLoan(string memory fname, string memory lname, string memory email, string memory adr, string memory motivation, uint amount ) public {
        Loan memory newLoan = Loan(msg.sender, fname, lname, email, adr, motivation, LoanState.WAITING, amount);
        loanMap[msg.sender].push(loanList.length);
        loanList.push(newLoan);
       
    }
    
    function refuseLoan(uint _resourceID ) public {
        loanList[_resourceID].state = LoanState.REFUSED;
        //loanMap[loanList[_resourceID]].state = LoanState.REFUSED;
    }
    
    function acceptLoan(uint _resourceID ) public {
        loanList[_resourceID].state = LoanState.ACCEPTED;
        
        
       newProposal(_resourceID, loanList[_resourceID].borrower);
       
    }
    
    function newProposal(uint _idLoan, address borrower) public {
        
        uint currentDate = block.timestamp;
        uint deadLine = currentDate + 1 years;
        Proposal memory newProposal = Proposal(borrower, _idLoan, loanList[_idLoan].fname, loanList[_idLoan].lname, loanList[_idLoan].email, currentDate, deadLine, loanList[_idLoan].amount + 10, ProposalState.WAITING);
        proposalMap[loanList[_idLoan].borrower].push(proposalList.length);
        proposalList.push(newProposal);
    
    }
    
    
    function getProposalIndexsLoan() public view returns(uint[] memory) {
        return proposalMap[msg.sender];
    }
   
    function getProposal(uint idProposal) public view returns(string memory, string memory, string memory, uint, uint, uint, uint) {
       
       return (proposalList[idProposal].fname, proposalList[idProposal].lname, proposalList[idProposal].email, proposalList[idProposal].startDate, proposalList[idProposal].dueDate, proposalList[idProposal].amountInReturn,  proposalList[idProposal].loanId);
    }
    
    function getProposalState(uint idProposal) public view returns(ProposalState) {
        return proposalList[idProposal].state;
    }
    
    function SignProposal(uint idProposal) public {
        require(proposalList[idProposal].reciever == msg.sender);
        //ProposalMap[msg.sender].state = ProposalState.CONFIRMED;
        proposalList[idProposal].state = ProposalState.CONFIRMED;
        
        uint nbrMonths = (proposalList[idProposal].dueDate - proposalList[idProposal].startDate)/ 60 / 60 / 24 / 30;
        uint AmountPerEcheance = proposalList[idProposal].amountInReturn / nbrMonths;
        uint sum = 0;
        //uint echeanceDeadLine = proposalList[idProposal].startDate + 30 days;
        uint echeanceDeadLine = proposalList[idProposal].startDate;
        for(uint i=1; i<nbrMonths; i++) {
            echeanceDeadLine += 30 days;    
            Echeance memory newEcheance = Echeance(msg.sender, echeanceDeadLine, AmountPerEcheance, EcheanceState.WAITING);
            echeanceMap[msg.sender].push(echeanceList.length);
            echeanceList.push(newEcheance);
            sum += AmountPerEcheance;
        }
        
        uint rest = proposalList[idProposal].amountInReturn - sum;
        Echeance memory lastE = Echeance(msg.sender, proposalList[idProposal].dueDate, rest, EcheanceState.WAITING);
        echeanceMap[msg.sender].push(echeanceList.length);
        echeanceList.push(lastE);
        
    }
    
    function accomplishEcheance(uint _idE, uint amount) public {
        require(echeanceList[_idE].charger == msg.sender);
        transferBackTokens(convertttt(), msg.sender, amount);
        echeanceList[_idE].state = EcheanceState.ACCOMPLISHED;
    }
    
    function getEcheancesIndexes() public view returns(uint[]) {
        return echeanceMap[msg.sender];
    }
    
        
    function getEcheanceInfo(uint _idE) public view returns(address, uint, uint, EcheanceState) {
        return (echeanceList[_idE].charger, echeanceList[_idE].deadLine, echeanceList[_idE].amount, echeanceList[_idE].state);
    }
    
    function RefuseProposal(uint idProposal) public {
        //ProposalMap[msg.sender].state = ProposalState.REFUSED;
        proposalList[idProposal].state = ProposalState.REFUSED;
    }
    
    function getLoanById(uint _idLoan ) public view returns (address, string memory, string memory, string memory, string memory, string memory, uint, LoanState) {
        Loan memory loan = loanList[_idLoan];
        return (loan.borrower ,loan.fname, loan.lname, loan.email, loan.adr, loan.motivation, loan.amount, loan.state);
    }
    
    function getAccountEl(uint index) public view returns (uint) {
        return loanMap[msg.sender][index];
    }
    
    function getLengthListOfLoans() public view returns (uint) {
        return loanList.length;
    }
    
    function getLengthOfParticularLoan() public view returns (uint) {
        return loanMap[msg.sender].length;
    }
    
    
    function getLoanState(uint _resourceID) public view returns (LoanState) {
        Loan memory loan = loanList[_resourceID];
        return (loan.state);
    }
    
     function convertttt() public pure returns (bytes32 result) {
    string memory testFoo = "IMFT";
    assembly {
        result := mload(add(testFoo, 32)) 
    }
 }
    function confirmTransfer(uint _me) public payable {
        transferTokens(convertttt(),_me);
        SignProposal({ idProposal : _me});
    }
    
    
}
