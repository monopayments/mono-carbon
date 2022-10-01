import { ethers, BigNumber } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = "0xb4e618e73329F57470A0D463bE7657602E426e64";
const mintAbi = [
    "function mintCertificate(uint256 carbon, uint256 _cerfId)"
];

export const mintCertificate = async (amount, certificate) => {
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, mintAbi, signer);
	const tx = await contract.functions.mintCertificate(BigNumber.from(amount), BigNumber.from(certificate));

	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const approveAbi = [
    "function setApprovalForAll(address operator, bool approved)"
]

export const approval = async (_address) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, approveAbi, signer);   

    const tx = await contract.setApprovalForAll(_address, false);
    console.log(_address)
    console.log(tx)
    const receipt = await tx.wait();
	console.log("receipt", receipt);

}