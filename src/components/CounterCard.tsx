import bgCount from "../assets/background/Bg-Hero-Count.png";

export interface CounterCardType {
  variant: "red" | "white";
  title: string;
  count: string;
  notes: string;
}

export default function CounterCard({
  variant = "white",
  title,
  count,
  notes,
}: CounterCardType) {
  return (
    <div
      className="w-full p-4 flex flex-col h-fit justify-center rounded-2xl bg-white bg-no-repeat bg-center shadow-lg shadow-[#f0f0f0] gap-4"
      style={{
        backgroundImage: variant === "red" ? `url(${bgCount})` : "",
      }}
    >
      <h3
        className="text-xl text-gray-600"
        style={{
          color: variant === "red" ? "white" : "",
          opacity: variant === "red" ? "60%" : "100%",
        }}
      >
        {title}
      </h3>
      <div>
        <h1
          className="text-4xl font-semibold text-red-700"
          style={{
            color: variant === "red" ? "white" : "",
          }}
        >
          {count}
        </h1>
        <p
          className="font-light text-xs text-gray-800 opacity-50"
          style={{ color: variant === "red" ? "white" : "" }}
        >
          {notes}
        </p>
      </div>
    </div>
  );
}
