import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";
import { LatLngExpression } from "leaflet";

declare let L: any;

interface Location {
  name: string;
  coordinates: [number, number];
}

interface MapProps {
  coordinates: LatLngExpression;
  zoom: number;
  scrollWheelZoom: boolean;
  locations: Location[];
  route?: boolean;
}

const RoutingControl: React.FC<{
  waypoints: { latLng: LatLngExpression; name: string }[];
}> = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (waypoints.length >= 2) {
      const routeControl = L.Routing.control({
        waypoints: waypoints.map((waypoint) => waypoint.latLng),
        lineOptions: {
          styles: [{ color: "red", weight: 4 }],
        },
        show: true,
        addWaypoints: true,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: (i: number, waypoint: any) => {
          const marker = L.marker(waypoint.latLng).bindPopup(waypoints[i].name);
          return marker;
        },
      });

      routeControl.addTo(map);

      return () => {
        map.removeControl(routeControl);
      };
    }
  }, [map, waypoints]);

  return null;
};

const Map: React.FC<MapProps> = ({
  coordinates,
  zoom,
  scrollWheelZoom,
  locations,
  route = false,
}) => {
  const validStations = locations.filter(
    (location) => location && location.coordinates
  );
  const waypoints = validStations.map((location) => ({
    latLng: location.coordinates,
    name: location.name,
  }));

  return (
    <MapContainer
      center={coordinates}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!route &&
        validStations.map((station, idx) => (
          <CircleMarker
            key={idx}
            center={station.coordinates}
            radius={7}
            weight={2}
            fillColor="#89e321"
            fillOpacity={1}
          >
            <Popup>{station.name}</Popup>
          </CircleMarker>
        ))}
      {route && <RoutingControl waypoints={waypoints} />}
    </MapContainer>
  );
};

export default Map;
