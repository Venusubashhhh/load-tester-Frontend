import React from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip
);

interface ChartProp {
  data: {
    x: Date[];
    y: number[];
  };
}

export function Charts({ data }: ChartProp) {
  const datavalue = {
    labels: data.x,
    datasets: [
      {
        borderWidth: 0.5,
        label: "Latency",
        data: data.y,
        borderColor: "green",
        backgroundColor: "green",
        yAxisID: "y",
        pointStyle: data.y.map((value) =>
          value === 0 ? "crossRot" : "circle"
        ),
        pointRadius: data.y.map((value) => (value === 0 ? 3 : 0)),
        pointBorderColor: data.y.map((value) => (value === 0 ? "red" : "")),
        tension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Latency Graph",
      },
      responsiveDownsample: {
        enabled: true,
        aggregationAlgorithm: "LTTB",
        desiredDataPointDistance: 1,
        minNumPoints: 100,
        cullData: true,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        title: {
          display: true,
          text: "Latency (ms)",
        },
      },
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Request No.",
        },
      },
    },
  };

  return (
    <Line
      options={options}
      data={datavalue}
    />
  );
}
