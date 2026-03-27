import { Chart as ChartJs, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Booking } from "../services/bookingService";

// Registrasi komponen yang dibutuhkan Chart.js
ChartJs.register(ArcElement, Tooltip, Legend, Title);

interface ChartDoughnutsProps {
  booking: Booking[];
}

export default function ChartDoughnuts({ booking }: ChartDoughnutsProps) {
  const roomCount: Record<string, { name: string; total: number }> = {};

  booking.forEach((data) => {
    const { room_id, name } = data.room;
    if (!roomCount[room_id]) {
      roomCount[room_id] = { name: name, total: 0 };
    }
    roomCount[room_id].total += 1;
  });

  const dataChart = {
    labels: Object.values(roomCount).map((r) => r.name),
    datasets: [
      {
        label: "Total Booking",
        data: Object.values(roomCount).map((r) => r.total),
        backgroundColor: [
          "rgba(185, 22, 22, 0.7)",
          "rgba(255, 191, 15, 0.7)",
          "rgba(82, 192, 62, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 99, 132, 0.7)", // pink
          "rgba(255, 159, 64, 0.7)", // orange
        ],
        borderColor: [
          "rgba(185, 22, 22, 1)",
          "rgba(255, 191, 15, 1)",
          "rgba(82, 192, 62, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)", // pink
          "rgba(255, 159, 64, 1)", // orange
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex w-full h-3/4 bg-white items-center justify-between rounded-3xl shadow-lg shadow-[#f0f0f0]">
      <Doughnut
        data={dataChart}
        options={{
          responsive: true,
          cutout: "60%",
          layout: {
            padding: {
              top: 20,
              bottom: 20,
              right: 10,
              left: 10,
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              align: "center",
              labels: {
                boxHeight: 12,
                boxWidth: 12,
                textAlign: "center",
              },
            },
            tooltip: {
              xAlign: "center",
            },
            title: {
              display: true,
              text: "Booking per Ruangan",
              color: "#800",
              padding: { top: 4, bottom: 12 },
              font: { size: 24 },
              align: "center",
            },
          },
        }}
      />
    </div>
  );
}
