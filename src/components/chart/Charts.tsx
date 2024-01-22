"use client";
import React, { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import Moment from 'moment';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip
);

interface ChartProps {
  data: {
    x: Date[];
    y: number[];
  };
}

export function Charts({ data }: ChartProps) {
  console.log(data);
  const datavalue = {
    labels: data.x,
    datasets: [
      {
        label: "Latency",
        data: data.y,
        borderColor: "red",
        backgroundColor: "red",
        yAxisID: "y",
        pointStyle: data.y.map((value) => (value === 0 ? "crossRot" : "circle")),
        pointRadius: data.y.map((value) => (value === 0 ? 5 : 3)),
        pointBorderColor: data.y.map((value) => (value === 0 ? "red" : "")),
      },
    ],
  };

  const options = {
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

  return <Line options={options} data={datavalue} />;
}
