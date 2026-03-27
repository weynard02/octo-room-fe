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
import type { Booking } from "../services/bookingService";

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

interface ChartBookingType {
  booking: Booking[];
}

export default function ChartAdmin({ booking }: ChartBookingType) {
  const monthlyData = new Array(12).fill(0);
  const bookedPerMonth = new Array(12).fill(0);
  const cancelPerMonth = new Array(12).fill(0);

  booking.forEach((item) => {
    const month = new Date(item.date).getMonth();

    monthlyData[month] += 1;

    if (item.status === "booked") {
      bookedPerMonth[month] += 1;
    } else if (item.status === "cancelled") {
      cancelPerMonth[month] += 1;
    }
  });

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
        label: "Total",
        data: monthlyData,
        backgroundColor: "rgba(255, 242, 225, 0.8)",
        borderColor: "rgba(255, 191, 15, 1)",
        borderWidth: 1,
      },
      {
        label: "Success",
        data: bookedPerMonth,
        backgroundColor: "rgba(244, 255, 237, 0.8)",
        borderColor: "rgba(82, 192, 62, 1)",
        borderWidth: 1,
      },
      {
        label: "Canceled",
        data: cancelPerMonth,
        backgroundColor: "rgba(255, 225, 225, 0.8)",
        borderColor: "rgba(185, 22, 22, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full bg-white px-10 py-6 rounded-3xl shadow-lg shadow-[#f0f0f0]">
      <Bar
        data={dataAdmin}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: { boxHeight: 12, boxWidth: 12 },
            },
            title: {
              display: true,
              text: "Request Room Meeting Monthly",
              color: "#800",
              padding: { top: 4, bottom: 12 },
              font: { size: 24 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 50,
            },
          },
        }}
      />
    </div>
  );
}
