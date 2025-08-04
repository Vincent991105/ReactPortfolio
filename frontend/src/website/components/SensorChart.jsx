import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, } from "chart.js";

// 註冊 Chart.js 組件
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function SensorChart({selectChart, openChart}) {
  // 資料設定
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sensor Data",
        data: [30, 50, 40, 60, 70, 50, 90],
        fill: false,
        borderColor: "#4caf50", // 線條顏色
        tension: 0.4, // 曲線平滑度
        pointBackgroundColor: "#4caf50", // 點的顏色
        pointRadius: 5, // 點的大小
      },
    ],
  };

  // 選項設定
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Y 軸刻度間距
        },
      },
    },
  };

  // 組件渲染
  return (
    <div className="SensorChart">
        <div className="ModalContent">
            <div className="title">
                <h2>{selectChart}</h2>
                <button className="close-button" onClick={() => openChart(null)}>×</button>
            </div>
            <Line data={data} options={options} />          
        </div>
    </div>
  );
}

export default SensorChart;
