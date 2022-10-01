import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-gray-100 py-5">
        <div className="container px-5 py-6 mx-auto flex items-center justify-between sm:flex-row flex-col">
          <a
            href="/#"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <span className="ml-3 text-xl">MonoCarbon</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2022 MonoPayments
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
