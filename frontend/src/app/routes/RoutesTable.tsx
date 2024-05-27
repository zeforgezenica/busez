import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Route from "../models/route.model";
import Station from "../models/station.model";

interface RoutesTableProps {
  routes: Route[];
  stations: Station[];
}

const RoutesTable: React.FC<RoutesTableProps> = ({ routes, stations }) => {
  // Function to get station name by its ID
  const getStationNameById = (id: string): string => {
    const station = stations.find((s) => s._id === id);
    return station ? station.name : "Unknown Station";
  };
  // Extract unique stationIds ensuring all are treated as strings
  const stationIds = routes.reduce<string[]>((ids, route) => {
    route.stations.forEach((station) => {
      const stationIdStr = String(station.stationId);
      if (!ids.includes(stationIdStr)) {
        ids.push(stationIdStr);
      }
    });
    return ids;
  }, []);

  const reversedStationIds = [...stationIds].reverse();

  return (
    <div>
      <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>
        Departure Times
      </h2>
      <Table aria-label="Departure times table">
        <TableHeader className="text-center">
          {stationIds.map((stationId) => (
            <TableColumn key={stationId} className="text-center">
              {getStationNameById(stationId)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route._id}>
              {stationIds.map((stationId) => {
                const station = route.stations.find(
                  (s) => String(s.stationId) === stationId
                );
                return (
                  <TableCell
                    key={`${route._id}-${stationId}`}
                    className="text-center"
                  >
                    {station && (
                      <div>
                        {station.departureTime &&
                          station.departureTime.map((time, index) => (
                            <div
                              key={`${route._id}-${stationId}-departure-${index}`}
                            >
                              {time}
                            </div>
                          ))}
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>Return Times</h2>
      <Table aria-label="Return times table">
        <TableHeader className="text-center">
          {reversedStationIds.map((stationId) => (
            <TableColumn key={stationId} className="text-center">
              {getStationNameById(stationId)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route._id}>
              {reversedStationIds.map((stationId) => {
                const station = route.stations.find(
                  (s) => String(s.stationId) === stationId
                );
                return (
                  <TableCell
                    key={`${route._id}-${stationId}`}
                    className="text-center"
                  >
                    {station && (
                      <div>
                        {station.returnTime &&
                          station.returnTime.map((time, index) => (
                            <div
                              key={`${route._id}-${stationId}-return-${index}`}
                            >
                              {time}
                            </div>
                          ))}
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoutesTable;
