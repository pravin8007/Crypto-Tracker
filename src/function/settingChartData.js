import { ConvertDate } from "./convertDate";

export const settingChartData = ({ setChartData, prices1, prices2 }) => {
  if (!Array.isArray(prices1) || prices1.length === 0) {
    console.error("Invalid prices1 data:", prices1);
    setChartData({ labels: [], datasets: [] });
    return;
  }

  if (prices2 && (!Array.isArray(prices2) || prices2.length === 0)) {
    console.error("Invalid prices2 data:", prices2);
    setChartData({ labels: [], datasets: [] });
    return;
  }

  const labels = prices1.map(([timestamp]) => ConvertDate(timestamp));

  const datasets = [
    {
      label: "Crypto1",
      data: prices1.map(([, price]) => price),
      borderColor: "#3a80e9",
      backgroundColor: prices2 ? undefined : "rgba(62,135,195,0.1)",
      borderWidth: 2,
      fill: !prices2,
      tension: 0.25,
      pointRadius: 1,
      yAxisID: "crypto1",
    },
  ];

  if (prices2) {
    datasets.push({
      label: "Crypto2",
      data: prices2.map(([, price]) => price),
      borderColor: "#6ac96f",
      borderWidth: 2,
      fill: false,
      tension: 0.25,
      pointRadius: 1,
      yAxisID: "crypto2",
    });
  }

  setChartData({
    labels,
    datasets,
  });
};
