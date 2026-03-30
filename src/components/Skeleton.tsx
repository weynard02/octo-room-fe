import React from "react";

export default function SkeletonHeaderCard() {
  return (
    <div className="flex w-full h-32 gap-4">
      <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse">
        {" "}
      </div>
      <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse">
        {" "}
      </div>
      <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse">
        {" "}
      </div>
      <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse">
        {" "}
      </div>
    </div>
  );
}
