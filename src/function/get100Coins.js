import axios from "axios";

let cachedCoins = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const get100coins = async () => {
  const now = Date.now();
  if (cachedCoins && now - lastFetchTime < CACHE_DURATION) {
    return cachedCoins;
  }

  let retries = 3;
  let delayTime = 1000;

  while (retries > 0) {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
          timeout: 5000,
        }
      );
      cachedCoins = response.data;
      lastFetchTime = now;
      return cachedCoins;
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn("Rate limit hit. Retrying after delay...");
        await delay(delayTime);
        delayTime *= 2;
        retries--;
      } else {
        console.error("Error fetching coins:", error.message);
        return [];
      }
    }
  }

  return []; // fallback if retries exhausted
};
