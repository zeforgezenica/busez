import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Station } from '../models/station.model';
import {
  handleFilterClick,
  handleSwapStations,
} from "../handlers/route.search.handler";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, customSelectStyles } from "./routeSearchStyles";
import DatePicker from "@/components/DatePicker";
import StationSelect from '@/components/StationSelect';
import DateSelector from '@/components/DateSelector';
import MapSelector from "../components/MapSelector";

interface RouteSearchProps {
  stations: Station[];
  selectedDepartureStation: string | null;
  setSelectedDepartureStation: (stationId: string | null) => void;
  selectedArrivalStation: string | null;
  setSelectedArrivalStation: (stationId: string | null) => void;
  dateOfDeparture: Date;
  onDateChange: (date: Date) => void;
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

  return (
    <>
      <h1>Pretraži Linije</h1>
      {/* TODO: Uncomment and use MapSelector once station coordinates are gathered
      <MapSelector
        stations={stations}
        setSelectedDepartureStationId={setSelectedDepartureStation}
        setSelectedDestinationStationId={setSelectedArrivalStation}
        selectedDepartureStationId={selectedDepartureStation}
        selectedDestinationStationId={selectedArrivalStation}
      />
      */}
      <div className='flex flex-col items-center space-y-4 my-4'>
        <StationSelect
          stations={stations}
          selectedStation={selectedDepartureStation}
          setSelectedStation={setSelectedDepartureStation}
          placeholder='Odaberite Stanicu Polaska'

        />
        <Button
          radius='full'
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
          Obrni
          <SwapVertIcon />
        </Button>
        <StationSelect
          stations={stations}
          selectedStation={selectedArrivalStation}
          setSelectedStation={setSelectedArrivalStation}
          placeholder='Odaberite Odredišnu Stanicu'
        />
      </div>
      <div className="flex justify-center space-x-4 my-4">
        <ThemeProvider theme={darkTheme}>
          <DatePicker
            date={dateOfDeparture}
            dateFormat="dd/MM/yyyy"
            className="w-full md:w-2/3 lg:w-1/2 mx-auto"
            onChange={(date) => {
              onDateChange(date);
            }} />
        </ThemeProvider>
      </div>
      {error && (
        <div className='flex justify-center my-4'>
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      )}
      <div className='flex justify-center my-4'>
        <Button
          isDisabled={!selectedDepartureStation || !selectedArrivalStation}
          onClick={() =>
            handleFilterClick(
              selectedDepartureStation,
              selectedArrivalStation,
              onFilter,
              setError
            )
          }
        >
          Pretraži
        </Button>
      </div>
    </>
  );
};

export default RouteSearch;
