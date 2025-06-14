import React, { useEffect, useState } from 'react';
import Header from '../component/Common/Header';
import SelectCoins from '../component/Compare/SelectCoins';
import SelectDays from '../component/Coin/SelectDays';
import { getCoinData } from '../function/getCoinData';
import { coinObject } from '../function/convertObject';
import { getCoinPrices } from '../function/getCoinPrices';
import Loader from '../component/Common/Loader';
import List from '../component/Dashboard/List';
import CoinInfo from '../component/Coin/CoinInfo';
import { settingChartData } from "../function/settingChartData";
import LineChart from '../component/Coin/LineChart';
import Pricetype from "../component/Coin/Pricetype";
import { ConvertDate } from '../function/convertDate';

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});

  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");

  const [chartData, setChartData] = useState({});


  const removeDuplicateDates = (prices) => {
    if (!prices || !Array.isArray(prices)) return [];

    const dateMap = new Map();

    prices.forEach((price) => {
      const dateStr = ConvertDate(price[0]);
      const timestamp = price[0];

      if (!dateMap.has(dateStr) || timestamp > dateMap.get(dateStr)[0]) {
        dateMap.set(dateStr, price);
      }
    });

    return Array.from(dateMap.values()).sort((a, b) => a[0] - b[0]);
  };


  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setIsLoading(true);
      const data1 = await getCoinData(crypto1);
      if (data1) {
        const data2 = await getCoinData(crypto2);
        coinObject(setCrypto1Data, data1);
        if (data2) {
          coinObject(setCrypto2Data, data2);
          const prices1 = removeDuplicateDates(await getCoinPrices(crypto1, days, priceType));
          const prices2 = removeDuplicateDates(await getCoinPrices(crypto2, days, priceType));
          settingChartData({ setChartData, prices1, prices2 });
        }
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    const selectedCoin = event.target.value;

    try {
      if (isCoin2) {
        setCrypto2(selectedCoin);
        const data = await getCoinData(selectedCoin);
        coinObject(setCrypto2Data, data);

        const prices1 = removeDuplicateDates(await getCoinPrices(crypto1, days, priceType));
        const prices2 = removeDuplicateDates(await getCoinPrices(selectedCoin, days, priceType));
        settingChartData({ setChartData, prices1, prices2 });
      } else {
        setCrypto1(selectedCoin);
        const data = await getCoinData(selectedCoin);
        coinObject(setCrypto1Data, data);

        const prices1 = removeDuplicateDates(await getCoinPrices(selectedCoin, days, priceType));
        const prices2 = removeDuplicateDates(await getCoinPrices(crypto2, days, priceType));
        settingChartData({ setChartData, prices1, prices2 });
      }
    } catch (err) {
      console.error("Coin change failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDaysChange = async (event) => {
    const selectedDays = Number(event.target.value);
    setDays(selectedDays);
    setIsLoading(true);

    try {
      const prices1 = removeDuplicateDates(await getCoinPrices(crypto1, selectedDays, priceType));
      const prices2 = removeDuplicateDates(await getCoinPrices(crypto2, selectedDays, priceType));

      console.log("Prices after changing days:", prices1, prices2);
      settingChartData({ setChartData, prices1, prices2 });
    } catch (err) {
      console.error("Days change failed", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePriceTypeChange = async (event) => {
    const selectedType = event.target.value;
    setPriceType(selectedType);
    setIsLoading(true);

    try {
      const prices1 = removeDuplicateDates(await getCoinPrices(crypto1, days, selectedType));
      const prices2 = removeDuplicateDates(await getCoinPrices(crypto2, days, selectedType));
      settingChartData({ setChartData, prices1, prices2 });
    } catch (error) {
      console.error("Error changing price type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className='coin-days-flex'>
        <SelectCoins
          crypto1={crypto1}
          crypto2={crypto2}
          handleCoinChange={handleCoinChange}
        />
        <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={true} />
      </div>
      {isLoading || !crypto1Data.name || !crypto2Data.name ? (
        <Loader />
      ) : (
        <>
          <div className="gray-wrapper">
            <table><tbody><List coin={crypto1Data} /></tbody></table>
          </div>
          <div className="gray-wrapper">
            <table><tbody><List coin={crypto2Data} /></tbody></table>
          </div>
          <div className="gray-wrapper">
            <Pricetype priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <h6 style={{textAlign:"center"}}>Comparison between {crypto1Data.name} and {crypto2Data.name}</h6>
            <LineChart chartData={chartData || { labels: [], datasets: [] }} multiAxis={true} priceType={priceType} />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
}

export default ComparePage;
