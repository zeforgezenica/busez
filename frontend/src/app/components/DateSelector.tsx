'use client';

import React from 'react';
import { Calendar } from './ui/calendar';
import dayjs from 'dayjs';

interface DateSelectorProps {
  dateOfDeparture: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
                                                     dateOfDeparture,
                                                     onDateChange,
                                                   }) => {
  const [date, setDate] = React.useState<Date | undefined>(
      dateOfDeparture ? dateOfDeparture.toDate() : undefined
  );

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateChange(selectedDate ? dayjs(selectedDate) : null);
  };

  return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
        />
  );
};

export default DateSelector;