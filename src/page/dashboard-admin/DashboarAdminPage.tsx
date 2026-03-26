import ChartAdmin from "../../components/ChartAdmin";
import { Button } from "../../components";
import authService from "../../services/authService";

import bgCount from "../../assets/background/Bg-Hero-Count.png";
import bgDownload from "../../assets/background/Bg-Download.png";
import exportService from "../../services/exportService";
import { Download, File, FileSignature, FileText } from "lucide-react";

export default function DashboarAdminPage() {
  const dataDummyDashboard = [
    { title: "Total", total: 644, notes: "Total dari semua Request" },
    { title: "Average", total: 108, notes: "Rata-rata Request Bulan ini" },
    { title: "Completed", total: 602, notes: "Total Request Bulan ini" },
    { title: "Cancel", total: 42, notes: "Total Pembatal Request Bulan ini" },
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
            className="w-full p-4 flex flex-col h-fit justify-center rounded-2xl bg-white bg-no-repeat bg-center shadow-lg shadow-[#f0f0f0] gap-4"
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
            <div>
              <h1
                className="text-4xl font-semibold text-red-700"
                style={{
                  color: data.title === "Total" ? "white" : "",
                }}
              >
                {data.total}
              </h1>
              <p
                className="font-light text-xs text-gray-800 opacity-50"
                style={{ color: data.title === "Total" ? "white" : "" }}
              >
                {data.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <ChartAdmin />
        <div
          className="flex flex-col items-center gap-8 justify-center rounded-3xl bg-no-repeat bg-center bg-cover w-1/3 shadow-lg shadow-[#f0f0f0]"
          style={{ backgroundImage: `url(${bgDownload})` }}
        >
          <h1 className="font-medium text-2xl w-3/4 text-center text-white">
            Pilih atau Ketik Tombol Unduh file report seseuai dengan kebutuhan
          </h1>
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              variant="primary"
              onClick={exportService.pdf}
              className="gap-1"
            >
              <FileText size={16} />
              Report PDF
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={exportService.excel}
              className="gap-1"
            >
              <FileSignature size={16} />
              Report Xls
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
