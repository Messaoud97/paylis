export const ContractsAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "AcceptClient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fname",
				"type": "string"
			},
			{
				"name": "_lname",
				"type": "string"
			},
			{
				"name": "_password",
				"type": "string"
			}
		],
		"name": "newClient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "RejectClient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "Allauth",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "clientState",
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
		"constant": true,
		"inputs": [],
		"name": "getauth",
		"outputs": [
			{
				"name": "client",
				"type": "address"
			},
			{
				"name": "fname",
				"type": "string"
			},
			{
				"name": "lname",
				"type": "string"
			},
			{
				"name": "state",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getauthlength",
		"outputs": [
			{
				"name": "long",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getimf",
		"outputs": [
			{
				"name": "client",
				"type": "address"
			},
			{
				"name": "fname",
				"type": "string"
			},
			{
				"name": "lname",
				"type": "string"
			},
			{
				"name": "state",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
  
  export const ContractAdress = "0x50cb032c9e8b1ca93eb16a934bf2217c1f937f3d";
  