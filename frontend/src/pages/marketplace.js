import SvgIcon from "../components/SvgIcon";

function Marketplace() {
  return (
    <section className="w-full relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-center bg-red">
        <div className="w-full flex">
          <div className="w-3/12">
            <aside className="w-64" aria-label="Sidebar">
              <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/#"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <SvgIcon icon="list" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                      <span className="ml-3">All</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <SvgIcon icon="list" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                      <span className="ml-3">Akbank</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
          <div className="w-9/12">
            <h2>providers</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
