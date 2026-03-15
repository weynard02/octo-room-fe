import api from "./api";

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location?: string;
  facilities?: string[];
}

export interface BookedSlot {
  start_hour: string;
  end_hour: string;
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
  listRooms: async (): Promise<Room[]> => {
    const response = await api.get<Room[]>("/rooms");
    return response.data;
  },

  /**
   * Get occupied time slots for a specific room on a given date.
   * GET /api/rooms/:room_id/booked?date=YYYY-MM-DD
   */
  getBookedSlots: async (
    roomId: string,
    date: string
  ): Promise<BookedSlotsResponse> => {
    const response = await api.get<BookedSlotsResponse>(
      `/rooms/${roomId}/booked`,
      {
        params: { date },
      }
    );
    return response.data;
  },
};

export default roomService;
