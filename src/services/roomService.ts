import api, { type ApiResponse } from "./api";

export interface Room {
  room_id: string;
  name: string;
  capacity: number;
  location?: string;
  facilities?: string[];
}

export interface BookedSlot {
  start_hour: string;
  end_hour: string;
  status?: string;
}

export interface BookedSlotsResponse {
  room_id: string;
  date: string;
  booked_slots: BookedSlot[];
}

const roomService = {
  /**
   * Retrieve all available meeting rooms.
   * GET /api/rooms
   */
  listRooms: async (): Promise<ApiResponse<Room[]>> => {
    const response = await api.get<ApiResponse<Room[]>>("/rooms");
    return response.data;
  },

  /**
   * Get occupied time slots for a specific room on a given date.
   * GET /api/rooms/:room_id/booked?date=YYYY-MM-DD
   */
  getBookedSlots: async (
    roomId: string,
    date: string
  ): Promise<ApiResponse<BookedSlotsResponse>> => {
    const response = await api.get<ApiResponse<BookedSlotsResponse>>(
      `/rooms/${roomId}/booked`,
      {
        params: { date },
      }
    );
    return response.data;
  },
};

export default roomService;
