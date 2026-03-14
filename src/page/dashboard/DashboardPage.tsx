import { useEffect, useState } from "react";
import { BookingGrid, DashboardHeader } from "../../components";
import roomService, { type Room, type BookedSlot } from "../../services/roomService";
import { formatDateKey } from "../../helpers/dataFormatter";

export interface RoomWithBookings extends Room {
  bookings: BookedSlot[];
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
  const [roomsWithBookings, setRoomsWithBookings] = useState<RoomWithBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await roomService.listRooms();
        const rooms = response.data;

        // Fetch booked slots for each room in parallel
        const roomsWithData = await Promise.all(
          rooms.map(async (room) => {
            try {
              const bookedResponse = await roomService.getBookedSlots(
                room.room_id,
                selectedDate
              );
              return {
                ...room,
                bookings: bookedResponse.data.booked_slots.filter(
                  (slot) => slot.status?.toLowerCase() !== "cancelled"
                ),
              };
            } catch (err) {
              console.error(
                `Failed to fetch bookings for room ${room.room_id}:`,
                err
              );
              return {
                ...room,
                bookings: [],
              };
            }
          })
        );
        
        setRoomsWithBookings(roomsWithData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedDate]);

  return (
    <div className="p-6">
      <DashboardHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-6">
          {error}
        </div>
      ) : (
        <BookingGrid
          selectedDate={selectedDate}
          roomsWithBookings={roomsWithBookings}
        />
      )}
    </div>
  );
}