import { Clock } from "lucide-react";
import { timeSlots } from "../data/mockData";
import type { RoomWithBookings } from "../page/dashboard/DashboardPage";

type BookingGridProps = {
  selectedDate: string;
  roomsWithBookings: RoomWithBookings[];
};

export function BookingGrid({ roomsWithBookings }: BookingGridProps) {
  const getHourIndex = (time: string) =>
    timeSlots.findIndex((t) => t.startsWith(time.split(":")[0]));

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `80px repeat(${roomsWithBookings.length}, minmax(160px, 1fr))`,
    // +1 for header row
    gridTemplateRows: `40px repeat(${timeSlots.length}, 40px)`,
  };

  function formatHourString(isoString: string) {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5);
  }

  // Helper to get local hour from ISO string
  const getLocalHour = (isoString: string) => new Date(isoString).getHours();

  return (
    <div className="mt-6 bg-white border border-gray-200 shadow-sm p-4 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <div
          style={gridStyle}
          className="min-w-max border-t border-l border-gray-200"
        >
          {/* HEADER ROW */}
          <div
            style={{ gridColumn: 1, gridRow: 1 }}
            className="sticky left-0 z-30 bg-gray-50 flex border-r border-b border-gray-200 items-center justify-center font-bold"
          >
            <Clock size={20} className="text-gray-500" />
          </div>

          {roomsWithBookings.map((room, roomIdx) => (
            <div
              key={room.room_id}
              style={{ gridColumn: roomIdx + 2, gridRow: 1 }}
              className="sticky top-0 z-20 bg-gray-50 text-center border-r border-b border-gray-200 p-2 text-sm font-semibold text-gray-700"
            >
              {room.name}
            </div>
          ))}

          {/* TIME COLUMN */}
          {timeSlots.map((time, timeIdx) => (
            <div
              key={`time-${time}`}
              style={{ gridColumn: 1, gridRow: timeIdx + 2 }}
              className="sticky left-0 z-10 bg-gray-50 flex border-r border-b border-gray-200 items-center justify-center text-xs font-medium text-gray-500"
            >
              {time}
            </div>
          ))}

          {/* EMPTY GRID CELLS */}
          {timeSlots.map((_, timeIdx) =>
            roomsWithBookings.map((room, roomIdx) => (
              <div
                key={`empty-${room.room_id}-${timeIdx}`}
                style={{ gridColumn: roomIdx + 2, gridRow: timeIdx + 2 }}
                className="border-r border-b border-gray-100"
              />
            ))
          )}

          {/* BOOKING SLOTS (Overlaying the grid) */}
          {roomsWithBookings.map((room, roomIdx) =>
            room.bookings.map((booking, bIdx) => {
              const startHour = getLocalHour(booking.start_hour);
              const endHour = getLocalHour(booking.end_hour);

              // Find matching time slot index
              const startTimeStr = `${startHour
                .toString()
                .padStart(2, "0")}:00`;
              const startIdx = getHourIndex(startTimeStr);

              if (startIdx === -1) return null;

              const duration = endHour - startHour;
              if (duration <= 0) return null;

              return (
                <div
                  key={`booking-${room.room_id}-${bIdx}`}
                  style={{
                    gridColumn: roomIdx + 2,
                    gridRow: `${startIdx + 2} / span ${duration}`,
                    zIndex: 5,
                  }}
                  className="p-1"
                >
                  <div className="h-full bg-red-50 border-l-4 border-red-500 px-2 py-1 rounded-md shadow-sm flex flex-col justify-center overflow-hidden">
                    <p className="font-bold text-red-700 text-[10px] truncate">
                      Booked
                    </p>
                    <p className="text-[9px] text-red-600 whitespace-nowrap">
                      {formatHourString(booking.start_hour)} -{" "}
                      {formatHourString(booking.end_hour)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
