import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components";
import { bookings, rooms } from "../../data/mockData"; // Import mock data

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
};

const HeaderCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p>You currently have {bookings.length} booking(s).</p>
        </div>
        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => navigate("/make-appointment")}
        >
          + Make Appointment
        </Button>
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
  return (
    <div className="space-y-4">
      <HeaderCard />
      <div className="w-full p-4 flex flex-col space-y-4 bg-red-50 rounded-lg">
        {bookings.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">No bookings found.</p>
          </Card>
        ) : (
          bookings.map((booking: (typeof bookings)[0]) => (
            <BookingCard key={booking.booking_id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};
