
import { ethers, BigNumber } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const dexaddress = "0xb4e618e73329F57470A0D463bE7657602E426e64";
const tokenAddress = "0xa4e0C6859C9Fe01B097f6AE17e9AD51656e23f68";
const cryptoDevTokenToEthabi = [
    "function cryptoDevTokenToEth(uint256 _tokensSold, uint256 _minEth)"
  ];

  const signer = provider.getSigner();

  export const cryptoDevTokenToEth = async (_tokensSold ,_minEth) => {
	const contract = new ethers.Contract(dexaddress, cryptoDevTokenToEthabi, signer);   

    let num = ethers.utils.parseEther('0.01');
    console.log(num.toString(10));
    // 10000000000000000 , 1 
	const tx = await contract.functions.cryptoDevTokenToEth( num.toString(10),1,{gasPrice: 1000000000, gasLimit: 100000});

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
  