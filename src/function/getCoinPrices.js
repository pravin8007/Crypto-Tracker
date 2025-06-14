import axios from "axios";

export const getCoinPrices = async (coinId, days, priceType = "prices") => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    const response = await axios.get(url);

    const data = response?.data?.[priceType];

    if (!Array.isArray(data)) {
      console.warn(`Invalid data format for ${priceType}`, data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return [];
  }
};
