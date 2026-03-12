import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "../../../components";
import { bookings, rooms } from "../../../data/mockData";
import imageHyspace from "../../../assets/images/graha-cimb.png";
import { statusStyles } from "../MyBookingPage";

export const MyBookingDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking from state or find it in mockData
  const booking =
    location.state?.booking || bookings.find((b) => b.booking_id === id);

  if (!booking) {
    return (
      <Card title="Booking Not Found">
        <div className="space-y-4">
          <p>The booking you are looking for does not exist.</p>
          <Button onClick={() => navigate("/my-booking")}>
            Back to My Bookings
          </Button>
        </div>
      </Card>
    );
  }

  const room = rooms.find((r) => r.room_id === booking.room_id);

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => navigate("/my-booking")}>
        &larr; Back
      </Button>
      <Card className="space-y-4" title="Booking Details">
        <img
          src={imageHyspace}
          alt="Room Image"
          className="w-full object-cover rounded-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Booking ID:</span>{" "}
              {booking.booking_id}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Room Name:</span>{" "}
              {room?.name || "Unknown Room"}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Floor:</span>{" "}
              {room?.floor || "N/A"}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Date:</span>{" "}
              {booking.date}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Status:</span>{" "}
              <span
                className={`capitalize px-2 py-1 bg-blue-100 rounded text-sm ${
                  statusStyles[booking.status]
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="danger"
              onClick={() => alert(`Cancelling booking ${booking.booking_id}`)}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
