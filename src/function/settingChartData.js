import { ConvertDate } from "./convertDate.js";

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

  const timestamps = [
    ...new Set([
      ...prices1.map(([timestamp]) => timestamp),
      ...(prices2 || []).map(([timestamp]) => timestamp),
    ]),
  ].sort((a, b) => a - b);
  const labels = timestamps.map((timestamp) => ConvertDate(timestamp));
  const prices1ByTimestamp = new Map(
    prices1.map(([timestamp, value]) => [timestamp, value])
  );
  const prices2ByTimestamp = prices2
    ? new Map(prices2.map(([timestamp, value]) => [timestamp, value]))
    : null;

  const datasets = [
    {
      label: "Crypto1",
      data: timestamps.map((timestamp) =>
        prices1ByTimestamp.get(timestamp) ?? null
      ),
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
      data: timestamps.map((timestamp) =>
        prices2ByTimestamp.get(timestamp) ?? null
      ),
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
