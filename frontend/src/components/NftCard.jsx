import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SvgIcon from '../components/SvgIcon';

const NftCard = ({ id }) => {
  const [nftData, setNftData] = useState({});

  const fetchNftData = async () => {
    try {
        const response = await fetch(`https://api.nft.storage/${id}`);
        const data = response.json();
        setNftData(data);
        console.log('data');
    } catch (error) {
        console.log('error');
    }
  }

  useEffect(() => {
    fetchNftData(id);
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full bg-[#1c1c1c] text-gray-50 overflow-hidden rounded-md max-w-sm p-2 flex flex-col">
        <div className="flex items-center justify-between p-5">
          <h3 className="text-left text-xl">{nftData.name}</h3>
          <div className="pl-4">
            <p>by {nftData.provider}</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-[#2a2a2a] min-h-[250px]">
          <a
            className="flex items-center justify-center"
            href="/#"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={nftData.image}
              alt={nftData.name}
              className="w-1/2 object-cover"
            />
          </a>
        </div>
        <div className="flex justify-between p-5">
          <div className="w-full flex items-center justify-center text-white font-bold">
            <span className="mr-auto">Price: </span>
            <div className="flex items-center justify-center">
              <span className="text-lg mr-3"> {nftData.price}</span>
              <div className="flex items-center justify-center bg-white rounded-full w-8 h-8">
                <SvgIcon icon="CARBON" className="w-6 h-6 mt-2" />
              </div>
                
            </div>
          </div>
        </div>
        <div className="w-full bg-[#2a2a2a]">
          <Link
            to={`/detail/${id}`}
            className="w-full flex justify-center items-center rounded bg-[#2a2a2a] p-4 hover:bg-[#F9FAFB] hover:text-black"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
