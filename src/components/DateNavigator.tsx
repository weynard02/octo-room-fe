import React from "react";
import { formatDateDisplay } from "../helpers/dataFormatter";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import NavButton from "./NavButton";

export interface DateNavigatorProps {
  date: Date;
  onChange: (date: Date) => void;
  className?: string;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  date,
  onChange,
  className = "",
}) => {
  const go = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    onChange(next);
  };

  return (
    <div
      className={`flex justify-content gap-4 text-sm font-medium text-gray-700 select-none ${className}`}
    >
      {/* Calendar icon + date label */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-r border-gray-300">
        <CalendarDays className="w-4 h-4 text-gray-600 shrink-0" />
        <span className="whitespace-nowrap">{formatDateDisplay(date)}</span>
      </div>

      {/* Prev */}
      <NavButton onClick={() => go(-1)} aria-label="Previous day">
        <ChevronLeft className="w-4 h-4 text-black" />
      </NavButton>

      {/* Next */}
      <NavButton onClick={() => go(1)} aria-label="Next day">
        <ChevronRight className="w-4 h-4 text-black" />
      </NavButton>
    </div>
  );
};
