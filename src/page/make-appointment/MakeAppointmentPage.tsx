import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "../../components";
import type AppointmentType from "../../types/Appointment";
import formattedDate from "../../utils/dateSetting";
import bookingService from "../../services/bookingService";
import roomService, { type Room } from "../../services/roomService";
import { useNavigate } from "react-router-dom";

import bookmarkIcon from "../../assets/icons/3d-bookmark.png";
import imageHyspace from "../../assets/images/graha-cimb.png";

const MakeAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<AppointmentType>({
    room: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    notes: "",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await roomService.listRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const calculateDuration = () => {
    if (!form.timeStart || !form.timeEnd) return "-";

    const [startH, startM] = form.timeStart.split(":").map(Number);
    let [endH, endM] = form.timeEnd.split(":").map(Number);

    // Handle midnight as 24:00 if it's after start time
    if (endH === 0 && endM === 0 && (startH > 0 || startM > 0)) {
      endH = 24;
    }

    const diffMinutes = endH * 60 + endM - (startH * 60 + startM);

    if (diffMinutes < 0) return "Invalid duration";

    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
    if (mins > 0) parts.push(`${mins} min${mins > 1 ? "s" : ""}`);

    return parts.join(" ") || "0 mins";
  };

  const reviewAppointment = () => {
    if (!form.room || !form.date || !form.timeStart || !form.timeEnd) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const selectedRoom = rooms.find((r) => r.name === form.room);
      if (!selectedRoom) {
        alert("Invalid room selected.");
        return;
      }

      await bookingService.createBooking({
        room_id: selectedRoom.room_id,
        date: form.date,
        slots: [
          {
            start_hour: `${form.date}T${form.timeStart}:00`,
            end_hour: `${form.date}T${form.timeEnd}:00`,
          },
        ],
      });

      alert("Booking successful!");
      setIsModalOpen(false);
      navigate("/my-booking");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-1/3 min-w-1/2">
          <Card
            title="Make an Appointment"
            description="Please fill out the form below to book your appointment."
            icon={bookmarkIcon}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="room"
                  >
                    Select Meeting Room
                  </label>
                  <div>
                    <select
                      id="room"
                      name="room"
                      value={form.room}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white appearance-none"
                      onChange={handleOnChange}
                      disabled={loading}
                    >
                      <option value="" disabled>
                        {loading ? "Loading rooms..." : "Select Room"}
                      </option>
                      {rooms.map((room) => (
                        <option key={room.room_id} value={room.name}>
                          {room.name} ({room.capacity} Pax)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Input
                  id="date"
                  name="date"
                  label="Select Date"
                  type="date"
                  value={form.date}
                  onChange={handleOnChange}
                />
                <div className="flex gap-4">
                  <Input
                    id="timeStart"
                    name="timeStart"
                    label="Start Time"
                    type="time"
                    value={form.timeStart}
                    onChange={handleOnChange}
                  />

                  <Input
                    id="timeEnd"
                    name="timeEnd"
                    label="End Time"
                    type="time"
                    value={form.timeEnd}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="notes"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Any specific concerns..."
                  onChange={handleOnChange}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => reviewAppointment()}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                >
                  Book Room
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-black/60 items-center justify-center content-center z-50">
          <div className="p-8 bg-white rounded-xl min-w-1/3 max-w-1/2 gap-4 flex flex-col ">
            <h1 className="font-semibold text-2xl text-black">
              Review Your Appointment
            </h1>
            <div className="w-full h-px bg-blue-100" />
            <img
              className="w-full h-48 object-cover rounded-md"
              src={imageHyspace}
              alt="Room"
            />
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-2xl text-blue-600">
                  {form.room ? form.room : "Unselected Room"}
                </h3>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className="text-sm text-gray-500">Date:</h3>
                  <h3 className="font-medium text-[16px] w-50">
                    {formattedDate(form.date)}
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Duration</h3>
                  <h3 className="font-medium text-[16px]">
                    {calculateDuration()}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className="text-sm text-gray-500">Start on:</h3>
                  <h3 className="font-medium text-[16px] w-1/2">
                    {form.timeStart ? form.timeStart : "-"}
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">End on:</h3>
                  <h3 className="font-medium text-[16px]">
                    {form.timeEnd ? form.timeEnd : "-"}
                  </h3>
                </div>
              </div>
              <div className="">
                <h3 className="text-sm text-gray-500">Notes:</h3>
                <h3 className="font-medium text-[16px]">
                  {form.notes ? form.notes : "-"}
                </h3>
              </div>
            </div>
            <div className="flex gap-1 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSubmit()}
                disabled={submitting}
              >
                {submitting ? "Booking..." : "Booking"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeAppointmentPage;
