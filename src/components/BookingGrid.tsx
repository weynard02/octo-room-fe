import { Clock } from "lucide-react";
import { timeSlots } from "../data/mockData";
import React from "react";
import type { RoomWithBookings } from "../page/dashboard/DashboardPage";

type BookingGridProps = {
  selectedDate: string;
  roomsWithBookings: RoomWithBookings[];
};

export function BookingGrid({ roomsWithBookings }: BookingGridProps) {
  const getHour = (time: string) => Number(time.split(":")[0]);

  const gridStyle = {
    gridTemplateColumns: `80px repeat(${roomsWithBookings.length}, minmax(160px,1fr))`,
    gridTemplateRows: `repeat(${timeSlots.length}, 40px)`,
  };

  function getBookingStart(room: RoomWithBookings, hour: number) {
    return room.bookings.find((b) => {
      const startHour = new Date(b.start_hour).getHours();
      return startHour === hour;
    });
  }

  function isCovered(room: RoomWithBookings, hour: number) {
    return room.bookings.find((b) => {
      const start = new Date(b.start_hour).getHours();
      const end = new Date(b.end_hour).getHours();

      return hour > start && hour < end;
    });
  }

  function formatHourString(isoString: string) {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5);
  }

  return (
    <div className="mt-6 bg-white border border-gray-200 shadow-sm p-4 rounded-xl">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div
          className="grid border-b border-t border-gray-200 bg-gray-50"
          style={{ gridTemplateColumns: gridStyle.gridTemplateColumns }}
        >
          <div className="sticky left-0 z-30 bg-white flex border-r border-l border-gray-200 items-center justify-center ">
            <Clock size={22} />
          </div>

          {roomsWithBookings.map((room) => (
            <div
              key={room.id}
              className="sticky top-0 z-20 bg-white text-center border-r border-gray-200 p-2 text-sm font-medium"
            >
              {room.name}
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid border-gray-200" style={gridStyle}>
          {timeSlots.map((time) => {
            const hour = getHour(time);

            return (
              <React.Fragment key={time}>
                {/* TIME COLUMN */}
                <div
                  key={`time-${time}`}
                  className="sticky left-0 z-10 bg-white flex border-l border-r border-b border-gray-200 items-center justify-center text-sm text-gray-500"
                >
                  {time}
                </div>

                {roomsWithBookings.map((room) => {
                  const bookingStart = getBookingStart(room, hour);

                  if (isCovered(room, hour)) return null;

                  if (bookingStart) {
                    const start = new Date(bookingStart.start_hour).getHours();
                    const end = new Date(bookingStart.end_hour).getHours();
                    const duration = end - start;

                    return (
                      <div
                        key={`${room.id}-${time}`}
                        className="flex border-b border-r border-gray-100 p-0.5"
                        style={{
                          gridRow: `span ${duration}`,
                        }}
                      >
                        <div className="bg-red-50 border-l-4 border-red-500 px-2 py-1 rounded-md text-xs flex-auto content-center">
                          <p className="font-medium text-red-700">Booked</p>

                          <p className="text-[10px] text-gray-600">
                            {formatHourString(bookingStart.start_hour)} -{" "}
                            {formatHourString(bookingStart.end_hour)}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`${room.id}-${time}`}
                      className="h-10 border-r border-b border-gray-200 "
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}