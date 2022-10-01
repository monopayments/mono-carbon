import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NftCard from '../components/NftCard';

function Marketplace() {
  const [query] = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState(query.get('provider') || '');

  const listedNfts = [
    {
      id: 1,
      provider: 'xyz',
    },
    {
      id: 2,
      provider: 'abc',
    },
    {
      id: 3,
      provider: 'abc',
    },
  ];

  const providers = [
    {
      id: 'abc',
      name: 'ABC',
    },
    {
      id: 'xyz',
      name: 'XYZ',
    },
  ];

  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-center bg-red">
        <div className="w-full flex">
          <div className="w-3/12">
            <aside className="w-64" aria-label="Sidebar">
              <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50">
                <ul className="space-y-2">
                  <li>
                    <h2 className="p-2 text-lg font-bold">Providers</h2>
                  </li>
                  <li>
                    <Link
                      to="/marketplace"
                      className={
                        'flex items-center p-2 text-gray-900 rounded-lg' +
                        (selectedProvider === '' ? 'hover:bg-gray-100' : '')
                      }
                      onClick={() => setSelectedProvider('')}
                    >
                      <span className="ml-3">All</span>
                    </Link>
                  </li>
                  {providers.map((provider) => (
                    <li key={provider.id}>
                      <Link
                        to={`/marketplace?provider=${provider.id}`}
                        className={
                          'flex items-center p-2 text-gray-900 rounded-lg' +
                          (selectedProvider === provider ? 'hover:bg-gray-100' : '')
                        }
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        <span className="ml-3">{provider.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          <div className="w-9/12">
            <div className="grid grid-cols-3 gap-12">
              {listedNfts
                .filter((nft) => {
                  return selectedProvider === '' ? 'all' : nft.provider === selectedProvider;
                })
                .map((listedNft) => {
                  return <NftCard id={listedNft.id} key={listedNft.id} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
