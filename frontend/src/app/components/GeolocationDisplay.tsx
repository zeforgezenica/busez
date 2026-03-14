import { useReverseGeocoding } from "@/hooks/useReverseGeocoding";

export const GeolocationDisplay = () => {
  const { address, accuracy, isLoading, error } = useReverseGeocoding();
  
 if (isLoading) return (
  <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300 text-sm font-medium animate-pulse my-2">
    <div className="w-2 h-2 bg-blue-700 dark:bg-blue-300 rounded-full"></div>
    Učitavanje lokacije...
  </div>
);

  if (address)
    return (
      <div className="m-4 text-sm text-foreground">
        <div className="font-medium">Vaša trenutna lokacija je:</div>
        <div>{address}</div>
        <AccuracyDisplay accuracy={accuracy} />
      </div>
    );
  return <div className="text-sm text-red-700 dark:text-red-400">Geolocation Error: {error?.message || "Unknown error"}</div>;
};

const AccuracyDisplay = ({ accuracy }: { accuracy: number | null }) => {
  if (accuracy === null) return null;
  return <div className="text-muted-foreground">Preciznost geolokacije: {accuracy} metara.</div>;
};
