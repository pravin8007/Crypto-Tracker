
import React, { useEffect, useState } from "react";
import Header from "../component/Common/Header";
import SelectCoins from "../component/Compare/SelectCoins";
import SelectDays from "../component/Coin/SelectDays";
import { getCoinData } from "../function/getCoinData";
import { coinObject } from "../function/convertObject";
import { getCoinPrices } from "../function/getCoinPrices";
import Loader from "../component/Common/Loader";
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import { settingChartData } from "../function/settingChartData";
import LineChart from "../component/Coin/LineChart";
import Pricetype from "../component/Coin/Pricetype";
import { ConvertDate } from "../function/convertDate";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});

  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");

  const [isLoading, setIsLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartError, setChartError] = useState("");
  const [chartData, setChartData] = useState({});

  const removeDuplicateDates = (prices) => {
    if (!Array.isArray(prices)) return [];

    const dateMap = new Map();

    prices.forEach((price) => {
      const dateStr = ConvertDate(price[0]);

      if (
        !dateMap.has(dateStr) ||
        price[0] > dateMap.get(dateStr)[0]
      ) {
        dateMap.set(dateStr, price);
      }
    });

    return Array.from(dateMap.values()).sort(
      (a, b) => a[0] - b[0]
    );
  };

  // Fetch coin details only when selected coins change
  useEffect(() => {
    let cancelled = false;

    const fetchCoinDetails = async () => {
      setDetailsLoading(true);
      setError("");

      try {
        const [data1, data2] = await Promise.all([
          getCoinData(crypto1),
          getCoinData(crypto2),
        ]);

        if (cancelled) return;

        if (data1) coinObject(setCrypto1Data, data1);
        if (data2) coinObject(setCrypto2Data, data2);

        if (!data1 || !data2) {
          setError("Unable to load coin details.");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching coin details:", error);
          setError("Unable to load coin details.");
        }
      } finally {
        if (!cancelled) {
          setDetailsLoading(false);
        }
      }
    };

    fetchCoinDetails();

    return () => {
      cancelled = true;
    };
  }, [crypto1, crypto2]);

  // Fetch comparison chart when selection changes
  useEffect(() => {
    let cancelled = false;

    const fetchChartData = async () => {
      setIsLoading(true);
      setChartError("");

      try {
        const [data1, data2] = await Promise.all([
          getCoinPrices(crypto1, days, priceType),
          getCoinPrices(crypto2, days, priceType),
        ]);

        if (cancelled) return;

        const prices1 = removeDuplicateDates(data1);
        const prices2 = removeDuplicateDates(data2);

        if (prices1.length === 0 || prices2.length === 0) {
          setChartData({ labels: [], datasets: [] });
          setChartError("Chart data is temporarily unavailable.");
          return;
        }

        settingChartData({
          setChartData,
          prices1,
          prices2,
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching comparison chart:", error);
          setChartData({ labels: [], datasets: [] });
          setChartError(
            error.response?.data?.error ||
            "Unable to load chart data. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchChartData();

    return () => {
      cancelled = true;
    };
  }, [crypto1, crypto2, days, priceType]);

  const handleCoinChange = (event, isCoin2) => {
    const selectedCoin = event.target.value;

    if (isCoin2) {
      setCrypto2(selectedCoin);
    } else {
      setCrypto1(selectedCoin);
    }
  };

  const handleDaysChange = (event) => {
    setDays(Number(event.target.value));
  };

const handlePriceTypeChange = (event, newValue) => {
    if (newValue !== null) {
        setPriceType(newValue);
    }
};

  return (
    <div>
      <Header />

      <div className="coin-days-flex">
        <SelectCoins
          crypto1={crypto1}
          crypto2={crypto2}
          handleCoinChange={handleCoinChange}
        />

        <SelectDays
          days={days}
          handleDaysChange={handleDaysChange}
          noPtag={true}
        />
      </div>

      {error ? (
        <h4 style={{ color: "var(--white)", textAlign: "center" }}>{error}</h4>
      ) : detailsLoading || !crypto1Data.name || !crypto2Data.name ? (
        <Loader />
      ) : (
        <>
          <div className="gray-wrapper">
            <table>
              <tbody>
                <List coin={crypto1Data} />
              </tbody>
            </table>
          </div>

          <div className="gray-wrapper">
            <table>
              <tbody>
                <List coin={crypto2Data} />
              </tbody>
            </table>
          </div>

          <div className="gray-wrapper">
            <Pricetype
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />

            <h6 style={{ textAlign: "center" }}>
              Comparison between {crypto1Data.name} and {crypto2Data.name}
            </h6>

            {isLoading ? (
              <Loader inline />
            ) : chartError ? (
              <p style={{ color: "var(--white)", textAlign: "center" }}>{chartError}</p>
            ) : (
              <LineChart
                chartData={chartData || { labels: [], datasets: [] }}
                multiAxis={true}
                priceType={priceType}
              />
            )}
          </div>

          <CoinInfo
            heading={crypto1Data.name}
            desc={crypto1Data.desc}
          />

          <CoinInfo
            heading={crypto2Data.name}
            desc={crypto2Data.desc}
          />
        </>
      )}
    </div>
  );
}

export default ComparePage;
