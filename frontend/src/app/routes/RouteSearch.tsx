import React, { useState } from "react";
import Select from "react-select";
import { DatePicker, Button } from "@nextui-org/react";
import { DateValue } from "@react-types/calendar";
import { Station } from "../models/station.model";
import { Week } from "../models/weekdays.model";
import {
  getWeekDayFromDateValue,
  handleStartDateChangeWrapper,
  handleEndDateChangeWrapper,
  handleFilterClick,
} from "../handlers/route.search.handler";

interface RouteSearchProps {
  stations: Station[];
  selectedDepartureStation: string | null;
  selectedArrivalStation: string | null;
  selectedDepartureDate: number | null;
  selectedReturnDate: number | null;
  setSelectedDepartureDate: (dayIndex: number | null) => void;
  setSelectedReturnDate: (dayIndex: number | null) => void;
  setSelectedDepartureStation: (stationId: string | null) => void;
  setSelectedArrivalStation: (stationId: string | null) => void;
  onFilter: () => void;
}

const RouteSearch: React.FC<RouteSearchProps> = ({
  stations,
  selectedDepartureStation,
  selectedArrivalStation,
  setSelectedDepartureDate,
  setSelectedReturnDate,
  setSelectedDepartureStation,
  setSelectedArrivalStation,
  onFilter,
}) => {
  const [departureDate, setDepartureDate] = useState<number | null>(null);
  const [returnDate, setReturnDate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stationOptions = stations.map((station) => ({
    value: station._id ?? "",
    label: station.name,
  }));

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      background: "#333",
      borderColor: "#666",
      color: "#fff",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? "#444" : "#333",
      color: state.isSelected ? "#fff" : "#ccc",
      "&:hover": {
        background: "#555",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#ccc",
    }),
  };

  return (
    <>
      <h1>Search Routes</h1>
      <div className="flex justify-center space-x-4 my-4">
        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) => option.value === selectedDepartureStation
          )}
          onChange={(selectedOption) => {
            setSelectedDepartureStation(
              selectedOption ? selectedOption.value : null
            );
          }}
          placeholder="Select Departure Station"
          styles={customSelectStyles}
          className="w-1/2"
        />
        <Select
          options={stationOptions}
          value={stationOptions.find(
            (option) => option.value === selectedArrivalStation
          )}
          onChange={(selectedOption) => {
            setSelectedArrivalStation(
              selectedOption ? selectedOption.value : null
            );
          }}
          placeholder="Select Arrival Station"
          styles={customSelectStyles}
          className="w-1/2"
        />
      </div>
      <div className="flex justify-center space-x-4 my-4">
        <DatePicker
          label="Departure Date"
          onChange={(date) =>
            handleStartDateChangeWrapper(
              date,
              setDepartureDate,
              setSelectedDepartureDate
            )
          }
          className="w-1/2"
        />
        <DatePicker
          label="Return Date"
          onChange={(date) =>
            handleEndDateChangeWrapper(
              date,
              setReturnDate,
              setSelectedReturnDate
            )
          }
          className="w-1/2"
        />
      </div>
      {error && (
        <div className="flex justify-center my-4">
          <div style={{ color: "red" }}>{error}</div>
        </div>
      )}
      <div className="flex justify-center my-4">
        <Button
          onClick={() =>
            handleFilterClick(
              departureDate,
              returnDate,
              selectedDepartureStation,
              selectedArrivalStation,
              onFilter,
              setError
            )
          }
        >
          Filter
        </Button>
      </div>
    </>
  );
};

export default RouteSearch;
