import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "../../../components";
import imageHyspace from "../../../assets/images/graha-cimb.png";
import { statusStyles } from "../status";
import bookingService, { type Booking } from "../../../services/bookingService";
import emptyBoxIcon from "../../../assets/icons/empty-box.png";

export const MyBookingDetailPage: React.FC = () => {
  const { id } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        // Call with bookingId = "room_1" as requested
        const response = await bookingService.getBookingDetail(id || "room_1");
        setBooking(response.data);
      } catch (error) {
        console.error("Failed to fetch booking detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetail();
  }, []);

  if (loading) {
    return (
      <Card title="Loading...">
        <p>Fetching booking details...</p>
      </Card>
    );
  }

  if (!booking) {
    return (
      <Card className="justify-center items-center p-4 h-screen flex">
        <div className="space-y-8 flex flex-col items-center">
          <img src={emptyBoxIcon} className="w-64 h-64 opacity-60" />
          <p className="text-gray-500 text-xl">
            Oops, seems like your booking is doesnt not exist.
          </p>
          <Button onClick={() => navigate("/my-booking")}>
            Back to My Bookings
          </Button>
        </div>
      </Card>
    );
  }

  // const room = rooms.find((r) => r.room_id === booking.room_id);

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
              {booking.room || "Unknown Room"}
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
                className={`capitalize px-2 py-1 rounded text-sm ${
                  statusStyles[booking.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="danger"
              onClick={() => alert(`Cancelling booking ${booking.id}`)}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
