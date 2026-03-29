import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import formattedDate from "../utils/dateSetting";

type AdminHeaderProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  totalBookings: number;
};

export function AdminHeader({
  selectedDate,
  setSelectedDate,
  totalBookings,
}: AdminHeaderProps) {
  const navigate = useNavigate();
  function changeDate(days: number) {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + days);

    setSelectedDate(date.toISOString().split("T")[0]);
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-linear-to-r from-red-500 to-black  shadow-sm border border-red-200 p-3 md:p-4 rounded-xl gap-2">
      <div className="flex flex-col">
        <p className="text-md text-white font-bold">Admin Control Panel</p>
        <h2 className="font-semibold text-white">
          You have {totalBookings} booked{" "}
          {totalBookings === 1 ? "room" : "rooms"}
        </h2>
        <h4 className="text-sm text-white">
          You can manage all bookings and rooms
        </h4>
      </div>

      <div className="flex flex-col w-full items-end gap-2">
        <div className="flex space-x-2">
          <Button
            className="flex w-full md:w-fit items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg  duration-200  cursor-pointer"
            onClick={() => navigate("/make-appointment")}
          >
            <Plus size={16} />
            Add Appoinment
          </Button>
          <Button
            className="flex w-full md:w-fit items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg  duration-200  cursor-pointer"
            onClick={() => navigate("/all-bookings")}
          >
            View All Bookings
          </Button>
        </div>

        <div className="flex w-full h-full md:w-fit items-center gap-2">
          <div className="flex flex-row min-h-full w-full h-full md:w-46 items-center gap-2 border bg-white border-gray-200 px-4 py-3 rounded-lg text-[12px] md:text-sm shadow-sm justify-between md:justify-start">
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
