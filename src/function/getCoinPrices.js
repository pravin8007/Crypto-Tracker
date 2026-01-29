import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";
const VALID_PRICE_TYPES = ["prices", "market_caps", "total_volumes"];

export const getCoinPrices = async (coinId, days, priceType = "prices") => {
  if (!coinId || !days) {
    console.warn("getCoinPrices: missing coinId or days");
    return [];
  }

  if (!VALID_PRICE_TYPES.includes(priceType)) {
    console.warn(`Invalid priceType: ${priceType}`);
    return [];
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
          interval: "daily",
        },
        timeout: 10000,
      },
    );

    const data = response?.data?.[priceType];

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      `Error fetching ${priceType} for ${coinId} (${days} days):`,
      error?.response?.status || error.message,
    );
    return [];
  }
};
