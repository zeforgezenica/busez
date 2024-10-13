import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../routes/routeSearchStyles';
import dayjs from 'dayjs';

interface DateSelectorProps {
  dateOfDeparture: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dateOfDeparture,
  onDateChange,
}) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Odaberite Datum Polaska'
          className='w-full md:w-2/3 lg:w-1/2 mx-auto'
          value={dateOfDeparture}
          onChange={onDateChange}
          format='DD/MM/YYYY'
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DateSelector;
