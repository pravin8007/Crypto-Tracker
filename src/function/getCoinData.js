import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

const coinDataCache = {};
const CACHE_DURATION = 60000;  

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getCoinData = async (coinId) => {
  if (!coinId) {
    console.warn("getCoinData called without coinId");
    return null;
  }

  const cacheKey = coinId;
  const now = Date.now();

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
        `${API_BASE_URL}/coins/${coinId}`,
        {
          timeout: 5000, 
        }
      );

      const data = response.data;

      // ✅ Normalize market cap rank (Feb 2026 safe)
      const normalizedData = {
        ...data,
        market_cap_rank:
          data.market_cap_rank_with_rehypothecated ??
          data.market_cap_rank ??
          null,
      };

      coinDataCache[cacheKey] = {
        data: normalizedData,
        timestamp: Date.now(),
      };

      return normalizedData;
    } catch (error) {
      if (error.response?.status === 429 && retries > 1) {
        await delay(delayTime);
        retries--;
        delayTime *= 2;
      } else {
        console.error(
          `Error fetching coin data (${coinId}):`,
          error?.response?.status || error.message
        );
        return null;
      }
    }
  }

  return null;
};
