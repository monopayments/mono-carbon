import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/Layout';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
// pages
import Home from './pages/home.js';
import Exchange from './pages/exchange.js';
import Marketplace from './pages/marketplace.js';
import Detail from './pages/detail.js';
import Provider from './pages/provider.js';
import Error from './pages/error.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const avalancheFUJIChain = {
  id: 43_113,
  name: 'Avalanche FUJI',
  network: 'avalanche',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche FUJI',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax-test.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
  },
  testnet: false,
};


const { chains, provider } = configureChains(
  [avalancheFUJIChain],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "MonoCarbon",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <React.StrictMode>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/exchange" element={<Exchange />}></Route>
              <Route path="/marketplace" element={<Marketplace />}></Route>
              <Route path="/provider" element={<Provider />}></Route>
              <Route path="/detail/:id" element={<Detail />}></Route>
              <Route path="*" element={<Error code="404" />}></Route>

            </Routes>
          </Layout>
        </Router>
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);