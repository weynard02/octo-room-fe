import { useEffect, useState } from "react";
import { Button, Card, DashboardHeader, ModalAlert } from "../../components";
import { formatDateKey } from "../../helpers/dataFormatter";
import bookingService, { type Booking } from "../../services/bookingService";
import {
  type ModalAlertState,
  initialModalAlertState,
} from "../../types/ModalState";
import authService from "../../services/authService";
import { AdminHeader } from "../../components/AdminHeader";
import { BookingCard } from "../../components/BookingCard";
import { SkeletonListBooking } from "../../components/Skeleton";

export const MyBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateKey(new Date()),
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
    onConfirm: () => void,
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

  const fetchAllBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getAllBookings();
      setAllBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch all bookings:", err);
      setError("Failed to load all bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authService.getUser()?.isAdmin) {
      fetchAllBookings();
    } else {
      fetchBookings();
    }
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      showAlert("Success", "Booking cancelled successfully.");
      setAllBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
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
      () => handleCancelBooking(booking.booking_id),
    );
  };

  const filteredBookings = allBookings.filter((b) => b.date === selectedDate);

  const isAdmin =
    authService.getUser()?.isAdmin === true ||
    authService.getUser()?.isAdmin === "true";
  return (
    <div className="space-y-4 p-6">
      {isAdmin ? (
        <>
          <AdminHeader
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            totalBookings={allBookings.length}
          />
        </>
      ) : (
        <DashboardHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          totalBookings={allBookings.length}
        />
      )}
      {loading ? (
        <SkeletonListBooking />
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
                isAdmin={isAdmin}
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
