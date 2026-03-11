import { Clock } from "lucide-react";
import { rooms, timeSlots } from "../data/mockData";
import { getMergedBookings } from "../utils/bookingUtils";
import React from "react";

type BookingGridProps = {
    selectedDate: string
}

export function BookingGrid({ selectedDate }: BookingGridProps) {

    const bookings = getMergedBookings(selectedDate);

    const getHour = (time: string) => Number(time.split(":")[0]);

    const gridStyle = {
        gridTemplateColumns: `80px repeat(${rooms.length}, minmax(160px,1fr))`,
        gridTemplateRows: `repeat(${timeSlots.length}, 40px)`
    };

    function getBookingStart(roomId: string, hour: number) {
        return bookings.find(
            (b) =>
                b.room_id === roomId &&
                b.start.getHours() === hour
        );
    }

    function isCovered(roomId: string, hour: number) {
        return bookings.find((b) => {
            const start = b.start.getHours();
            const end = b.end.getHours();

            return (
                b.room_id === roomId &&
                hour > start &&
                hour < end
            );
        });
    }

    function formatHour(date: Date) {
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
                    <div
                        className="sticky left-0 z-30 bg-white flex border-r border-l border-gray-200 items-center justify-center "
                    >
                        <Clock size={22} />
                    </div>

                    {rooms.map((room) => (
                        <div
                            key={room.room_id}
                            className="sticky top-0 z-20 bg-white text-center border-r border-gray-200 p-2 text-sm font-medium"
                        >
                            {room.name}
                        </div>
                    ))}
                </div>

                {/* MAIN GRID */}
                <div
                    className="grid  border-gray-200"
                    style={gridStyle}
                >

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

                                {rooms.map((room) => {

                                    const bookingStart = getBookingStart(room.room_id, hour);

                                    if (isCovered(room.room_id, hour)) return null;

                                    if (bookingStart) {
                                        return (
                                            <div
                                                key={`${room.room_id}-${time}`}
                                                className="flex border-b border-r border-gray-100 p-0.5"
                                                style={{
                                                    gridRow: `span ${bookingStart.duration}`
                                                }}
                                            >
                                                <div className="bg-red-50 border-l-4 border-red-500 px-2 py-1 rounded-md text-xs flex-auto content-center">
                                                    <p className="font-medium">
                                                        {bookingStart.customer_name}
                                                    </p>

                                                    <p className="text-[10px] text-gray-600">
                                                        {formatHour(bookingStart.start)} - {formatHour(bookingStart.end)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={`${room.room_id}-${time}`}
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