import * as React from 'react';
import { StationTime } from '../models/route.model';
import stationService from '../services/station.service';
import Station from '../models/station.model';
import StationStep from '@/components/StationStep';

interface RouteProgressStepperProps {
  stations: StationTime[];
  currentTime: string;
  departureStationId: string | null;
  arrivalStationId: string | null;
  isToday: boolean | null;
}

const RouteProgressStepper: React.FC<RouteProgressStepperProps> = ({
  stations,
  currentTime,
  departureStationId,
  arrivalStationId,
  isToday,
}) => {
  const [stationData, setStationData] = React.useState<Station[]>([]);

  React.useEffect(() => {
    const fetchStations = async () => {
      const ids = stations.map((station) => station.stationId);
      const fetchedStations = await stationService.getStationsByIds(ids);
      setStationData(fetchedStations);
    };

    fetchStations();
  }, [stations]);

  const filteredStations = stations.filter((station) => station.time !== '*');

  const firstTime = filteredStations[0]?.time;
  const lastTime = filteredStations[filteredStations.length - 1]?.time;

  return (
    <div
      className='p-6 mb-4'
      style={{
        padding: '0px',
        maxWidth: '420px',
        margin: '0',
      }}
    >
      {filteredStations.map((station, index) => (
        <StationStep
          key={station.stationId}
          station={station}
          index={index}
          filteredStations={filteredStations}
          currentTime={currentTime}
          firstTime={firstTime}
          lastTime={lastTime}
          isToday={isToday}
          stationData={stationData}
          departureStationId={departureStationId}
          arrivalStationId={arrivalStationId}
        />
      ))}
    </div>
  );
};

export default RouteProgressStepper;
