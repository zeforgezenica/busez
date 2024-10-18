import { useGeolocation } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export const useReverseGeocoding = () => {
  const {
    latitude: lat,
    longitude: lon,
    accuracy,
    loading,
    error,
  } = useGeolocation();

  const [isReverseGeocodingLoading, setIsReverseGeocodingLoading] =
    useState<boolean>(true);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const isLoading = loading || isReverseGeocodingLoading;

  useEffect(() => {
    if (!lat || !lon) return;
    fetchReverseGeocoding({ lat, lon }).then((data) => {
      setAddress(parseGeocodeJSONAddress(data));
      setIsReverseGeocodingLoading(false);
    });
  }, [lat, lon]);

  return {
    address,
    lat,
    lon,
    accuracy,
    isLoading,
    error,
  };
};

async function fetchReverseGeocoding({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`
  );
  const responseJson = await response.json();
  return responseJson;
}

function parseGeocodeJSONAddress(json: any) {
  const { road, house_number, postcode, city, country } =
    json.features[0].properties.address;
  return [road, house_number, postcode, city, country].join(" ");
}
