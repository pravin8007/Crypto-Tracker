import axios from "axios";

const VALID_PRICE_TYPES = ["prices", "market_caps", "total_volumes"];
const CACHE_DURATION = 60 * 5 * 1000; // 
const cacheKey = (coinId, days) => `crypto-tracker:prices:${coinId}:${days}`;
const pendingRequests = new Map();

const readCache = (key) => {
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  } catch (error) {
    console.warn("Unable to read cached chart data:", error);
  }
  return null;
};

export const getCoinPrices = async (
  coinId,
  days,
  priceType = "prices"
) => {
  if (!coinId || !days) return [];

  if (!VALID_PRICE_TYPES.includes(priceType)) {
    console.error("Invalid price type:", priceType);
    return [];
  }

  const key = cacheKey(coinId, days);
  const cachedData = readCache(key);
  if (cachedData && Array.isArray(cachedData[priceType])) {
    return cachedData[priceType];
  }

  if (!pendingRequests.has(key)) {
    pendingRequests.set(
      key,
      axios
        .get("/api/market-data", {
          params: { id: coinId, days },
          timeout: 15000,
        })
        .then((response) => {
          const data = response?.data;
          if (
            !data ||
            !Array.isArray(data.prices) ||
            !Array.isArray(data.market_caps) ||
            !Array.isArray(data.total_volumes)
          ) {
            throw new Error("Invalid market chart response");
          }

          try {
            localStorage.setItem(
              key,
              JSON.stringify({ timestamp: Date.now(), data })
            );
          } catch (error) {
            console.warn("Unable to cache chart data:", error);
          }

          return data;
        })
        .catch((error) => {
          console.error("Market chart API error:", {
            status: error.response?.status,
            response: error.response?.data,
            message: error.message,
          });
          throw error;
        })
        .finally(() => pendingRequests.delete(key))
    );
  }

  const responseData = await pendingRequests.get(key);
  return responseData[priceType];
};
