"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, Icon } from "leaflet";
import Station from "../models/station.model";

interface MapComponentProps {
  stations: Station[];
}

const MapComponent: React.FC<MapComponentProps> = ({ stations }) => {
  const defaultPosition: LatLngTuple =
    stations.length > 0 && stations[0].coordinates
      ? (stations[0].coordinates as LatLngTuple)
      : [51.505, -0.09];

  const targetIcon = new Icon({
    iconUrl: "/target.png",
    iconSize: [16, 16],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations
        .filter((station) => station.coordinates)
        .map((station) => (
          <Marker
            key={station._id}
            position={station.coordinates as LatLngTuple}
            icon={targetIcon}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
