
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
  const [isChartLoading, setIsChartLoading] = useState(false);

  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const options = {
  responsive: true,
  stacked: false,
  scales: {
    crypto1: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    crypto2: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false, // Prevents grid lines from overlapping
      },
    },
  },
};

  // Remove duplicate dates from chart data
  const removeDuplicateDates = (prices) => {
    if (!Array.isArray(prices)) return [];

    const dateMap = new Map();

    prices.forEach((price) => {
      const dateStr = ConvertDate(price[0]);
      const timestamp = price[0];

      if (
        !dateMap.has(dateStr) ||
        timestamp > dateMap.get(dateStr)[0]
      ) {
        dateMap.set(dateStr, price);
      }
    });

    return Array.from(dateMap.values()).sort(
      (a, b) => a[0] - b[0]
    );
  };

  // Fetch coin details only when coinId changes
  useEffect(() => {
    let isMounted = true;

    const fetchCoinData = async () => {
      setIsLoading(true);

      try {
        const data = await getCoinData(coinId);

        if (!isMounted) return;

        if (data) {
          coinObject(setCoinData, data);
        } else {
          setCoinData(undefined);
        }
      } catch (error) {
        console.error("Error fetching coin details:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (coinId) {
      fetchCoinData();
    }

    return () => {
      isMounted = false;
    };
  }, [coinId]);

  // Fetch chart data when coinId, days or priceType changes
  useEffect(() => {
    let isMounted = true;

    const fetchChartData = async () => {
      setIsChartLoading(true);

      try {
        const prices = await getCoinPrices(
          coinId,
          days,
          priceType
        );

        if (!isMounted) return;

        const uniquePrices = removeDuplicateDates(prices);

        if (uniquePrices.length > 0) {
          settingChartData({
            setChartData,
            prices1: uniquePrices,
          });
        } else {
          setChartData({
            labels: [],
            datasets: [],
          });
          console.warn("No valid chart data received");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        if (isMounted) {
          setIsChartLoading(false);
        }
      }
    };

    if (coinId) {
      fetchChartData();
    }

    return () => {
      isMounted = false;
    };
  }, [coinId, days, priceType]);

  // Only update state here. useEffect handles API requests.
  const handleDaysChange = (event) => {
    setDays(Number(event.target.value));
  };

  const handlePriceTypeChange = (event, newType) => {
    if (newType) {
      setPriceType(newType);
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
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
            />

            <Pricetype
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />

            {isChartLoading ? (
              <Loader inline />
            ) : (
              <LineChart
                chartData={chartData}
                multiAxis={false}
                options={options}
              />
            )}
          </div>

          <CoinInfo
            heading={coinData.name}
            desc={coinData.desc}
          />
        </>
      )}
    </div>
  );
}

export default CoinPage;
