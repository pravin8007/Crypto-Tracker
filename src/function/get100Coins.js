import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

let cachedCoins = null;
let lastFetchTime = 0;

const CACHE_DURATION = 60_000;
const MAX_RETRIES = 3;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const get100coins = async () => {
  const now = Date.now();

  if (cachedCoins && now - lastFetchTime < CACHE_DURATION) {
    return cachedCoins;
  }

  let retries = MAX_RETRIES;
  let delayTime = 1000;

  while (retries > 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,

          // ✅ REQUIRED for Feb 2026
          include_rehypothecated: true,
        },
        timeout: 5000,
      });

      if (!Array.isArray(response.data)) {
        console.warn("Invalid coins response format");
        return [];
      }

      // ✅ Normalize market cap rank safely
      cachedCoins = response.data.map((coin) => ({
        ...coin,
        market_cap_rank:
          coin.market_cap_rank_with_rehypothecated ??
          coin.market_cap_rank ??
          null,
      }));

      lastFetchTime = Date.now();
      return cachedCoins;
    } catch (error) {
      if (error.response?.status === 429 && retries > 1) {
        console.warn(`Rate limit hit. Retrying in ${delayTime}ms...`);
        await delay(delayTime);
        delayTime *= 2;
        retries--;
      } else {
        console.error(
          "Error fetching coins:",
          error?.response?.status || error.message,
        );
        return [];
      }
    }
  }

  return [];
};
