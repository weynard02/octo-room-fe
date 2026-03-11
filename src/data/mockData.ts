export const roomTypes = [
  {
    type_id: "rt-001",
    name: "Small Meeting Room",
    capacity: 4,
  },
  {
    type_id: "rt-002",
    name: "Medium Meeting Room",
    capacity: 8,
  },
  {
    type_id: "rt-003",
    name: "Conference Room",
    capacity: 20,
  },
];

export const rooms = [
  {
    room_id: "r-001",
    name: "Garuda Room",
    floor: 1,
    type_id: "rt-001",
  },
  {
    room_id: "r-002",
    name: "Komodo Room",
    floor: 2,
    type_id: "rt-002",
  },
  {
    room_id: "r-003",
    name: "Borobudur Hall",
    floor: 3,
    type_id: "rt-003",
  },
];

export const customers = [
  {
    customer_id: "c-001",
    name: "Alexander Weynard",
    phone: "081234567890",
    email: "weynard@example.com",
    password: "hashed_password_1",
    is_admin: "0",
  },
  {
    customer_id: "c-002",
    name: "Sarah Tan",
    phone: "081298765432",
    email: "sarah@example.com",
    password: "hashed_password_2",
    is_admin: "0",
  },
  {
    customer_id: "c-003",
    name: "Admin User",
    phone: "080000000000",
    email: "admin@example.com",
    password: "hashed_password_admin",
    is_admin: "1",
  },
];

export const bookings = [
  {
    booking_id: "b-001",
    status: "pending",
    date: "2026-03-12",
    customer_id: "c-001",
    room_id: "r-001",
  },
  {
    booking_id: "b-002",
    status: "paid",
    date: "2026-03-12",
    customer_id: "c-002",
    room_id: "r-002",
  },
  {
    booking_id: "b-003",
    status: "completed",
    date: "2026-03-10",
    customer_id: "c-001",
    room_id: "r-003",
  },
];

export const bookingSlots = [
  {
    slot_id: "s-001",
    start_hour: "2026-03-12T09:00:00",
    end_hour: "2026-03-12T10:00:00",
    booking_id: "b-001",
  },
  {
    slot_id: "s-002",
    start_hour: "2026-03-12T10:00:00",
    end_hour: "2026-03-12T11:00:00",
    booking_id: "b-001",
  },
  {
    slot_id: "s-003",
    start_hour: "2026-03-12T13:00:00",
    end_hour: "2026-03-12T15:00:00",
    booking_id: "b-002",
  },
  {
    slot_id: "s-004",
    start_hour: "2026-03-10T09:00:00",
    end_hour: "2026-03-10T12:00:00",
    booking_id: "b-003",
  },
];

export const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];