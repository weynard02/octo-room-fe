import type { BookedSlot } from "../services/roomService"
import { Button } from "./Button";

type Props = {
  booking: BookedSlot;
  onClose: () => void;
};

export function BookingDetailModal({ booking, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p06 w-100">
        <h2 className="text-xl font-semibold mb-4">
          Booking Detail
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <b>Booking ID:</b>
          </p>

          <p>
            <b>Room:</b>
          </p>

          <p>
            <b>Date:</b>
          </p>

          <p>
            <b>Status:</b>
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <Button
            className="text-red-600 border border-red-400 px-3 py-1 rounded"
          >
            Cancel Booking
          </Button>

          <Button className="px-3 py-1 border rounded">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}