import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, DashboardHeader } from "../../components";
import { bookings, rooms } from "../../data/mockData";
import { formatDateKey } from "../../helpers/dataFormatter";

export const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
};

const BookingCard: React.FC<{ booking: (typeof bookings)[0] }> = ({
  booking,
}) => {
  const navigate = useNavigate();
  const room = rooms.find((r) => r.room_id === booking.room_id);

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="font-semibold">Room: {room?.name ?? "Unknown Room"}</p>
          <p className="text-gray-500 text-sm">Date: {booking.date}</p>
          <p className="text-gray-500 text-sm">ID: {booking.booking_id}</p>
        </div>
        <div className="space-y-1 flex flex-col items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusStyles[booking.status]
            }`}
          >
            {booking.status}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() =>
              navigate(`/my-booking/${booking.booking_id}`, {
                state: { booking },
              })
            }
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-red-600 border-red-400 hover:bg-red-50"
            onClick={() => alert(`Cancelling booking ${booking.booking_id}`)}
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const MyBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateKey(new Date())
  );

  const filteredBookings = bookings.filter((b) => b.date === selectedDate);

  return (
    <div className="space-y-4">
      <DashboardHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="w-full p-4 flex flex-col space-y-4 bg-gray-100 rounded-lg">
        {filteredBookings.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">No bookings found.</p>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.booking_id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};
