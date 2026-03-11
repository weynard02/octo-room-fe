import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components";
import { bookings, rooms } from "../../data/mockData";
import { DateNavigator } from "../../components/DateNavigator";
import { formatDateKey } from "../../helpers/dataFormatter";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
};

interface HeaderCardProps {
  bookingCount: number;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const HeaderCard: React.FC<HeaderCardProps> = ({
  bookingCount,
  selectedDate,
  onDateChange,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p>You currently have {bookingCount} booking(s).</p>
        </div>
        <div className="flex items-center gap-3">
          <DateNavigator date={selectedDate} onChange={onDateChange} />
          <Button
            variant="primary"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => navigate("/make-appointment")}
          >
            + Make Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

const BookingCard: React.FC<{ booking: (typeof bookings)[0] }> = ({
  booking,
}) => {
  const room = rooms.find((r) => r.room_id === booking.room_id);

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="font-semibold">Room: {room?.name ?? "Unknown Room"}</p>
          <p className="text-gray-500 text-sm">Date: {booking.date}</p>
          <p className="text-gray-500 text-sm">ID: {booking.booking_id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
            statusStyles[booking.status]
          }`}
        >
          {booking.status}
        </span>
      </div>
    </Card>
  );
};

export const MyBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const filteredBookings = bookings.filter(
    (b) => b.date === formatDateKey(selectedDate)
  );

  return (
    <div className="space-y-4">
      <HeaderCard
        bookingCount={filteredBookings.length}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
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
