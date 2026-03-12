import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import formattedDate from "../utils/dateSetting";

type DashboardHeaderProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export function DashboardHeader({
  selectedDate,
  setSelectedDate,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  function changeDate(days: number) {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + days);

    setSelectedDate(date.toISOString().split("T")[0]);
  }

  return (
    <div className="flex justify-between items-center bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
      <div>
        <p className="text-sm text-gray-500">Hello, Good Morning</p>
        <h2 className="font-semibold">
          You've have <span className="text-[#e11d2e]">0</span> booked room
        </h2>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg  duration-200  cursor-pointer"
          onClick={() => navigate("/make-appointment")}
        >
          <Plus size={16} />
          Add Appoinment
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border border-gray-200 px-4 py-3 rounded-lg text-sm shadow-sm">
            <Calendar size={16} />
            {formattedDate(selectedDate)}
          </div>

          <Button
            onClick={() => changeDate(-1)}
            className="flex cursor-pointer px-2 py-1 rounded-lg border border-gray-200 duration-200 bg-white hover:bg-gray-100"
          >
            <ChevronLeft className="text-gray-800" />
          </Button>

          <Button
            onClick={() => changeDate(1)}
            className="flex cursor-pointer px-2 py-1 rounded-lg border border-gray-200 duration-200 bg-white hover:bg-gray-100"
          >
            <ChevronRight className="text-gray-800" />
          </Button>
        </div>
      </div>
    </div>
  );
}
