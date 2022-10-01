import React from 'react';

const Liquidity = () => {
  return (
    <>
      <div className="mb-5">
        <h2 className="block mb-3 font-semibold ">Add Liquidity</h2>

        <div className="relative inline-block w-7/12 sm:w-9/12">
          <input
            type="text"
            className="block mr-4 p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.0"
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2"
          >
            max
          </button>
        </div>
        <div className="inline-block w-5/12 sm:w-3/12 pl-5">
          <button
            type="submit"
            className="block w-full p-4 text-white bg-gray-700 rounded-lg border border-gray-600"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h2 className="block mb-3 font-semibold ">Remove Liquidity</h2>
        <div className="relative inline-block w-7/12 sm:w-9/12">
          <input
            type="text"
            className="block mr-4 p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.0"
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2"
          >
            max
          </button>
        </div>
        <div className="inline-block w-5/12 sm:w-3/12 pl-5">
          <button
            type="submit"
            className="block w-full p-4 text-white bg-gray-700 rounded-lg border border-gray-600"
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default Liquidity;
