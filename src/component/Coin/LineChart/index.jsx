import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertNumbers } from "../../../function/convertNumbers";

function LineChart({ chartData, multiAxis, priceType }) {
  const formatValue = (value) => {
    return priceType === "prices"
      ? "$" + value.toLocaleString()
      : "$" + convertNumbers(value);
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: multiAxis,
      },
      tooltip: {
        callbacks: {
          label: (context) => formatValue(context.raw),
        },
      },
    },
    scales: multiAxis
      ? {
          crypto1: {
            type: "linear",
            position: "left",
            display: true,
            ticks: {
              callback: formatValue,
            },
            grid: {
              drawOnChartArea: true,
            },
          },
          crypto2: {
            type: "linear",
            position: "right",
            display: true,
            ticks: {
              callback: formatValue,
            },
            grid: {
              drawOnChartArea: false, 
            },
          },
        }
      : {
          crypto1: {
            type: "linear",
            position: "left",
            display: true,
            ticks: {
              callback: formatValue,
            },
            grid: {
              drawOnChartArea: true,
            },
          },
        },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
