import { ethers, BigNumber } from "ethers";
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
	const tx = await contract.fractionizeNft(BigNumber.from(_id),BigNumber.from(1));

	const receipt = await tx.wait();
	console.log("receipt", receipt);
}