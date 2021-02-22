export const ContractsAbi = [
  {
    constant: true,
    inputs: [],
    name: "getInvestmentIndexesOfaParticularAdherant",
    outputs: [
      {
        name: "",
        type: "uint256[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "ERC20Interface",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "symbol_",
        type: "bytes32"
      }
    ],
    name: "removeToken",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "symbol_",
        type: "bytes32"
      },
      {
        name: "_me",
        type: "uint256"
      }
    ],
    name: "transferTokens",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "flous",
        type: "uint256"
      },
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "newInvestment",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "investmentMap",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "refuseProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "beneficiary",
        type: "address"
      }
    ],
    name: "withdraw",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "accomplishProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "getInvestmentIndexesOfaParticularProject",
    outputs: [
      {
        name: "",
        type: "uint256[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "phone",
        type: "uint256"
      },
      {
        name: "title",
        type: "string"
      },
      {
        name: "deadL",
        type: "uint256"
      },
      {
        name: "desc",
        type: "string"
      },
      {
        name: "flous",
        type: "uint256"
      }
    ],
    name: "newProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "projectList",
    outputs: [
      {
        name: "demanderName",
        type: "string"
      },
      {
        name: "contact",
        type: "uint256"
      },
      {
        name: "demander",
        type: "address"
      },
      {
        name: "title",
        type: "string"
      },
      {
        name: "deadLine",
        type: "uint256"
      },
      {
        name: "description",
        type: "string"
      },
      {
        name: "amount",
        type: "uint256"
      },
      {
        name: "collected",
        type: "uint256"
      },
      {
        name: "state",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "investmentList",
    outputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      },
      {
        name: "date",
        type: "uint256"
      },
      {
        name: "projectId",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "failProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "Depot",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32"
      }
    ],
    name: "tokens",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "transactions",
    outputs: [
      {
        name: "contract_",
        type: "address"
      },
      {
        name: "to_",
        type: "address"
      },
      {
        name: "amount_",
        type: "uint256"
      },
      {
        name: "failed_",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getProjectIndexesOfaParticular",
    outputs: [
      {
        name: "",
        type: "uint256[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "symbol_",
        type: "bytes32"
      },
      {
        name: "address_",
        type: "address"
      }
    ],
    name: "addNewToken",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_investmentId",
        type: "uint256"
      }
    ],
    name: "InvestmentInfo",
    outputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "transactionIndexesToSender",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "projectMap",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "convertttt",
    outputs: [
      {
        name: "result",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "getProjectInfo",
    outputs: [
      {
        name: "",
        type: "string"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "string"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "string"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getProjectListLength",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_projectId",
        type: "uint256"
      }
    ],
    name: "acceptProject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from_",
        type: "address"
      },
      {
        indexed: true,
        name: "to_",
        type: "address"
      },
      {
        indexed: false,
        name: "amount_",
        type: "uint256"
      }
    ],
    name: "TransferSuccessful",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from_",
        type: "address"
      },
      {
        indexed: true,
        name: "to_",
        type: "address"
      },
      {
        indexed: false,
        name: "amount_",
        type: "uint256"
      }
    ],
    name: "TransferFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Pause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Unpause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  }
];

export const ContractAdress = "0x3d8bcdc9a6ff0f0a49deb18bef13c7d3abf3a0de";
