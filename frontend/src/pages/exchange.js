import { useState } from 'react';
import Swap from '../components/Swap';
import Liquidity from '../components/Liquidity';

function Exchange() {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <section className="w-full h-screen relative flex flex-col justify-center items-center">
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
