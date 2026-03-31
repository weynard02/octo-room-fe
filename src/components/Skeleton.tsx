export function SkeletonAdminDashboard() {
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

export function SkeletonListBooking() {
  return (
    <div className="flex flex-col justify-center gap-4 mt-4 w-full h-full">
      {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
      <div className="w-full bg-gray-100 h-48 rounded-2xl animate-pulse"></div>
      <div className="w-full bg-gray-100 h-48 rounded-2xl animate-pulse"></div>
      <div className="w-full bg-gray-100 h-48 rounded-2xl animate-pulse"></div>
    </div>
  );
}

export function SkeletonCreateRoom() {
  return (
    <div className="flex flex-col w-full h-fit rounded-2xl bg-gray-100 animate-pulse p-4 gap-4">
      <div className="flex flex-col gap-2 mb-2">
        <div className="w-60 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-200 h-4 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-60 h-4 bg-gray-200 rounded-lg"></div>
          <div className="w-200 h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-60 h-4 bg-gray-200 rounded-lg"></div>
          <div className="w-200 h-12 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-60 h-4 bg-gray-200 rounded-lg"></div>
          <div className="w-200 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
    </div>
  );
}
export function SkeletonGridHome() {
  return (
    <div className="flex flex-row w-full h-150 rounded-2xl bg-gray-100 animate-pulse p-4 gap-4 mt-4">
      <div className="h-full w-2/12 bg-gray-200 rounded-2xl"></div>
      <div className="h-full w-5/12 bg-gray-200 rounded-2xl"></div>
      <div className="h-full w-5/12 bg-gray-200 rounded-2xl"></div>
    </div>
  );
}
