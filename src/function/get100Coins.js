
import axios from "axios";

let cachedCoins = null;
let cachedTimestamp = 0;
let fetchPromise = null;

export const CACHE_DURATION = 60 * 5 * 1000; // 
const STORAGE_KEY = "crypto-tracker:coins";

const readStoredCoins = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      stored &&
      Array.isArray(stored.data) &&
      Date.now() - stored.timestamp < CACHE_DURATION
    ) {
      return stored.data;
    }
  } catch (error) {
    console.warn("Unable to read cached coin data:", error);
  }
  return null;
};

export const get100coins = async () => {
  if (cachedCoins && Date.now() - cachedTimestamp < CACHE_DURATION) {
    return cachedCoins;
  }

  const storedCoins = readStoredCoins();
  if (storedCoins) {
    cachedCoins = storedCoins;
    cachedTimestamp = Date.now();
    return cachedCoins;
  }

  if (!fetchPromise) {
    fetchPromise = axios
      .get("/api/coins", { timeout: 15000 })
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid coins response format");
        }

        cachedCoins = response.data.map((coin) => ({
          ...coin,
          market_cap_rank:
            coin.market_cap_rank_with_rehypothecated ??
            coin.market_cap_rank ??
            null,
        }));
        cachedTimestamp = Date.now();

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: cachedCoins })
          );
        } catch (error) {
          console.warn("Unable to cache coin data:", error);
        }

        return cachedCoins;
      })
      .catch((error) => {
        console.error(
          "Error fetching coins:",
          error.response?.status || error.message
        );
        return [];
      })
      .finally(() => {
        fetchPromise = null;
      });
  }

  return fetchPromise;
};
