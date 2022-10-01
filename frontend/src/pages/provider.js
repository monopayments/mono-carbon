import { useState } from 'react';
import { fractionizeNft } from '../utils/web3/carbonMarket';
import { mintCertificate } from '../utils/web3/certificate';

const Provider = () => {
  const [amount, setAmount] = useState('');
  const [certificate, setCertificate] = useState('');
  const [nftID, setNftID] = useState('');

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const certificateChange = (e) => {
    setCertificate(e.target.value);
  };

  const nftIDChange = (e) => {
    setNftID(e.target.value);
  };

  const mint = async () => {
    await mintCertificate(parseInt(amount), parseInt(certificate));
    setAmount('');
    setCertificate('');
  };

  const fracturize = async () => {
    await fractionizeNft(parseInt(nftID));
    setNftID('');
  };

  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-row justify-center items-center">
      <div className="block md:flex container w-full items-center justify-between">
        <div className="w-full md:w-5/12 overflow-hidden shadow-2xl border-2 border-gray-100 rounded-xl mb-5">
          <div className="p-5">
            <div className="border-b w-full">
              <h1 className="text-xl font-bold text-center pb-2">Mint</h1>
            </div>
            <p className="pt-5">Amount of carbon (m³)</p>
            <input
              type="text"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1000000.0"
              required
              onChange={(e) => amountChange(e)}
            />
            <p className="pt-5">Certificate ID</p>
            <input
              type="text"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="12345678"
              required
              onChange={(e) => certificateChange(e)}
            />
            <button
              onClick={mint}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center w-full mt-5"
            >
              Mint NFT
            </button>
          </div>
        </div>

        <div className="w-full md:w-5/12 overflow-hidden shadow-2xl border-2 border-gray-100 rounded-xl">
          <div className="p-5">
            <div className="border-b w-full">
              <h1 className="text-xl font-bold text-center pb-2">Fracturize</h1>
            </div>
            <p className="pt-5">Fracturize NFT ID</p>
            <input
              type="text"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
              onChange={(e) => nftIDChange(e)}
            />
            <button
              onClick={fracturize}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center w-full mt-5"
            >
              Fracturize NFT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provider;
