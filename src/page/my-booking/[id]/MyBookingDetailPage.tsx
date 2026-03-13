import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "../../../components";
import imageHyspace from "../../../assets/images/graha-cimb.png";
import { statusStyles } from "../status";
import bookingService, { type Booking } from "../../../services/bookingService";

export const MyBookingDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookingDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBookingDetail(id || "");
      setBooking(response.data);
    } catch (error) {
      console.error("Failed to fetch booking detail:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBookingDetail();
    }
  }, [id, fetchBookingDetail]);

  const handleCancel = async () => {
    if (!booking) return;
    
    if (window.confirm(`Are you sure you want to cancel booking ${booking.booking_id}?`)) {
      setCancelling(true);
      try {
        await bookingService.cancelBooking(booking.booking_id);
        alert("Booking cancelled successfully.");
        await fetchBookingDetail(); // Refresh data
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        alert("Failed to cancel booking. Please try again.");
      } finally {
        setCancelling(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-4">
        <Card title="Booking Not Found">
          <div className="space-y-4">
            <p>The booking you are looking for does not exist.</p>
            <Button onClick={() => navigate("/my-booking")}>
              Back to My Bookings
          </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <Button variant="outline" onClick={() => navigate("/my-booking")}>
        &larr; Back
      </Button>
      <Card className="space-y-4" title="Booking Details">
        <img
          src={imageHyspace}
          alt="Room Image"
          className="w-full h-64 object-cover rounded-lg"
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
                className={`capitalize px-2 py-1 rounded text-sm font-medium ${
                  statusStyles[booking.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>
        </div>
        
        {booking.status !== "cancelled" && booking.status !== "completed" && (
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button
              variant="outline"
              className="text-red-600 border-red-400 hover:bg-red-50"
              disabled={cancelling}
              onClick={handleCancel}
            >
              {cancelling ? "Cancelling..." : "Cancel Booking"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
