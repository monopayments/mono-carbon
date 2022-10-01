import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ code }) => {
  if (code === '404') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
          <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
          <button className="mt-5">
            <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link to="/">Go Home</Link>
              </span>
            </span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <h1 className="text-9xl font-extrabold tracking-widest">{code}</h1>
          <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Internal Error
          </div>
          <button className="mt-5">
            <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link to="/">Go Home</Link>
              </span>
            </span>
          </button>
        </div>
      </div>
    );
  }
};

export default Error;
