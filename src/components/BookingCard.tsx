import { useNavigate } from "react-router-dom";
import type { Booking } from "../services/bookingService";
import { Card } from "./Card";
import { getEffectiveStatus } from "../utils/bookingUtils";
import formattedDate from "../utils/dateSetting";
import { Button } from "./Button";
import { statusStyles } from "../page/my-booking/status";
import React from "react";

export const BookingCard: React.FC<{
  booking: Booking;
  isAdmin: boolean;
  onCancelRequest: (booking: Booking) => void;
}> = React.memo(({ booking, isAdmin, onCancelRequest }) => {
  const navigate = useNavigate();
  const effectiveStatus = getEffectiveStatus(booking);

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="font-semibold">
            Room:{" "}
            {typeof booking.room === "string"
              ? booking.room
              : booking.room?.name || "Unknown"}
          </p>
          <p className="text-gray-500 text-sm">
            Date: {formattedDate(booking.date)}
          </p>
          <p className="text-gray-500 text-sm">
            Time: {booking.slots?.[0]?.start_hour || "N/A"} -{" "}
            {booking.slots?.[0]?.end_hour || "N/A"}
          </p>
          {isAdmin && (
            <p className="text-gray-500 text-sm truncate">
              Customer Email: {booking.customer_email || "N/A"}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusStyles[effectiveStatus] || "bg-gray-100 text-gray-800"
            }`}
          >
            {effectiveStatus}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() =>
              navigate(`/my-booking/${booking.booking_id}`, {
                state: { booking },
              })
            }
          >
            View Details
          </Button>
          {effectiveStatus !== "cancelled" &&
            effectiveStatus !== "completed" && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-600 border-red-400 hover:bg-red-50"
                onClick={() => onCancelRequest(booking)}
              >
                Cancel Booking
              </Button>
            )}
        </div>
      </div>
    </Card>
  );
});
