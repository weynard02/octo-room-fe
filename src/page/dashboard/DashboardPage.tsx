import { useState } from "react";
import { BookingGrid, DashboardHeader } from "../../components";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState("2026-03-12");

  return (
    <div>
      <DashboardHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <BookingGrid
        selectedDate={selectedDate}
      />
    </div>
  )
}