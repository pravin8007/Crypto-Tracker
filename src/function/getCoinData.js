
import axios from "axios";
import { get100coins, CACHE_DURATION } from "./get100Coins";

const coinDataCache = {};
const STORAGE_PREFIX = "crypto-tracker:details:";

const readStoredDetails = (coinId) => {
  try {
    const stored = JSON.parse(
      localStorage.getItem(`${STORAGE_PREFIX}${coinId}`)
    );
    if (stored && Date.now() - stored.timestamp < CACHE_DURATION) {
      return stored.data;
    }
  } catch (error) {
    console.warn("Unable to read cached coin details:", error);
  }
  return null;
};

const cacheDetails = (coinId, data) => {
  coinDataCache[coinId] = { data, timestamp: Date.now() };
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${coinId}`,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch (error) {
    console.warn("Unable to cache coin details:", error);
  }
};

export const getCoinData = async (coinId) => {
  if (!coinId) return null;

  const now = Date.now();

  if (
    coinDataCache[coinId] &&
    now - coinDataCache[coinId].timestamp < CACHE_DURATION
  ) {
    return coinDataCache[coinId].data;
  }

  const storedDetails = readStoredDetails(coinId);
  if (storedDetails) {
    coinDataCache[coinId] = { data: storedDetails, timestamp: now };
    return storedDetails;
  }

  try {
    const response = await axios.get("/api/coin-details", {
      params: { id: coinId, localization: false },
      timeout: 15000,
    });

    const data = response.data;

    if (!data || typeof data !== "object" || !data.id || !data.name) {
      throw new Error("Invalid coin details response");
    }

    const normalizedData = {
      ...data,
      market_cap_rank:
        data.market_cap_rank_with_rehypothecated ??
        data.market_cap_rank ??
        null,
    };

    cacheDetails(coinId, normalizedData);

    return normalizedData;
  } catch (error) {
    console.error(
      `Error fetching coin data (${coinId}):`,
      error.response?.status || error.message
    );

    try {
      const coins = await get100coins();
      const fallbackCoin = coins.find(
        (coin) => coin.id === coinId
      );

      if (fallbackCoin) {
        cacheDetails(coinId, fallbackCoin);
        return fallbackCoin;
      }
    } catch (fallbackError) {
      console.error(
        `Fallback coin data request failed (${coinId}):`,
        fallbackError.response?.status || fallbackError.message
      );
    }

    throw error;
  }
};
