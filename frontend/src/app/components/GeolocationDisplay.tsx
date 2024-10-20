import { useReverseGeocoding } from "@/hooks/useReverseGeocoding";

export const GeolocationDisplay = () => {
  const { address, accuracy, isLoading, error } = useReverseGeocoding();
  if (isLoading) return <div>Loading Geolocation Data...</div>;
  if (address)
    return (
      <div className="m-4">
        <div>Vaša trenutna lokacija je:</div>
        <div>{address}</div>
        <AccuracyDisplay accuracy={accuracy} />
      </div>
    );
  return <div>Geolocation Error: {error?.message || "Unknown error"}</div>;
};

const AccuracyDisplay = ({ accuracy }: { accuracy: number | null }) => {
  if (accuracy === null) return null;
  return <div>Preciznost geolokacije: {accuracy} metara.</div>;
};
