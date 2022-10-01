import { useEffect, useState } from 'react';
import Swap from '../components/Swap';
import Liquidity from '../components/Liquidity';
import { ethers } from "ethers";



function Exchange() {
  const [activeTab, setActiveTab] = useState('swap');


const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");

const DexAddress = "0x0355eE85Be5eD60331a36Ee096e829f500FC57c9";
const totalSupplyabi = [
  "function totalSupply() view returns (uint256)"
];

async function totalSupply() {
	const contract = new ethers.Contract(DexAddress, totalSupplyabi,provider);
	let result = await contract.functions.totalSupply();
  result = result[0].toNumber();
	console.log("result", result);
}

const cryptoDevTokenAddressabi = [
  "function cryptoDevTokenAddress() view returns (address)"
];

async function cryptoDevTokenAddress() {
	const contract = new ethers.Contract(DexAddress, cryptoDevTokenAddressabi, provider);   
	const result = await contract.functions.cryptoDevTokenAddress();
  console.log("result", result[0]);
}



useEffect(() => {
  try {
  //totalSupply();
  //cryptoDevTokenAddress(); 
} catch (err) {
  console.log('error totalSupply ...', err)
}
}, [])


  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-center">
        <div className="w-full max-w-lg shadow-2xl border-2 border-gray-100 rounded-lg">
          <nav className="block w-full border-b-2 border-gray-100">
            <ul className="flex">
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTab === 'swap'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('swap');
                  }}
                >
                  Swap
                </a>
              </li>
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTab === 'liquidity'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('liquidity');
                  }}
                >
                  Liquidity
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-5">
            {activeTab === 'swap' && <Swap />}
            {activeTab === 'liquidity' && <Liquidity />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Exchange;
