export const coinObject = (setState, data = {}) => {
  setState({
    id: data?.id ?? "",
    name: data?.name ?? "",
    symbol: data?.symbol ?? "",
    image: data?.image?.large ?? "",
    desc: data?.description?.en || "No description available",
    price_change_percentage_24h:
      data?.market_data?.price_change_percentage_24h ?? 0,
    total_volume: data?.market_data?.total_volume?.usd ?? 0,
    current_price: data?.market_data?.current_price?.usd ?? 0,
    market_cap: data?.market_data?.market_cap?.usd ?? 0,

    // ✅ NEW (CoinGecko Feb 2026 compatible)
    market_cap_rank:
      data?.market_cap_rank_with_rehypothecated ??
      data?.market_cap_rank ??
      null,
  });
};
