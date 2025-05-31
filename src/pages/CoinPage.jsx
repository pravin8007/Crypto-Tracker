import React from 'react'
import Header from '../component/Common/Header'
import { useParams } from 'react-router-dom';

function CoinPage() {
    const { coinId } = useParams();
    console.log(coinId);
  return (
    <div>
     <Header />
     Coin -:- {coinId}

    </div>
  )
}

export default CoinPage
