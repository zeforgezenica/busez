import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Route, StationTimes } from "../models/route.model";
import Station from "../models/station.model";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

const MapComponent = dynamic(() => import("../components/map/Map"), { ssr:false });

interface RoutesTableProps {
  route: Route;
  stations: Station[];
}

const RoutesTable: React.FC<RoutesTableProps> = ({ route, stations }) => {
  const getStationNameById = (id: string): string => {
    const station = stations.find((s) => s._id === id);
    return station ? station.name : "Unknown Station";
  };


  const departureCoordinates = (id: string) => {
    return stations.find((s) => s._id === id);
  };

  const departureStationIds = route.stations.map(
    (station) => station.stationId
  );

  const getStationCoordinates = departureStationIds.map(
    (stationId) => departureCoordinates(stationId)
  );

  const returnStationIds = [...departureStationIds].reverse();

  const maxTimes = Math.max(
    ...route.stations.map((station) => {
      return Math.max(station.departureTime.length, station.returnTime.length);
    })
  );

  return (
    <div>
      <MapComponent coordinates={[44.201133, 17.908600]} zoom={6} scrollWheelZoom={true} locations={getStationCoordinates} route={true}/>
      <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>
        Departure Times
      </h2>
      <Table aria-label="Departure times table">
        <TableHeader className="text-center">
          {departureStationIds.map((stationId) => (
            <TableColumn key={stationId} className="text-center">
              {getStationNameById(stationId)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {[...Array(maxTimes)].map((_, index) => (
            <TableRow key={index}>
              {departureStationIds.map((stationId) => {
                const station: StationTimes | undefined = route.stations.find(
                  (s) => s.stationId === stationId
                );
                return (
                  <TableCell key={stationId} className="text-center">
                    {station?.departureTime[index] || "*"}
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
          {returnStationIds.map((stationId) => (
            <TableColumn key={stationId} className="text-center">
              {getStationNameById(stationId)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {[...Array(maxTimes)].map((_, index) => (
            <TableRow key={index}>
              {returnStationIds.map((stationId) => {
                const station: StationTimes | undefined = route.stations.find(
                  (s) => s.stationId === stationId
                );
                return (
                  <TableCell key={stationId} className="text-center">
                    {station?.returnTime[index] || "*"}
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
