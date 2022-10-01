import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NftCard from '../components/NftCard';
import { getNftList } from '../utils/web3/carbonMarket';

function Marketplace() {
  const [query] = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState(query.get('provider') || '');
  const [nftIDs, setNftIDs] = useState();

  const listedNfts = [
    {
      id: 200,
      provider: 'bis',
    },
    {
      id: 201,
      provider: 'gns',
    },
    {
      id: 202,
      provider: 'gns',
    },
  ];

  const providers = [
    {
      id: 'bis',
      name: 'Bisiklet Kira Şirketi',
    },
    {
      id: 'gns',
      name: 'Güneş Paneli Şirketi',
    },
    {
      id: 'akb',
      name: 'Akbank'
    }
  ];

  useEffect(() => {
    const asyncGet =  async () =>{
      let nfts = await getNftList()
      nfts = nfts.map((nftID) => {
        return(
          {
            id: Number(nftID),
            provider: 'akb',
          }
        )
      })
      setNftIDs(nfts.concat(listedNfts));
    }
    asyncGet();
  }, [])

  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-center bg-red">
        <div className="w-full flex flex-wrap">
          <div className="w-full sm:w-3/12">
            <aside aria-label="Sidebar">
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
          <div className="w-full md:w-9/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {nftIDs
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
