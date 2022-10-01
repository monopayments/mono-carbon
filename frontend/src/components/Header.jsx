import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const location = useLocation();
  return (
    <header className={isNavExpanded ? 'menu-open' : ''}>
      <nav className="border-gray-200 px-2 sm:px-4 py-2.5 primary-menu left-0 rigt-0 z-20 fixed w-full bg-white border-b">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              setIsNavExpanded(false);
            }}
          >
            <img src="/logo.svg" alt="MonoCarbon" width="20" height="60" className="mr-4" />
            <span className="self-center text-xl font-bold whitespace-nowrap">
              MonoCarbon
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="svg-trigger" viewBox="0 0 100 100">
              <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
              <path d="m 30,50 h 40"></path>
              <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 items-center">
              <li>
                <Link
                  to="/"
                  className={
                    location.pathname === '/'
                      ? 'block py-2 pr-4 pl-3 md:p-0'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/exchange"
                  className={
                    location.pathname === '/exchange'
                      ? 'block py-2 pr-4 pl-3 md:p-0'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className={
                    location.pathname === '/marketplace'
                      ? 'block py-2 pr-4 pl-3 md:p-0'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/provider"
                  className={
                    location.pathname === '/provider'
                      ? 'block py-2 pr-4 pl-3 md:p-0'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Provider
                </Link>
              </li>
              <li>
                <ConnectButton/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
