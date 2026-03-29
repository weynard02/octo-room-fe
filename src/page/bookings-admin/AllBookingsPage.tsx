import { useEffect, useState, useMemo } from "react";
import {
  initialModalAlertState,
  type ModalAlertState,
} from "../../types/ModalState";
import type { Booking } from "../../services/bookingService";
import bookingService from "../../services/bookingService";
import authService from "../../services/authService";
import roomService, { type Room } from "../../services/roomService";
import { BookingCard } from "../../components/BookingCard"; // adjust import path
import { Button, ModalAlert } from "../../components";
import { useNavigate } from "react-router-dom";

export const AllBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  const [filterRoomName, setFilterRoomName] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const isAdmin = !!authService.getUser()?.isAdmin;

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

  const fetchRooms = async () => {
    try {
      const response = await roomService.listRooms();
      setRooms(response.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/", { replace: true });
      return;
    }
    fetchAllBookings();
    fetchRooms();
  }, [isAdmin, navigate]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      showAlert("Success", "Booking cancelled successfully.");
      setAllBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      showAlert("Error", "Failed to cancel booking. Please try again.");
    }
  };

  const handleCancelRequest = (booking: Booking) => {
    showConfirm(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      "Cancel Booking",
      () => handleCancelBooking(booking.booking_id)
    );
  };

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    allBookings.forEach((b) => {
      if (b.date) years.add(new Date(b.date).getFullYear().toString());
    });
    return Array.from(years).sort();
  }, [allBookings]);

  const filteredBookings = useMemo(() => {
    return allBookings.filter((b) => {
      const roomName = typeof b.room === "string" ? b.room : b.room?.name ?? "";

      if (filterRoomName && roomName !== filterRoomName) return false;

      if (filterMonth || filterYear) {
        if (!b.date) return false;
        const date = new Date(b.date);
        if (filterMonth && date.getMonth() + 1 !== Number(filterMonth))
          return false;
        if (filterYear && date.getFullYear() !== Number(filterYear))
          return false;
      }

      return true;
    });
  }, [allBookings, filterRoomName, filterMonth, filterYear]);

  const handleResetFilters = () => {
    setFilterRoomName("");
    setFilterMonth("");
    setFilterYear("");
  };

  const hasActiveFilters = filterRoomName || filterMonth || filterYear;

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
      <div className="flex flex-wrap gap-2 items-end">
        <select
          className="border rounded px-2 py-1.5 text-sm"
          value={filterRoomName}
          onChange={(e) => setFilterRoomName(e.target.value)}
        >
          <option value="">All Rooms</option>
          {rooms.map((r) => (
            <option key={r.room_id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1.5 text-sm"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1.5 text-sm"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            className="text-sm text-gray-500 underline"
            onClick={handleResetFilters}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Results summary */}
      <p className="text-sm text-gray-500">
        {filteredBookings.length} booking(s) found
      </p>

      {/* States */}
      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Booking Cards */}
      {!loading && !error && (
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No bookings match the selected filters.
            </p>
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
