export default function SkeletonAdminDashboard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex w-full h-32 gap-4">
        <div className="w-full h-full rounded-2xl bg-gray-200 opacity-20 animate-pulse">
          {" "}
        </div>
        <div className="w-full h-full rounded-2xl bg-gray-200 opacity-20 animate-pulse">
          {" "}
        </div>
        <div className="w-full h-full rounded-2xl bg-gray-200 opacity-20 animate-pulse">
          {" "}
        </div>
        <div className="w-full h-full rounded-2xl bg-gray-200 opacity-20 animate-pulse">
          {" "}
        </div>
      </div>

      {/* Bar Chart, Doughnut Chart & CTA */}
      <div className="flex gap-4 h-120 w-full">
        <div className="w-3/4 h-full bg-gray-200 opacity-20 rounded-2xl animate-pulse"></div>
        <div className="w-1/4 h-full">
          <div className="w-full h-1/2 bg-gray-200 opacity-20 rounded-2xl animate-pulse"></div>
          <div className="w-full h-1/2 bg-gray-200 opacity-20 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
