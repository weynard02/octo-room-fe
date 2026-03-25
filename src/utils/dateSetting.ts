const formattedDate = (dateString: string) => {
  const newDate = new Date(dateString);
  const dateConfig: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return newDate.toLocaleDateString("en-ID", dateConfig);
};

export default formattedDate;
