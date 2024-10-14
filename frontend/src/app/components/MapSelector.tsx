"use client";

import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useState, useEffect, useMemo } from "react";
import Station from "../models/station.model";
import StationService from "../services/station.service";
import { Button } from "@nextui-org/react";
import { stationIcon, departureIcon, destinationIcon } from "./mapIcons";

interface MapSelectorProps {
  stations: Station[];
  setSelectedDepartureStationId: (stationId: string | null) => void;
  setSelectedDestinationStationId: (stationId: string | null) => void;
  selectedDepartureStationId: string | null;
  selectedDestinationStationId: string | null;
}

const bounds: LatLngBounds = new LatLngBounds(
  [44.122304, 17.767191],
  [44.376469, 18.125083]
);

const FlyToPosition: React.FC<{ position: LatLngTuple }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);

  return null;
};

const MapSelector: React.FC<MapSelectorProps> = ({
  stations,
  selectedDepartureStationId,
  selectedDestinationStationId,
  setSelectedDepartureStationId,
  setSelectedDestinationStationId,
}) => {
  const [connectedStations, setConnectedStations] = useState<Station[]>([]);
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple | null>(
    null
  );
  const [hasFlown, setHasFlown] = useState(false);

  const defaultPosition: LatLngTuple = useMemo(
    () => [44.2033128, 17.907877],
    []
  );

  useEffect(() => {
    if (navigator.geolocation && !hasFlown) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
          setHasFlown(true);
        },
        () => {
          setCurrentPosition(defaultPosition);
          setHasFlown(true);
        }
      );
    } else if (!hasFlown) {
      setCurrentPosition(defaultPosition);
      setHasFlown(true);
    }
  }, [
    stations,
    selectedDepartureStationId,
    selectedDestinationStationId,
    hasFlown,
    defaultPosition,
  ]);

  const handleMarkerClick = async (stationId: string) => {
    if (!selectedDepartureStationId) {
      setSelectedDepartureStationId(stationId);

      try {
        const connections = await StationService.getStationConnections(
          stationId
        );
        setConnectedStations(connections);
      } catch (error) {
        console.error("Error fetching station connections: ", error);
      }
    } else if (stationId !== selectedDepartureStationId) {
      setSelectedDestinationStationId(stationId);
    }
  };

  const handleDeselect = () => {
    setSelectedDepartureStationId(null);
    setSelectedDestinationStationId(null);
    setConnectedStations([]);
  };

  return (
    <div
      className="w-full md:w-2/3 lg:w-1/2 mx-auto"
      style={{ position: "relative", border: "1px solid white" }}
    >
      <MapContainer
        center={currentPosition || defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        bounds={bounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          bounds={bounds}
        />

        {currentPosition && !hasFlown && (
          <FlyToPosition position={currentPosition} />
        )}

        {stations
          .filter((station) => station.coordinates)
          .filter((station) => {
            return (
              !selectedDepartureStationId ||
              connectedStations.some((conn) => conn._id === station._id) ||
              station._id === selectedDepartureStationId
            );
          })
          .map((station) => (
            <Marker
              key={station._id}
              position={station.coordinates as LatLngTuple}
              icon={
                station._id === selectedDepartureStationId
                  ? departureIcon
                  : station._id === selectedDestinationStationId
                  ? destinationIcon
                  : stationIcon
              }
              eventHandlers={{
                click: () => handleMarkerClick(station._id || ""),
              }}
            >
              {/* {!selectedDepartureStationId && <Popup>{station.name}</Popup>} */}
            </Marker>
          ))}
      </MapContainer>

      <div className="w-full absolute top-0 bg-white text-[#333] z-[1001]">
        <p>
          {selectedDepartureStationId
            ? "Odaberite odredišnu stanicu"
            : "Odaberite polaznu stanicu"}
        </p>
      </div>

      {selectedDepartureStationId && (
        <Button
          onClick={handleDeselect}
          color="primary"
          className="absolute bottom-2 right-2 z-[1001]"
        >
          Otkaži odabir
        </Button>
      )}
    </div>
  );
};

export default MapSelector;
