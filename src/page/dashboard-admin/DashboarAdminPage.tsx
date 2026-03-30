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
import { useNavigate } from "react-router-dom";
import SkeletonAdminDashboard from "../../components/Skeleton";

export default function DashboarAdminPage() {
  const [dataBooking, setDataBooking] = useState<Booking[]>([]);
  const navigate = useNavigate();
  const user = authService.getUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setIsLoading(true);
        if (!user?.isAdmin) {
          navigate("/", { replace: true });
          return;
        }
        const res = await bookingService.getAllBookings();
        const resDataBooking = res.data;
        setDataBooking(resDataBooking);
      } catch (error) {
        console.log("error fetching data admin dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingData();
    // console.log("ini data bookingnya: ", dataBooking);
  }, [navigate, user?.isAdmin]);

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
        <p className="text-xl text-gray-400">
          {`Hello, ${user?.name || `Admin!`} `}
        </p>
        <h1 className="text-3xl text-gray-700 font-semibold">
          Welcome to Dashboard
        </h1>
      </div>

      {isLoading ? (
        <SkeletonAdminDashboard />
      ) : (
        <div className="flex flex-col gap-4 ease-in-out">
          <div className="flex gap-4">
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
                className=" w-full h-1/2 flex flex-col p-4 gap-2 items-center justify-center rounded-3xl bg-no-repeat bg-center bg-cover shadow-lg shadow-[#f0f0f0]"
                style={{ backgroundImage: `url(${bgDownload})` }}
              >
                <h1 className="flex text-white text-lg font-medium text-center">
                  Download File Reports of Requested Room
                </h1>
                <div className="flex flex-row w-full gap-2">
                  <Button
                    size="md"
                    variant="primary"
                    onClick={exportService.pdf}
                    className="gap-1 w-full"
                  >
                    <FileText size={16} />
                    PDF
                  </Button>
                  <Button
                    size="md"
                    variant="ghost"
                    onClick={exportService.excel}
                    className="gap-1 w-full"
                  >
                    <FileSignature size={16} />
                    Xls
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
