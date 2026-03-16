import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, DashboardHeader, ModalAlert } from "../../components";
import { formatDateKey } from "../../helpers/dataFormatter";
import { statusStyles } from "./status";
import bookingService, { type Booking } from "../../services/bookingService";
import {
  type ModalAlertState,
  initialModalAlertState,
} from "../../types/ModalState";

const BookingCard: React.FC<{
  booking: Booking;
  onCancelRequest: (booking: Booking) => void;
}> = ({ booking, onCancelRequest }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="font-semibold">
            Room:{" "}
            {typeof booking.room === "string"
              ? booking.room
              : booking.room?.name || "Unknown"}
          </p>
          <p className="text-gray-500 text-sm">Date: {booking.date}</p>
        </div>
        <div className="space-y-1 flex flex-col items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusStyles[booking.status] || "bg-gray-100 text-gray-800"
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
          {booking.status !== "cancelled" && booking.status !== "completed" && (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-600 border-red-400 hover:bg-red-50"
              onClick={() => onCancelRequest(booking)}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export const MyBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateKey(new Date())
  );
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  const showAlert = (title: string, message: string) => {
    setModal({
      ...initialModalAlertState,
      show: true,
      title,
      message,
      onClose: () => setModal(initialModalAlertState),
    });
  };

  const showConfirm = (
    title: string,
    message: string,
    confirmLabel: string,
    onConfirm: () => void
  ) => {
    setModal({
      show: true,
      title,
      message,
      confirmLabel,
      onConfirm,
      onClose: () => setModal(initialModalAlertState),
    });
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getMyBookings();
      setAllBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Failed to load your bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      showAlert("Success", "Booking cancelled successfully.");
      await fetchBookings();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      showAlert("Error", "Failed to cancel booking. Please try again.");
    }
  };

  const handleCancelRequest = (booking: Booking) => {
    showConfirm(
      "Cancel Booking",
      `Are you sure you want to cancel this booking?`,
      "Cancel Booking",
      () => handleCancelBooking(booking.booking_id)
    );
  };

  const filteredBookings = allBookings.filter((b) => b.date === selectedDate);

  return (
    <div className="space-y-4 p-4">
      <DashboardHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        totalBookings={allBookings.length}
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <Card className="p-8 text-center text-red-600">
          <p>{error}</p>
          <Button variant="outline" className="mt-4" onClick={fetchBookings}>
            Retry
          </Button>
        </Card>
      ) : (
        <div className="w-full p-4 flex flex-col space-y-4 bg-gray-100 rounded-lg">
          {filteredBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No bookings found for this date.</p>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.booking_id}
                booking={booking}
                onCancelRequest={handleCancelRequest}
              />
            ))
          )}
        </div>
      )}

      {modal.show && (
        <ModalAlert
          title={modal.title}
          message={modal.message}
          confirmLabel={modal.confirmLabel}
          onConfirm={modal.onConfirm}
          onClose={modal.onClose || (() => setModal(initialModalAlertState))}
        />
      )}
    </div>
  );
};
