import React, { useEffect, useState } from 'react'
import Header from '../component/Common/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../component/Common/Loader';
import { coinObject } from '../function/convertObject';
import List from "../component/Dashboard/List";
import CoinInfo from '../component/Coin/CoinInfo';

function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(coinId);

  useEffect(() => {
    if (coinId) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`
      ).then((response) => {
        console.log(response.data)
        coinObject(setCoinData, response.data)
        setIsLoading(false);
      })
        .catch((error) => {
          console.error(error)
          setIsLoading(false)
        })
    }
  }, [coinId]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='gray-wrapper'>
            <List coin={coinData} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )
      }
    </div >
  );
}

export default CoinPage
