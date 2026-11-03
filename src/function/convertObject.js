export const coinObject = (setState, data = {}) => {
  const marketData = data?.market_data ?? data;

  setState({
    id: data?.id ?? "",
    name: data?.name ?? "",
    symbol: data?.symbol ?? "",
    image: data?.image?.large ?? data?.image ?? "",
    desc: data?.description?.en || "No description available",
    price_change_percentage_24h:
      marketData?.price_change_percentage_24h ?? 0,
    total_volume:
      marketData?.total_volume?.usd ?? marketData?.total_volume ?? 0,
    current_price:
      marketData?.current_price?.usd ?? marketData?.current_price ?? 0,
    market_cap: marketData?.market_cap?.usd ?? marketData?.market_cap ?? 0,

    // ✅ NEW (CoinGecko Feb 2026 compatible)
    market_cap_rank:
      data?.market_cap_rank_with_rehypothecated ??
      data?.market_cap_rank ??
      null,
  });
};
