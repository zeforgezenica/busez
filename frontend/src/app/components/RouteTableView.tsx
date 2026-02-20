'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { RouteLap } from '../models/route.model';
import Station from '../models/station.model';
import { useDisclosure } from '@nextui-org/react';
import RouteDetailsModal from './RouteDetailsModal';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { getGrammaticalForm } from '@/lib/timeUtils';

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

  const formatDuration = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} ${getGrammaticalForm(totalMinutes, 'minuta', 'minute', 'minuta')}`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const hoursText = `${hours}h`;
    const minsText = mins > 0 ? ` ${mins}min` : '';

    return hoursText + minsText;
  };

  const getETAForRoute = (departureTime: string) => {
    if (!isToday) return { eta: '', etaColor: 'inherit' };
    
    const [departureHours, departureMinutes] = departureTime.split(':').map(Number);
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    
    const departureInMinutes = departureHours * 60 + departureMinutes;
    const currentInMinutes = currentHours * 60 + currentMinutes;
    
    const remainingMinutes = departureInMinutes - currentInMinutes;
    
    let eta = '';
    let etaColor = 'inherit';
    
    if (remainingMinutes > 0) {
      const hours = Math.floor(remainingMinutes / 60);
      const mins = remainingMinutes % 60;
      
      if (hours > 0) {
        eta = `${hours}h ${mins}min`;
      } else {
        eta = `${mins}min`;
      }

      etaColor = remainingMinutes > 9 ? '#10B981' : remainingMinutes > 3 ? '#F59E0B' : '#EF4444';
      
    } else if (remainingMinutes >= -5) {
      eta = 'Upravo sada';
      etaColor = '#EF4444';
    } else {
      eta = 'Prošao';
      etaColor = '#6B7280';
    }
    
    return { eta, etaColor };
  };

  return (
    <div className="w-full overflow-x-auto mb-4">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl">
        <thead>
          <tr className="bg-gray-900 border-b border-gray-700">
            <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Linija</th>
            <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Agencija</th>
            <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Polazak</th>
            <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Dolazak</th>
            <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Trajanje</th>
            {isToday && (
              <th className="p-4 text-center font-semibold text-sm text-gray-200 border-r border-gray-700">Preostalo</th>
            )}
            <th className="p-4 text-center font-semibold text-sm text-gray-200">Detalji</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((routeLap, index) => {
            const departureStationIndex = routeLap.stations.findIndex(
              (station: { stationId?: string }) => station.stationId === selectedDepartureStation
            );
            const arrivalStationIndex = routeLap.stations.findIndex(
              (station: { stationId?: string }) => station.stationId === selectedArrivalStation
            );

            const departureTime = routeLap.stations[departureStationIndex]?.time || "";
            const arrivalTime = routeLap.stations[arrivalStationIndex]?.time || "";
            const deltaTime = calculateDuration(departureTime, arrivalTime);

            const departureStation = getDepartureStation(stations, selectedDepartureStation);
            const arrivalStation = getArrivalStation(stations, selectedArrivalStation);

            const { eta, etaColor } = getETAForRoute(departureTime);
            const isEven = index % 2 === 0;

            return (
              <tr 
                key={`${routeLap._id}-${departureTime}-${arrivalTime}-${index}`} 
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 border-b border-gray-700"
              >
                <td className="p-4 border-r border-gray-700">
                  <div className="font-semibold text-base text-white notranslate" lang="bs">{routeLap.name}</div>
                </td>
                <td className="p-4 border-r border-gray-700">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 underline p-0 h-auto min-w-0 transition-colors"
                    onClick={() => handleAgencyClick(routeLap.agencyId)}
                  >
                    <span className="notranslate" lang="bs">{agencyNames[routeLap.agencyId]}</span>
                  </Button>
                </td>
                <td className="p-4 border-r border-gray-700" translate="no" lang="bs">
                  <div className="space-y-1">
                    <div key={selectedDepartureStation} className="text-sm text-gray-400 notranslate" lang="bs" translate="no">{departureStation?.name || 'Nepoznato'}</div>
                    <div className="font-medium text-base text-white">{departureTime}</div>
                  </div>
                </td>
                <td className="p-4 border-r border-gray-700" translate="no" lang="bs">
                  <div className="space-y-1">
                    <div key={selectedArrivalStation} className="text-sm text-gray-400 notranslate" lang="bs" translate="no">{arrivalStation?.name || 'Nepoznato'}</div>
                    <div className="font-medium text-base text-white">{arrivalTime}</div>
                  </div>
                </td>
                <td className="p-4 border-r border-gray-700 text-center">
                  <div className="text-sm text-gray-300">
                    {formatDuration(deltaTime)}
                  </div>
                </td>
                {isToday && (
                  <td className="p-4 border-r border-gray-700 text-center">
                    <div className="text-sm font-semibold" style={{ color: etaColor }}>
                      {eta || '-'}
                    </div>
                  </td>
                )}
                <td className="p-4 text-center">
                  <Button
                    size="sm"
                    className="bg-white hover:bg-gray-200 text-black px-6 transition-colors font-medium"
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
