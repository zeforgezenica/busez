import { useGeolocation } from "@uidotdev/usehooks";

export const GeolocationDisplay = () => {
  const { latitude, longitude, accuracy, loading, error } = useGeolocation({
    enableHighAccuracy: true,
  });
  if (loading) return <div>Loading Geolocation Data...</div>;
  if (latitude && longitude)
    return (
      <div className="m-4">
        <div>Vaša trenutna lokacija je:</div>
        <div>
          Latitude: {latitude}, Longitude: {longitude}
        </div>
        <AccuracyDisplay accuracy={accuracy} />
      </div>
    );
  return <div>Geolocation Error: {error?.message || "Unknown error"}</div>;
};

const AccuracyDisplay = ({ accuracy }: { accuracy: number | null }) => {
  if (accuracy === null) return null;
  return <div>Preciznost geolokacije: {accuracy} metara.</div>;
};
