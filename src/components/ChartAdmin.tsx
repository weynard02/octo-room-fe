import {
  Chart as ChartJs,
  CategoryScale,
  BarController,
  BarElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  BarController,
  BarElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  plugins,
);

export default function ChartAdmin() {
  const dataAdmin = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "R. Regular",
        data: [144, 182, 130, 114, 88, 91, 105, 120, 135, 150, 170, 210],
        backgroundColor: "rgba(255, 225, 225, 1)",
        borderColor: "rgba(185, 22, 22, 0.8)",
        borderWidth: 1,
      },
      {
        label: "R. Medium",
        data: [100, 110, 125, 130, 140, 155, 170, 165, 160, 175, 190, 230],
        backgroundColor: "rgba(255, 242, 225, 1)",
        borderColor: "rgba(255, 191, 15, 1)",
        borderWidth: 1,
      },
      {
        label: "R. Large",
        data: [80, 95, 105, 110, 120, 130, 150, 180, 190, 200, 220, 250],
        backgroundColor: "rgba(244, 255, 237, 1)",
        borderColor: "rgba(82, 192, 62, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full bg-white px-10 py-6 rounded-3xl shadow-lg shadow-[#f0f0f0]">
      <Bar
        data={dataAdmin}
        options={{
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Total Request Meeting Room",
              color: "#212121",
              padding: { top: 4, bottom: 12 },
              font: { size: 24 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 300,
            },
          },
        }}
      />
    </div>
  );
}
