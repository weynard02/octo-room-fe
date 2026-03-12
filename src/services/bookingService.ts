import api from "./api";

export interface BookingSlot {
  start_hour: string; // ISO datetime e.g. "2026-03-10T09:00:00"
  end_hour: string; // ISO datetime e.g. "2026-03-10T10:00:00"
}

export interface CreateBookingRequest {
  room_id: string;
  date: string; // "YYYY-MM-DD"
  slots: BookingSlot[];
}

export interface Booking {
  id: string;
  room_id: string;
  user_id: string;
  date: string;
  slots: BookingSlot[];
  status: "active" | "cancelled";
  created_at?: string;
  updated_at?: string;
}

const bookingService = {
  /**
   * Reserve a room for one or more time slots.
   * POST /api/bookings
   * Requires authentication.
   */
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await api.post<Booking>("/api/bookings", data);
    return response.data;
  },

  /**
   * List all bookings belonging to the authenticated user.
   * GET /api/bookings/my
   * Requires authentication.
   */
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>("/bookings/my");
    return response.data;
  },

  /**
   * Retrieve details of a specific booking.
   * GET /bookings/:booking_id
   * Requires authentication.
   */
  getBookingDetail: async (bookingId: string): Promise<Booking> => {
    const response = await api.get<Booking>(`/bookings/${bookingId}`);
    return response.data;
  },

  /**
   * Cancel an existing booking.
   * PATCH /bookings/:booking_id/cancel
   * Requires authentication.
   */
  cancelBooking: async (bookingId: string): Promise<Booking> => {
    const response = await api.patch<Booking>(`/bookings/${bookingId}/cancel`);
    return response.data;
  },
};

export default bookingService;
