import React, { useState } from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Repeat } from '@mui/icons-material';
import { Station } from '../models/station.model';
import {
  handleFilterClick,
  handleSwapStations,
} from '../handlers/route.search.handler';
import dayjs from 'dayjs';
import StationSelect from '@/components/StationSelect';
import DateSelector from '@/components/DateSelector';

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
    <div className="flex flex-col items-center w-full px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Pretraži Linije</h1>
      
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        <CardBody className="flex flex-col gap-4 p-6">
          
          <StationSelect
            stations={stations}
            selectedStation={selectedDepartureStation}
            setSelectedStation={setSelectedDepartureStation}
            placeholder='Odaberite Stanicu Polaska'
            history={historyDepartureStationIds}
          />

          <div className="flex justify-center -my-2 z-10">
            <Button
              isIconOnly
              radius="full"
              variant="flat"
              color="primary"
              className="hover:rotate-180 transition-transform duration-500 shadow-lg border-2 border-white/5 bg-blue-600/20"
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
              <Repeat className="text-blue-400" />
            </Button>
          </div>

          <StationSelect
            stations={stations}
            selectedStation={selectedArrivalStation}
            setSelectedStation={setSelectedArrivalStation}
            placeholder='Odaberite Odredišnu Stanicu'
            history={historyArrivalStationIds}
          />

          <div className="mt-2">
            <DateSelector
              dateOfDeparture={dateOfDeparture}
              onDateChange={onDateChange}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <Button
            className="w-full mt-4 font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20"
            size="lg"
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
          
        </CardBody>
      </Card>
    </div>
  );
};

export default RouteSearch;