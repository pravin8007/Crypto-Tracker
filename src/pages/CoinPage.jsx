import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../component/Common/Header";
import Loader from "../component/Common/Loader";
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import LineChart from "../component/Coin/LineChart";
import SelectDays from "../component/Coin/SelectDays";
import Pricetype from "../component/Coin/Pricetype";

import { getCoinData } from "../function/getCoinData";
import { getCoinPrices } from "../function/getCoinPrices";
import { settingChartData } from "../function/settingChartData";
import { coinObject } from "../function/convertObject";
import { ConvertDate } from "../function/convertDate";

function CoinPage() {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getCoinData(coinId);
        if (!isMounted) return;

        if (data) {
          coinObject(setCoinData, data);

          const prices = await getCoinPrices(coinId, days, priceType);
          if (!isMounted) return;

          if (prices && Array.isArray(prices) && prices.length > 0) {
            const uniquePrices = removeDuplicateDates(prices);
            if (uniquePrices.length > 0) {
              settingChartData({ setChartData, prices1: uniquePrices });
            } else {
              console.warn("No unique prices after filtering duplicates");
            }
          } else {
            console.warn("No valid prices data received:", prices);
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (coinId) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [coinId, days, priceType]);

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

  const handleDaysChange = async (event) => {
    const selectedDays = event.target.value;
    setDays(selectedDays);
    setIsLoading(true);

    try {
      const prices = await getCoinPrices(coinId, selectedDays, priceType);
      const uniquePrices = removeDuplicateDates(prices);

      if (uniquePrices.length > 0) {
        settingChartData({ setChartData, prices1: uniquePrices });
      } else {
        console.warn("No unique prices after filtering");
      }
    } catch (error) {
      console.error("Error in handleDaysChange:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    if (newType) {
      setPriceType(newType);
      setIsLoading(true);

      try {
        const prices = await getCoinPrices(coinId, days, newType);
        const uniquePrices = removeDuplicateDates(prices);

        if (uniquePrices.length > 0) {
          settingChartData({ setChartData, prices1: uniquePrices });
        } else {
          console.warn("No unique prices for selected price type");
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
      {isLoading || !coinData ? (
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
            <LineChart chartData={chartData} multiAxis={false} />
          </div>

          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
