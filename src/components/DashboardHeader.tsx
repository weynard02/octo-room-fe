import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import formattedDate from "../utils/dateSetting";

type DashboardHeaderProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  totalBookings: number;
};

export function DashboardHeader({
  selectedDate,
  setSelectedDate,
  totalBookings,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  function changeDate(days: number) {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + days);

    setSelectedDate(date.toISOString().split("T")[0]);
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-sm border border-gray-200 p-3 md:p-4 rounded-xl gap-2">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">Hello, Good Morning</p>
        <h2 className="font-semibold">
          You have <span className="text-[#e11d2e]">{totalBookings}</span>{" "}
          booked {totalBookings === 1 ? "room" : "rooms"}
        </h2>
      </div>

      <div className="flex flex-col w-full items-end gap-2">
        <Button
          className="flex w-full md:w-fit items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg  duration-200  cursor-pointer"
          onClick={() => navigate("/make-appointment")}
        >
          <Plus size={16} />
          Add Appoinment
        </Button>
        <div className="flex w-full h-full md:w-fit items-center gap-2">
          <div className="flex flex-row min-h-full w-full h-full md:w-46 items-center gap-2 border border-gray-200 px-4 py-3 rounded-lg text-[12px] md:text-sm shadow-sm justify-between md:justify-start">
            <Calendar size={16} />
            {formattedDate(selectedDate)}
          </div>

          <Button
            onClick={() => changeDate(-1)}
            className="flex cursor-pointer px-1 md:px-3 py-1 md:py-2.5 rounded-lg border border-gray-200 duration-200 bg-white hover:bg-gray-100"
          >
            <ChevronLeft className="text-gray-800 md:size-6" size={20} />
          </Button>

          <Button
            onClick={() => changeDate(1)}
            className="flex cursor-pointer px-1 md:px-3 py-1 md:py-2.5 rounded-lg border border-gray-200 duration-200 bg-white hover:bg-gray-100"
          >
            <ChevronRight className="text-gray-800 md:size-6" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
