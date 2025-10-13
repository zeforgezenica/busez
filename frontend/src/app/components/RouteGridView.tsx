'use client';
import React from 'react';
import { RouteLap } from '../models/route.model';
import Station from '../models/station.model';
import RouteSearchResult from '../routes/RouteSearchResult';

interface RouteGridViewProps {
  routes: RouteLap[];
  agencyNames: Record<string, string>;
  stations: Station[];
  selectedDepartureStation: string | null;
  selectedArrivalStation: string | null;
  isToday: boolean;
  calculateDuration: (startTime: string, endTime: string) => number;
}

const RouteGridView: React.FC<RouteGridViewProps> = ({
  routes,
  agencyNames,
  stations,
  selectedDepartureStation,
  selectedArrivalStation,
  isToday,
  calculateDuration,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 mb-4 w-full max-w-[1400px] mx-auto px-6 py-4">
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

        return (
          <RouteSearchResult
            key={`${routeLap._id}-${departureTime}-${arrivalTime}`}
            route={routeLap}
            agencyName={agencyNames[routeLap.agencyId]}
            stations={stations}
            departureStationId={selectedDepartureStation}
            arrivalStationId={selectedArrivalStation}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            deltaTime={deltaTime}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
};

export default RouteGridView;
