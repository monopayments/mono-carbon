import { ethers } from "ethers";
import { approval } from "./certificate";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = "0x86E70857B06f6f5dC441Ef53bE975c88dD8A36a7";
const fracAbi = [
    "function fractionizeNft(uint256 nftId, uint256 amount)"
];

export const fractionizeNft = async (_id) => {
    await approval(address)
    const signer = provider.getSigner();
	const contract = new ethers.Contract(address, fracAbi, signer);   
	const tx = await contract.fractionizeNft(4,1);

	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const getNFTAbi = [
    "function getNftList() view returns (uint256[])"
  ];
  
export const getNftList = async() => {
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, getNFTAbi, signer);   
    const result = await contract.getNftList();

    console.log("result", result);
    return result;
}

const retireAbi = [
    "function retireNft(uint256 nftId) payable"
  ];
  
export const retireNft = async(nftId, value) => {
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, retireAbi, signer);

    const options = {value: ethers.utils.parseEther(value)}
    const tx = await contract.functions.retireNft(nftId, options);

    const receipt = await tx.wait();
    console.log("receipt", receipt);
}