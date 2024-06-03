// src/components/Map.tsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";
import { LatLngExpression } from "leaflet";

declare let L: {
  [x: string]: any;
  Routing: {
    control: (options: {
      waypoints: LatLngExpression[];
      lineOptions: { styles: { color: string; weight: number }[] };
      show: boolean;
      addWaypoints: boolean;
      routeWhileDragging: boolean;
      draggableWaypoints: boolean;
      fitSelectedRoutes: boolean;
      showAlternatives: boolean;
      createMarker?: (i: number, waypoint: any, n: number) => any;
    }) => any;
  };
  latLng: (lat: number, lng: number) => LatLngExpression;
};


interface MapProps {
  coordinates: LatLngExpression;
  zoom: number;
  scrollWheelZoom: boolean;
  locations: any[];
  route?: boolean;
}

const RoutingControl = ({ waypoints }: { waypoints: { latLng: LatLngExpression; name: string }[] }) => {
  const map = useMap();

  useEffect(() => {
    if (waypoints.length >= 2) {
      const filteredWaypoints = waypoints.map(wp => wp.latLng);
      const routeControl = L.Routing.control({
        waypoints: filteredWaypoints,
        lineOptions: {
          styles: [{ color: "red", weight: 4 }],
        },
        show: true,
        addWaypoints: true,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: (i, waypoint, n) => {
          const marker = L.marker(waypoint.latLng).bindPopup(waypoints[i].name);
          return marker;
        }
      });

      routeControl.addTo(map);

      //TODO: Throws error on map if this line is active (map and app still works normal) - so need to investigate if this is required or not
      // return () => {
      //   map.removeControl(routeControl);
      // };
    }
  }, [map, waypoints]);

  return null;
};

const Map: React.FC<MapProps> = ({ coordinates, zoom, scrollWheelZoom, locations, route = false }) => {
  (locations == undefined) ? locations = [] : null;
  const validStations = locations.filter(location => !!location?.coordinates);
  const waypoints = validStations.map(location => ({
    latLng: L.latLng(location.coordinates[0], location.coordinates[1]),
    name: location.name
  }));
  return (
    <MapContainer center={coordinates} zoom={zoom} scrollWheelZoom={scrollWheelZoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!route && validStations.map((station, idx) => (
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
