import axios from "axios";

// Simple in-memory cache
const coinDataCache = {};
const CACHE_DURATION = 60 * 1000; // 1 minute

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getCoinData = async (coinId) => {
  const cacheKey = coinId;
  const now = Date.now();

  // Return from cache if valid
  if (
    coinDataCache[cacheKey] &&
    now - coinDataCache[cacheKey].timestamp < CACHE_DURATION
  ) {
    return coinDataCache[cacheKey].data;
  }

  let retries = 3;
  let delayTime = 1000;

  while (retries > 0) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          timeout: 5000, // optional: prevent hanging
        }
      );

      const data = response.data;
      coinDataCache[cacheKey] = { data, timestamp: now }; // cache result
      return data;

    } catch (error) {
      if (error.response?.status === 429 && retries > 0) {
        await delay(delayTime);
        retries--;
        delayTime *= 2;
      } else {
        console.error("Error fetching coin data:", error.message || error);
        return null;
      }
    }
  }

  return null;
};
