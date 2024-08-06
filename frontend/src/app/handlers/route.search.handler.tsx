import { DateValue } from "@react-types/calendar";
import { Station } from "../models/station.model";
import { Week } from "../models/weekdays.model";

export const getWeekDayFromDateValue = (
  dateValue: DateValue | null
): number | null => {
  if (dateValue === null) return null;
  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  const dayIndex = (date.getDay() + 6) % 7;
  return dayIndex;
};

export const handleStartDateChangeWrapper = (
  date: DateValue | null,
  setDepartureDate: (dayIndex: number | null) => void,
  setSelectedDepartureDate: (dayIndex: number | null) => void
) => {
  const dayIndex = getWeekDayFromDateValue(date);
  setDepartureDate(dayIndex);
  setSelectedDepartureDate(dayIndex);
};

export const handleEndDateChangeWrapper = (
  date: DateValue | null,
  setReturnDate: (dayIndex: number | null) => void,
  setSelectedReturnDate: (dayIndex: number | null) => void
) => {
  const dayIndex = getWeekDayFromDateValue(date);
  setReturnDate(dayIndex);
  setSelectedReturnDate(dayIndex);
};

export const handleFilterClick = (
  departureDate: number | null,
  returnDate: number | null,
  selectedDepartureStation: string | null,
  selectedArrivalStation: string | null,
  onFilter: () => void,
  setError: (error: string | null) => void
) => {
  const departureDayIndex = departureDate !== null ? departureDate : null;
  const returnDayIndex = returnDate !== null ? returnDate : null;

  const departureDay =
    departureDayIndex !== null ? Week[departureDayIndex] : "None";
  const returnDay = returnDayIndex !== null ? Week[returnDayIndex] : "None";

  if (
    !selectedDepartureStation ||
    !selectedArrivalStation ||
    departureDay === "None"
  ) {
    setError(
      "Please select departure station, arrival station, and departure date."
    );
    return;
  }

  setError(null);

  onFilter();
};
