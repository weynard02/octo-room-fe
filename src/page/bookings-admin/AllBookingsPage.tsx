import { useEffect, useState } from "react";
import {
  initialModalAlertState,
  type ModalAlertState,
} from "../../types/ModalState";
import type { Booking } from "../../services/bookingService";
import bookingService from "../../services/bookingService";
import authService from "../../services/authService";
import roomService, {
  type RoomType,
  type Room,
} from "../../services/roomService";
import { BookingCard } from "../../components/BookingCard";
import { Button, ModalAlert } from "../../components";
import { useNavigate } from "react-router-dom";

export const AllBookingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  const [filterRoomId, setFilterRoomId] = useState("");
  const [filterRoomTypeId, setFilterRoomTypeId] = useState("");
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

  const buildParams = () => {
    return {
      room_id: filterRoomId || undefined,
      room_type_id: filterRoomTypeId || undefined,
      month: filterMonth ? Number(filterMonth) : undefined,
      year: filterYear ? Number(filterYear) : undefined,
    };
  };

  const fetchAllBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = buildParams();
      const response = await bookingService.getAllBookings(params);
      setAllBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch all bookings:", err);
      setError("Failed to load bookings. Please try again.");
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

  const fetchRoomTypes = async () => {
    try {
      const response = await roomService.getRoomTypes();
      setRoomTypes(response.data);
    } catch (err) {
      console.error("Failed to fetch room types:", err);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    fetchRooms();
    fetchRoomTypes();
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const timeout = setTimeout(() => {
      fetchAllBookings();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filterRoomId, filterRoomTypeId, filterMonth, filterYear]);

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
      showAlert("Error", "Failed to cancel booking.");
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

  const handleResetFilters = () => {
    setFilterRoomId("");
    setFilterMonth("");
    setFilterYear("");
  };

  const hasActiveFilters = filterRoomId || filterMonth || filterYear;

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>

      <div className="flex flex-wrap gap-2 items-end">
        <select
          className="border rounded px-2 py-1.5 text-sm"
          value={filterRoomId}
          onChange={(e) => setFilterRoomId(e.target.value)}
        >
          <option value="">All Rooms</option>
          {rooms.map((r) => (
            <option key={r.room_id} value={r.room_id}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1.5 text-sm"
          value={filterRoomTypeId}
          onChange={(e) => setFilterRoomTypeId(e.target.value)}
        >
          <option value="">All Room Types</option>
          {roomTypes.map((r) => (
            <option key={r.type_id} value={r.type_id}>
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
              {new Date(0, m - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          className="border rounded px-2 py-1.5 text-sm w-24"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        />

        {hasActiveFilters && (
          <button
            className="text-sm text-gray-500 underline"
            onClick={handleResetFilters}
          >
            Reset filters
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {allBookings.length} booking(s) found
      </p>

      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {allBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No bookings match the filters.
            </p>
          ) : (
            allBookings.map((booking) => (
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
