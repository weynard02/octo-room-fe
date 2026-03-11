export const formatDateKey = (date: Date): string => {
  const wib = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return wib.format(date); // "2026-03-09"
};

export const formatDateDisplay = (date: Date): string =>
  date.toLocaleDateString("en-ID", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }); // "Sen, 09 Maret 2026"
