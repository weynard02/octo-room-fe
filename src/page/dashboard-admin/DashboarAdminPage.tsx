import ChartAdmin from "../../components/ChartAdmin";
import { Button } from "../../components";
import authService from "../../services/authService";

import bgCount from "../../assets/background/Bg-Hero-Count.png";
import bgDownload from "../../assets/background/Bg-Download.png";

export default function DashboarAdminPage() {
  const dataDummyDashboard = [
    { title: "Total", total: 644 },
    { title: "Average", total: 108 },
    { title: "Completed", total: 602 },
    { title: "Cancel", total: 42 },
  ];

  const user = authService.getUser();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xl text-gray-400">{`Hello, ${user?.name}!`} </p>
        <h1 className="text-3xl text-gray-700 font-semibold">
          Welcome to Dashboard
        </h1>
      </div>

      <div className="flex gap-4">
        {dataDummyDashboard.map((data) => (
          <div
            key={data.title}
            className="w-full p-4 flex flex-col h-28 justify-between rounded-2xl bg-white bg-no-repeat bg-center"
            style={{
              backgroundImage: data.title === "Total" ? `url(${bgCount})` : "",
            }}
          >
            <h3
              className="text-xl text-gray-600"
              style={{
                color: data.title === "Total" ? "white" : "",
                opacity: data.title === "Total" ? "60%" : "100%",
              }}
            >
              {data.title}
            </h3>

            <h1
              className="text-4xl font-semibold text-red-700"
              style={{
                color: data.title === "Total" ? "white" : "",
              }}
            >
              {data.total}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <ChartAdmin />
        <div
          className="flex flex-col items-center gap-8 justify-center rounded-3xl bg-no-repeat bg-center bg-cover w-1/3"
          style={{ backgroundImage: `url(${bgDownload})` }}
        >
          <h1 className="font-medium text-2xl w-3/4 text-center text-white">
            Klik Tombol Untuk Unduh Report pengguna ruang meeting
          </h1>

          <Button size="lg" variant="ghost">
            Unduh Report
          </Button>
        </div>
      </div>
    </div>
  );
}
