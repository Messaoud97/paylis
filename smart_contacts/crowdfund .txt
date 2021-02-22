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
 
 






 
contract CrowdFund  is Ownable, Pausable{
    
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
 
 
 /**
 * @dev list of all supported tokens for transfer * @param string token symbol * @param address contract address of token */  
 mapping(bytes32 => address) public tokens;
 
  ERC20 public ERC20Interface;
 
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
 
 function transferTokens(bytes32 symbol_, uint _me) public whenNotPaused{
  require(tokens[symbol_] != 0x0);
      
  address contract_ = tokens[symbol_];
  address from_ = 0x0d0815d5c4FaC2827C5B21F0f0F0f55B29Ad721A; 
 
 /*
  ERC20Interface = ERC20(contract_); 
         uint _id = proposalList[_me].loanId; 

 
  ERC20Interface.transferFrom(from_,loanList[_id].borrower, loanList[_id].amount);
 */

 }
  /**
 * @dev allow contract to receive funds */  
 function() public payable {}
 
  /**
 * @dev withdraw funds from this contract * @param beneficiary address to receive ether */  
 function withdraw(address beneficiary) public payable onlyOwner whenNotPaused {
  beneficiary.transfer(address(this).balance);
 }
 
    
    enum ProjectState {
        REQUESTED,
        ACCOMPLISHED,
        FAILED,
        ACCEPTED,
        REFUSED
    }
    
    
    struct Project {
        string demanderName;
        uint contact;
        address demander;
        string title;
        uint256 deadLine;
        string description;
        uint amount;
        uint collected;
        ProjectState state;
        uint[] idInvestments;
    }
    
    
    struct Investment {
        address owner;
        uint amount;
        uint256 date;
        uint projectId;
    }
    
    
    Project[] public projectList;
    mapping (address => uint[]) public projectMap;
    
    Investment[] public investmentList;
    mapping (address => uint[]) public investmentMap;
    
    
    function newProject(string memory name, uint phone, string memory title, uint256 deadL, string memory desc, uint flous) public {
    Project memory newP = Project(name, phone, msg.sender, title, deadL, desc, flous, 0, ProjectState.REQUESTED, new uint[](0));
        projectMap[msg.sender].push(projectList.length);
        projectList.push(newP);
    }
    
    function newInvestment(uint flous, uint _projectId) public {
        address contract_ = tokens[convertttt()];
        ERC20Interface = ERC20(contract_);  
        ERC20Interface.transfers(msg.sender, address(this), flous);
        
        
        uint currentDate = block.timestamp;
        Investment memory newI = Investment(msg.sender, flous, currentDate, _projectId);
        investmentMap[msg.sender].push(investmentList.length);
        projectList[_projectId].idInvestments.push(investmentList.length);
        projectList[_projectId].collected += flous;
        investmentList.push(newI);
        
        
        if (projectList[_projectId].collected >= projectList[_projectId].amount) {
            
            //address from_ = 0x0d0815d5c4FaC2827C5B21F0f0F0f55B29Ad721A; 
 /*
    
         uint _id = proposalList[_me].loanId; 
*/
 
            ERC20Interface.transfer(projectList[_projectId].demander, projectList[_projectId].collected);
            accomplishProject( _projectId);
 
        }
    }
    
    function getProjectListLength() public view returns (uint) {
        return projectList.length;
    }
    
    function getProjectIndexesOfaParticular() public view returns(uint[] memory) {
        return projectMap[msg.sender];
    }
    
    function getProjectInfo(uint _projectId) public view returns(string memory, uint, address, string memory, uint256, string memory, uint, uint, ProjectState) {
        Project memory p = projectList[_projectId];
        return (p.demanderName, p.contact, p.demander, p.title, p.deadLine, p.description, p.amount, p.collected, p.state);
    }
    
    function getInvestmentIndexesOfaParticularAdherant() public view returns(uint[] memory) {
        return investmentMap[msg.sender];
    }
    
    function getInvestmentIndexesOfaParticularProject(uint _projectId) public view returns(uint[] memory) {
        Project memory p = projectList[_projectId];
        return p.idInvestments;
    }
    
    function InvestmentInfo(uint _investmentId) public view returns(address, uint, uint256, uint) {
        Investment memory i = investmentList[_investmentId];
        return (i.owner, i.amount, i.date, i.projectId);
    }
    
    function accomplishProject(uint _projectId) public {
        projectList[_projectId].state = ProjectState.ACCOMPLISHED;
    }
    
    function failProject(uint _projectId) public {
        
        uint[] invs = projectList[_projectId].idInvestments;
            for (uint i=0; i < invs.length; i++) {
                address contract_ = tokens[convertttt()];
                ERC20Interface = ERC20(contract_);  
                ERC20Interface.transfer(investmentList[invs[i]].owner, investmentList[invs[i]].amount);
            }
        projectList[_projectId].state = ProjectState.FAILED;            
    }
    
    function acceptProject(uint _projectId) public {
        projectList[_projectId].state = ProjectState.ACCEPTED;
    }
    
    function refuseProject(uint _projectId) public {
        projectList[_projectId].state = ProjectState.REFUSED;
    }
    
    function convertttt() public pure returns (bytes32 result) {
        string memory testFoo = "IMFT";
        assembly {
            result := mload(add(testFoo, 32))
        }
    }
    
    
    
}