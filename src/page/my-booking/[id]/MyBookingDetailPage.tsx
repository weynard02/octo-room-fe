import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, ModalAlert } from "../../../components";
import imageHyspace from "../../../assets/images/graha-cimb.png";
import { statusStyles } from "../status";
import bookingService, { type Booking } from "../../../services/bookingService";
import emptyBoxIcon from "../../../assets/icons/empty-box.png";
import {
  type ModalAlertState,
  initialModalAlertState,
} from "../../../types/ModalState";
import formattedDate from "../../../utils/dateSetting";
import { getEffectiveStatus } from "../../../utils/bookingUtils";

export const MyBookingDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  const effectiveStatus = booking ? getEffectiveStatus(booking) : "";

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

  const handleCancelAction = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      await bookingService.cancelBooking(booking.booking_id);
      showAlert("Success", "Booking cancelled successfully.");
      await fetchBookingDetail(); // Refresh data
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      showAlert("Error", "Failed to cancel booking. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const handleCancel = () => {
    if (!booking) return;
    showConfirm(
      "Cancel Booking",
      `Are you sure you want to cancel this booking?`,
      "Cancel Booking",
      handleCancelAction
    );
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

  return (
    <div className="space-y-4 p-4">
      <Button variant="outline" onClick={() => navigate("/my-booking")}>
        &larr; Back
      </Button>
      <Card className="space-y-4" title="Booking Details">
        <img
          src={imageHyspace}
          alt="Room Image"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Booking ID:</span>{" "}
              {booking.booking_id}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Room Name:</span>{" "}
              {typeof booking.room === "string"
                ? booking.room
                : booking.room?.name || "Unknown Room"}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Status:</span>{" "}
              <span
                className={`capitalize px-2 py-1 rounded text-sm font-medium ${
                  statusStyles[effectiveStatus] || "bg-gray-100 text-gray-800"
                }`}
              >
                {effectiveStatus}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-600">Date:</span>{" "}
              {formattedDate(booking.date)}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Time:</span>{" "}
              {booking.slots?.[0]?.start_hour || "N/A"} -{" "}
              {booking.slots?.[0]?.end_hour || "N/A"}
            </p>
          </div>
        </div>

        {effectiveStatus !== "cancelled" && effectiveStatus !== "completed" && (
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
