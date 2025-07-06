import { format } from "date-fns";

export const formatDate = (date: Date | string) => {
  const day = format(date, "d");
  const monthYear = format(date, "MMMM-yyyy");
  const s = ["th", "st", "nd", "rd"];
  const v: number = Number(day) % 100;
  const suffix = s[(v - 20) % 10] || s[v] || s[0];

  return `${day}${suffix} ${monthYear}`;
};
