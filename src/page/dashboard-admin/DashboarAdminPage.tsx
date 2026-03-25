import ChartAdmin from "../../components/ChartAdmin";
import { Button } from "../../components";

export default function DashboarAdminPage() {
  const dataDummyDashboard = [
    { title: "Total", total: 644 },
    { title: "Average", total: 108 },
    { title: "Completed", total: 602 },
    { title: "Cancel", total: 42 },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Hello, </p>
        <h1 className="text-3xl">Welcome to Dashboard!</h1>
      </div>

      <div className="flex gap-4">
        {dataDummyDashboard.map((data) => (
          <div
            key={data.title}
            className="w-full p-4 flex flex-col h-28 justify-between rounded-2xl bg-white"
          >
            <h3 className="text-md text-gray-400">{data.title}</h3>
            <h1 className="text-4xl text-green-700 font-semibold">
              {data.total}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <ChartAdmin />
        <div className="flex flex-col items-center gap-4 justify-center bg-white rounded-3xl">
          <h1 className="font-medium text-2xl w-3/4 text-center">
            Unduh Report pengguna ruang meeting
          </h1>
          <Button size="lg">Unduh Report</Button>
        </div>
      </div>
    </div>
  );
}
