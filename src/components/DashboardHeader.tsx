import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";

type DashboardHeaderProps = {
    selectedDate: string
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export function DashboardHeader({ selectedDate, setSelectedDate }: DashboardHeaderProps) {
    function changeDate(days: number) {
        const date = new Date(selectedDate);

        date.setDate(date.getDate() + days);

        setSelectedDate(date.toISOString().split("T")[0]);
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    return (
        <div className="flex justify-between  items-center bg-white shadow-sm border border-gray-200 p-4 rounded-xl">

            <div>
                <p className="text-sm text-gray-500">Hello, Good Morning</p>
                <h2 className="font-semibold">
                    You've have <span className="text-[#e11d2e]">0</span> booked  room
                </h2>
            </div>

            <div className="flex flex-col items-end gap-1">
                <button className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm px-4 py-2 rounded-lg  duration-200 hover:bg-[#c51625] cursor-pointer">
                    <Plus size={16} />
                    Add Appoinment
                </button>
                <div
                    className="flex items-center gap-2"
                >
                    <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-sm">
                        <Calendar size={16} />
                        {formatDate(selectedDate)}
                    </div>

                    <button
                        onClick={() => changeDate(-1)}
                        className="cursor-pointer px-2 py-1 rounded-lg border border-gray-200 duration-200 hover:bg-gray-100"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={() => changeDate(1)}
                        className="cursor-pointer px-2 py-1 rounded-lg border border-gray-200 duration-200 hover:bg-gray-100"
                    >
                        <ChevronRight />
                    </button>
                </div>


            </div>
        </div>
    )
}