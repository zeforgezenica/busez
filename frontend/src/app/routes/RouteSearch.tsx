import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Repeat } from '@mui/icons-material';
import { Station } from '../models/station.model';
import {
  handleFilterClick,
  handleSwapStations,
} from '../handlers/route.search.handler';
import dayjs from 'dayjs';
import StationSelect from '@/components/StationSelect';
import DateSelector from '@/components/DateSelector';
import MapSelector from '../components/MapSelector';

interface RouteSearchProps {
  stations: Station[];
  selectedDepartureStation: string | null;
  setSelectedDepartureStation: (stationId: string | null) => void;
  selectedArrivalStation: string | null;
  setSelectedArrivalStation: (stationId: string | null) => void;
  dateOfDeparture: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  onFilter: () => void;
  historyDepartureStationIds: string[];
  historyArrivalStationIds: string[];
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
  historyDepartureStationIds,
  historyArrivalStationIds,
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
      <div className='flex flex-col items-center space-y-4 my-4 max-w-screen-sm mx-auto'>
        <StationSelect
          stations={stations}
          selectedStation={selectedDepartureStation}
          setSelectedStation={setSelectedDepartureStation}
          placeholder='Odaberite Stanicu Polaska'
          history={historyDepartureStationIds}
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
          <Repeat sx={{ fontSize: 30 }} />
        </Button>
        <StationSelect
          stations={stations}
          selectedStation={selectedArrivalStation}
          setSelectedStation={setSelectedArrivalStation}
          placeholder='Odaberite Odredišnu Stanicu'
          history={historyArrivalStationIds}
        />
      </div>
      <div className='flex justify-center space-x-4 my-4 max-w-screen-sm mx-auto'>
        <DateSelector
          dateOfDeparture={dateOfDeparture}
          onDateChange={onDateChange}
        />
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
