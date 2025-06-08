import axios from "axios";

export const getCoinPrices = async (coinId, days, priceType = "prices") => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );

    console.log(response.data[priceType]);
    
    return response.data[priceType];
  } catch (error) {
    console.error("Error fetching prices:", error);
    return [];
  }
};
