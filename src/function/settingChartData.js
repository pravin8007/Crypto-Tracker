import { ConvertDate } from "./convertDate";

export const settingChartData = ({ setChartData, prices, priceType }) => {
  if (!prices?.length) return;
  

  const colors = {
    prices: { border: "#3a80e9", bg: "rgba(62,135,195,0.1)", label: "Price" },
    market_caps: { border: "#f1c40f", bg: "rgba(241,196,15,0.1)", label: "Market Cap" },
    total_volumes: { border: "#e94343", bg: "rgba(233,67,67,0.1)", label: "Total Volume" },
  };

  const { border, bg, label } = colors[priceType] || colors.prices;

  setChartData({
    labels: prices.map(p => ConvertDate(p[0])),
    datasets: [{
      label,
      data: prices.map(price => price[1]),
      borderColor: border,
      backgroundColor: bg,
      borderWidth: 2,
      fill: true,
      tension: 0.25,
      pointRadius: 1,
    }],
  });
};
