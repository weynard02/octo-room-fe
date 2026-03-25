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
  const dataChart = {
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
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Biru
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "R. Medium",
        data: [100, 110, 125, 130, 140, 155, 170, 165, 160, 175, 190, 230],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Hijau Toska
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "R. Large",
        data: [80, 95, 105, 110, 120, 130, 150, 180, 190, 200, 220, 250],
        backgroundColor: "rgba(255, 159, 64, 0.6)", // Oranye
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-fit bg-white px-10 py-6 rounded-3xl">
      <Bar
        data={dataChart}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Total Request Meeting Room",
              color: "#212121",
              font: { size: 24 },
            },
          },
        }}
      />
    </div>
  );
}
