'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { RouteLap } from '../app/models/route.model';
import Station from '../app/models/station.model';
import { useDisclosure } from '@nextui-org/react';
import RouteDetailsModal from './RouteDetailsModal';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { calculateETA, getGrammaticalForm } from '@/lib/timeUtils';

interface RouteTableViewProps {
  routes: RouteLap[];
  agencyNames: Record<string, string>;
  stations: Station[];
  selectedDepartureStation: string | null;
  selectedArrivalStation: string | null;
  isToday: boolean;
  calculateDuration: (startTime: string, endTime: string) => number;
}

const RouteTableView: React.FC<RouteTableViewProps> = ({
  routes,
  agencyNames,
  stations,
  selectedDepartureStation,
  selectedArrivalStation,
  isToday,
  calculateDuration,
}) => {
  const [currentTime, setCurrentTime] = React.useState(dayjs().format('HH:mm:ss'));
  const [selectedRoute, setSelectedRoute] = React.useState<RouteLap | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDetailsClick = (route: RouteLap) => {
    setSelectedRoute(route);
    onOpen();
  };

  const handleAgencyClick = (agencyId: string) => {
    router.push(`/agency/${agencyId}`);
  };

  const getDepartureStation = (stations: Station[], departureStationId: string | null) => {
    return stations.find(station => station._id === departureStationId);
  };

  const getArrivalStation = (stations: Station[], arrivalStationId: string | null) => {
    return stations.find(station => station._id === arrivalStationId);
  };

  return (
    <div className="w-full overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left font-semibold">Linija</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Agencija</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Polazak</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Dolazak</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Trajanje</th>
            {isToday && (
              <th className="border border-gray-300 p-3 text-left font-semibold">Preostalo</th>
            )}
            <th className="border border-gray-300 p-3 text-center font-semibold">Detalji</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((routeLap) => {
            const departureStationIndex = routeLap.stations.findIndex(
              (station) => station.stationId === selectedDepartureStation
            );
            const arrivalStationIndex = routeLap.stations.findIndex(
              (station) => station.stationId === selectedArrivalStation
            );

            const departureTime = routeLap.stations[departureStationIndex]?.time || "";
            const arrivalTime = routeLap.stations[arrivalStationIndex]?.time || "";
            const deltaTime = calculateDuration(departureTime, arrivalTime);

            const departureStation = getDepartureStation(stations, selectedDepartureStation);
            const arrivalStation = getArrivalStation(stations, selectedArrivalStation);

            return (
              <tr key={`${routeLap._id}-${departureTime}-${arrivalTime}`} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  <div className="font-semibold text-sm">{routeLap.name}</div>
                </td>
                <td className="border border-gray-300 p-3">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-blue-500 underline p-0 h-auto min-w-0"
                    onClick={() => handleAgencyClick(routeLap.agencyId)}
                  >
                    {agencyNames[routeLap.agencyId]}
                  </Button>
                </td>
                <td className="border border-gray-300 p-3">
                  <div className="text-sm">
                    <div className="font-medium">{departureStation?.name || 'Nepoznato'}</div>
                    <div className="text-gray-600">{departureTime}</div>
                  </div>
                </td>
                <td className="border border-gray-300 p-3">
                  <div className="text-sm">
                    <div className="font-medium">{arrivalStation?.name || 'Nepoznato'}</div>
                    <div className="text-gray-600">{arrivalTime}</div>
                  </div>
                </td>
                <td className="border border-gray-300 p-3 text-sm">
                  {deltaTime} {getGrammaticalForm(deltaTime, 'minuta', 'minute', 'minuta')}
                </td>
                {isToday && (
                  <td className="border border-gray-300 p-3 text-sm">
                    -
                  </td>
                )}
                <td className="border border-gray-300 p-3 text-center">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => handleDetailsClick(routeLap)}
                  >
                    Pogledaj
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedRoute && (
        <RouteDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          route={selectedRoute}
          currentTime={currentTime}
          departureStationId={selectedDepartureStation}
          arrivalStationId={selectedArrivalStation}
          isToday={isToday}
          eta=""
          screenWidth={typeof window !== 'undefined' ? window.innerWidth : 1200}
        />
      )}
    </div>
  );
};

export default RouteTableView;
