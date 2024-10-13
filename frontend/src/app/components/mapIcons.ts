import { Icon } from "leaflet";

export const stationIcon = new Icon({
  iconUrl: "/target.png",
  iconSize: [16, 16],
  iconAnchor: [0, 0],
  popupAnchor: [8, 0],
});

export const departureIcon = new Icon({
  iconUrl: "/departureSelect.png",
  iconSize: [16, 16],
  iconAnchor: [0, 0],
  popupAnchor: [8, 0],
});

export const destinationIcon = new Icon({
  iconUrl: "/destinationSelect.png",
  iconSize: [32, 32],
  iconAnchor: [8, 26],
  popupAnchor: [8, 0],
});
