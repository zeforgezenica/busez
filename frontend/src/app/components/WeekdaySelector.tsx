import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Weekdays } from "../models/weekdays.model";

interface WeekdaySelectorProps {
  onChange: (selectedDays: Weekdays) => void;
  initialDays?: Weekdays;
  disabled?: boolean;
  disableToggle?: boolean;
}

const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({
  onChange,
  initialDays = {},
  disabled = false,
  disableToggle = false,
}) => {
  const [selectedDays, setSelectedDays] = useState<Weekdays>(initialDays);

  const toggleDay = (day: keyof Weekdays) => {
    if (disableToggle || disabled) return;

    const updatedDays = {
      ...selectedDays,
      [day]: !selectedDays[day],
    };

    setSelectedDays(updatedDays);
    onChange(updatedDays);
  };

  const days: Array<keyof Weekdays> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex space-x-2">
      {days.map((day) => (
        <Button
          key={day}
          color={selectedDays[day] ? "primary" : "default"}
          onClick={() => toggleDay(day)}
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
        >
          {day}
        </Button>
      ))}
    </div>
  );
};

export default WeekdaySelector;
