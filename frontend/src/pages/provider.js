const Provider = () => {
  return (
    <section className="w-full h-screen relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-center">
        <div className="w-full max-w-lg shadow-2xl border-2 border-gray-100 rounded-lg">
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
            />
            <p className="pt-5">Certificate ID</p>
            <input
            type="text"
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="12345678"
            required
            />
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center w-full mt-5"
            >Mint NFT</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Provider