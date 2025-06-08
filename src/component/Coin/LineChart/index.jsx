import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertNumbers } from "../../../function/convertNumbers"; 

function LineChart({ chartData, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + convertNumbers(value);
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
