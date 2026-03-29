import api, { type ApiResponse } from "./api";

export interface BookingSlot {
  start_hour: string; // ISO datetime e.g. "2026-03-10T09:00:00"
  end_hour: string; // ISO datetime e.g. "2026-03-10T10:00:00"
}

export interface CreateBookingRequest {
  room_id: string;
  date: string; // "YYYY-MM-DD"
  slots: BookingSlot[];
  customer_email?: string;
}

export interface Booking {
  id: string;
  status: string;
  date: string;
  room: { room_id: string; name: string; floor: number };
  booking_id: string;
  room_id?: string;
  user_id?: string;
  slots?: BookingSlot[];
  created_at?: string;
  updated_at?: string;
  customer_email?: string;
}

export interface GetAllBookingsParams {
  room_type_id?: string;
  year?: number | string;
  room_id?: string;
  month?: number | string;
}

const bookingService = {
  /**
   * Reserve a room for one or more time slots.
   * POST /api/bookings
   * Requires authentication.
   */
  createBooking: async (
    data: CreateBookingRequest,
  ): Promise<ApiResponse<Booking>> => {
    const response = await api.post<ApiResponse<Booking>>("/bookings", data);
    return response.data;
  },

  /**
   * List all bookings belonging to the authenticated user.
   * GET /api/bookings/my
   * Requires authentication.
   */
  getMyBookings: async (): Promise<ApiResponse<Booking[]>> => {
    const response = await api.get<ApiResponse<Booking[]>>("/bookings/my");
    return response.data;
  },

  /**
   * List all bookings (only for admin access).
   * GET /api/bookings/all
   * Requires authentication.
   */
  getAllBookings: async (
    params?: GetAllBookingsParams,
  ): Promise<ApiResponse<Booking[]>> => {
    const response = await api.get<ApiResponse<Booking[]>>("/bookings/all", {
      params,
    });
    return response.data;
  },

  /**
   * Retrieve details of a specific booking.
   * GET /api/bookings/:booking_id
   * Requires authentication.
   */
  getBookingDetail: async (
    bookingId: string,
  ): Promise<ApiResponse<Booking>> => {
    const response = await api.get<ApiResponse<Booking>>(
      `/bookings/${bookingId}`,
    );
    return response.data;
  },

  /**
   * Cancel an existing booking.
   * PATCH /api/bookings/:booking_id/cancel
   * Requires authentication.
   */
  cancelBooking: async (bookingId: string): Promise<ApiResponse<Booking>> => {
    const response = await api.patch<ApiResponse<Booking>>(
      `/bookings/${bookingId}/cancel`,
    );
    return response.data;
  },
};

export default bookingService;
