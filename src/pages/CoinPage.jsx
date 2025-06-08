import React, { useEffect, useState } from "react";
import Header from "../component/Common/Header";
import { useParams } from "react-router-dom";
import Loader from "../component/Common/Loader";
import { coinObject } from "../function/convertObject";
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import { getCoinData } from "../function/getCoinData";
import { getCoinPrices } from "../function/getCoinPrices";
import LineChart from "../component/Coin/LineChart";
import { ConvertDate } from "../function/convertDate";
import SelectDays from "../component/Coin/SelectDays";
import { settingChartData } from "../function/settingChartData";
import Pricetype from "../component/Coin/Pricetype";

function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const data = await getCoinData(coinId);
        if (!isMounted) return; 

        if (data) {
          coinObject(setCoinData, data);

          const prices = await getCoinPrices(coinId, days, priceType);
          if (!isMounted) return;

          if (prices && Array.isArray(prices) && prices.length > 0) {
            const uniquePrices = removeDuplicateDates(prices);
            if (uniquePrices && uniquePrices.length > 0) {
              settingChartData({ setChartData, prices: uniquePrices, priceType });
            } else {
              console.warn("No unique prices after filtering duplicates");
            }
          } else {
            console.warn("No valid prices data received:", prices);
          }
        }
      } catch (error) {
        if (isMounted) console.error("Error in getData:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (coinId) {
      setIsLoading(true);
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [coinId, days, priceType]);



  // Function to remove duplicate dates and keep the latest price for each date
  const removeDuplicateDates = (prices) => {
    if (!prices || !Array.isArray(prices)) return [];

    const dateMap = new Map();

    prices.forEach((price) => {
      const dateStr = ConvertDate(price[0]);
      const timestamp = price[0];

      // Keep the entry with the latest timestamp for each date
      if (!dateMap.has(dateStr) || timestamp > dateMap.get(dateStr)[0]) {
        dateMap.set(dateStr, price);
      }
    });

    return Array.from(dateMap.values()).sort((a, b) => a[0] - b[0]);
  };



  const handleDaysChange = async (event) => {
    const selectedDays = event.target.value;  // cache value
    setIsLoading(true);
    setDays(selectedDays);

    try {
      const prices = await getCoinPrices(coinId, selectedDays, priceType);
      if (prices && Array.isArray(prices) && prices.length > 0) {
        const uniquePrices = removeDuplicateDates(prices);
        if (uniquePrices && uniquePrices.length > 0) {
          settingChartData({ setChartData, prices: uniquePrices, priceType });
        } else {
          console.warn("No unique prices after filtering");
        }
      } else {
        console.warn("Prices is undefined or empty:", prices);
      }
    } catch (error) {
      console.error("Error in handleDaysChange:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    if (newType) {
      setIsLoading(true);
      setPriceType(newType);

      try {
        const prices = await getCoinPrices(coinId, days, newType);
        const uniquePrices = removeDuplicateDates(prices);

        if (uniquePrices && uniquePrices.length > 0) {
          settingChartData({ setChartData, prices: uniquePrices, priceType: newType });
        }
      } catch (error) {
        console.error("Error in handlePriceTypeChange:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="gray-wrapper">
            <table>
              <tbody>
                <List coin={coinData} />
              </tbody>
            </table>
          </div>
          <div className="gray-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <Pricetype priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData || { labels: [], datasets: [] }} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}



export default CoinPage;