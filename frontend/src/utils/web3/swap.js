
import { BigNumber, ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const dexaddress = "0x0355eE85Be5eD60331a36Ee096e829f500FC57c9";

const tokenAddress = "0xa4e0C6859C9Fe01B097f6AE17e9AD51656e23f68";
const cryptoDevTokenToEthabi = [
    "function cryptoDevTokenToEth(uint256 _tokensSold, uint256 _minEth)"
  ];

  const signer = provider.getSigner();



  export const cryptoDevTokenToEth = async (_tokensSold ,_minEth) => {
	const contract = new ethers.Contract(dexaddress, cryptoDevTokenToEthabi, signer);   

    let num = ethers.utils.parseEther(_tokensSold.toString());

	const tx = await contract.functions.cryptoDevTokenToEth(num,1);
	const receipt = await tx.wait();
	console.log("receipt", receipt);
}


const increaseAllowanceabi = [
    "function increaseAllowance(address spender, uint256 addedValue) returns (bool)"
  ];
  

export const increaseAllowance = async (_tokensSold ,) => { 

      const contract = new ethers.Contract(tokenAddress, increaseAllowanceabi, signer);  
      const tx = await contract.functions.increaseAllowance(dexaddress,_tokensSold);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
  }
  

  
  const getAmountOfTokensabi = [
    "function getAmountOfTokens(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) pure returns (uint256)"
  ];
  
  export const getAmountOfTokens = async (inputAmount) => { 

    if(inputAmount===0){
      return 0;
    }
    inputAmount = inputAmount*100
    if(inputAmount>=52){
      return 0;
    }
let inputReserve =   52
let outputReserve = inputReserve-inputAmount;
    const contract = new ethers.Contract(dexaddress, getAmountOfTokensabi, provider);   
    let result = await contract.functions.getAmountOfTokens(inputAmount,inputReserve,outputReserve);
    result = Number(result);

    console.log("result", result/100);

    return result/100;
  }

const ethToCryptoDevTokenabi = [
  "function ethToCryptoDevToken(uint256 _minTokens) payable"
];

export const ethToCryptoDevToken = async (_avaxAmount ,) => { 

  const options = {value: ethers.utils.parseEther(_avaxAmount.toString())}
	const contract = new ethers.Contract(dexaddress, ethToCryptoDevTokenabi, signer);   
	const tx = await contract.functions.ethToCryptoDevToken(1,options);
  const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const balanceOfabi = [
  "function balanceOf(address account) view returns (uint256)"
];


export const balanceOf = async () => { 

  const contract = new ethers.Contract(tokenAddress, balanceOfabi, signer);   
  let tempAdress = await signer.getAddress();
	let  result = await contract.functions.balanceOf(tempAdress);
  result = ethers.utils.formatEther(result.toString());


	console.log("result", result);
  return result;
}