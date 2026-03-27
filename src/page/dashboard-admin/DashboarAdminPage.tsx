import ChartAdmin from "../../components/ChartAdmin";
import { Button } from "../../components";
import authService from "../../services/authService";

import bgDownload from "../../assets/background/Bg-Download.png";
import exportService from "../../services/exportService";
import { FileSignature, FileText } from "lucide-react";
import bookingService, { type Booking } from "../../services/bookingService";
import { useEffect, useState } from "react";
import CounterCard, {
  type CounterCardType,
} from "../../components/CounterCard";
import {
  rateSuccess,
  sumCancled,
  sumSuccess,
} from "../../utils/dashboardSummary";
import ChartDoughnuts from "../../components/DoughnutCharts";

export default function DashboarAdminPage() {
  const [dataBooking, setDataBooking] = useState<Booking[]>([]);

  const user = authService.getUser();

  useEffect(() => {
    const fetchingData = async () => {
      const res = await bookingService.getAllBookings();

      const resDataBooking = res.data;
      setDataBooking(resDataBooking);
    };

    fetchingData();
    console.log("ini data bookingnya: ", dataBooking);
  }, []);

  const dataHeader: CounterCardType[] = [
    {
      title: "Total",
      count: `${dataBooking.length}`,
      notes: "total request room",
      variant: "red",
    },
    {
      title: "Completed",
      count: `${sumSuccess(dataBooking)}`,
      notes: "room has been booked",
      variant: "white",
    },
    {
      title: "Canceled",
      count: `${sumCancled(dataBooking)}`,
      notes: "request has been cancel",
      variant: "white",
    },
    {
      title: "Success Average",
      count: `${rateSuccess(dataBooking) | 0}%`,
      notes: "total request room",
      variant: "white",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xl text-gray-400">{`Hello, ${user?.name}!`} </p>
        <h1 className="text-3xl text-gray-700 font-semibold">
          Welcome to Dashboard
        </h1>
      </div>

      <div className="flex gap-4">
        {/* this is for header helper dashboard admind */}
        {dataHeader.map((data) => (
          <CounterCard
            title={data.title}
            count={data.count}
            notes={data.notes}
            variant={data.variant}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <ChartAdmin booking={dataBooking} />
        <div className="flex flex-col w-1/3 gap-4">
          <ChartDoughnuts booking={dataBooking} />
          <div
            className=" w-full h-2/6 flex flex-col py-4 gap-8 items-center justify-center rounded-3xl bg-no-repeat bg-center bg-cover shadow-lg shadow-[#f0f0f0]"
            style={{ backgroundImage: `url(${bgDownload})` }}
          >
            <h1 className="flex text-white text-2xl font-medium text-center">
              Download Report File Ruangan Meeting
            </h1>
            <div className="flex  w-full px-8 gap-2">
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
    </div>
  );
}
