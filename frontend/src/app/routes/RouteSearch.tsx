import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@nextui-org/react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Station } from "../models/station.model";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import '../i18n'; // Import i18n configuration
import {
  handleFilterClick,
  handleSwapStations,
} from "../handlers/route.search.handler";

import dayjs from "dayjs";
import "dayjs/locale/en";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, customSelectStyles } from "./routeSearchStyles";
interface RouteSearchProps {
  stations: Station[];
  selectedDepartureStation: string | null;
  setSelectedDepartureStation: (stationId: string | null) => void;
  selectedArrivalStation: string | null;
  setSelectedArrivalStation: (stationId: string | null) => void;
  dateOfDeparture: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  onFilter: () => void;
}

const RouteSearch: React.FC<RouteSearchProps> = ({
  stations,
  selectedDepartureStation,
  selectedArrivalStation,
  setSelectedDepartureStation,
  setSelectedArrivalStation,
  dateOfDeparture,
  onDateChange,
  onFilter,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const normalizeString = (str: string) => removeDiacritics(str).toLowerCase();

  const stationOptions = stations.map((station) => ({
    value: station._id ?? "",
    label: station.name,
  }));

  const handleChange = (
    selectedOption: any,
    setSelectedStation: (stationId: string | null) => void
  ) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setSelectedStation(selectedValue);
  };

  return (
    <>
      <h1>{t('searchLabel')}</h1>
      <div className="flex flex-col items-center space-y-4 my-4">
        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) =>
              normalizeString(option.value) ===
              normalizeString(selectedDepartureStation ?? "")
          )}
          onChange={(selectedOption) =>
            handleChange(selectedOption, setSelectedDepartureStation)
          }
          placeholder={t('DepartureStationSelectionPlaceholder')}
          styles={customSelectStyles}
          className="w-full md:w-2/3 lg:w-1/2 mx-auto"
        />
        <Button
          radius="full"
          onClick={() =>
            handleSwapStations(
              selectedDepartureStation,
              selectedArrivalStation,
              setSelectedDepartureStation,
              setSelectedArrivalStation
            )
          }
          isDisabled={!selectedDepartureStation || !selectedArrivalStation}
        >
          {t('ReverseLabel')}
          <SwapVertIcon />
        </Button>

        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) =>
              normalizeString(option.value) ===
              normalizeString(selectedArrivalStation ?? "")
          )}
          onChange={(selectedOption) =>
            handleChange(selectedOption, setSelectedArrivalStation)
          }
          placeholder={t('ArrivalStationSelectionPlaceholder')}
          styles={customSelectStyles}
          className="w-full md:w-2/3 lg:w-1/2 mx-auto"
        />
      </div>
      <div className="flex justify-center space-x-4 my-4">
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('DepartureDateLabel')}
              className="w-full md:w-2/3 lg:w-1/2 mx-auto"
              value={dateOfDeparture}
              onChange={(date) => {
                onDateChange(date);
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      {error && (
        <div className="flex justify-center my-4">
          <div style={{ color: "red" }}>{error}</div>
        </div>
      )}
      <div className="flex justify-center my-4">
        <Button
          isDisabled={!selectedDepartureStation || !selectedArrivalStation}
          onClick={() =>
            handleFilterClick(
              selectedDepartureStation,
              selectedArrivalStation,
              onFilter,
              setError,
              t
            )
          }
        >
          {t('searchButtonLabel')}
        </Button>
      </div>
    </>
  );
};

export default RouteSearch;
