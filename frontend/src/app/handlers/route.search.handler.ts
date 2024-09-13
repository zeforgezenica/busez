export const handleFilterClick = (
  selectedDepartureStation: string | null,
  selectedArrivalStation: string | null,
  onFilter: () => void,
  setError: (error: string | null) => void
) => {
  if (!selectedDepartureStation || !selectedArrivalStation) {
    setError("Please select both departure and arrival stations.");
    return;
  }

  if (selectedDepartureStation === selectedArrivalStation) {
    setError("Please select different departure and arrival stations.");
    return;
  }

  setError(null);
  onFilter();
};

export const handleSwapStations = (
  selectedDepartureStation: string | null,
  selectedArrivalStation: string | null,
  setSelectedDepartureStation: (stationId: string | null) => void,
  setSelectedArrivalStation: (stationId: string | null) => void
) => {
  const tempDeparture = selectedDepartureStation;
  const tempArrival = selectedArrivalStation;
  setSelectedDepartureStation(tempArrival);
  setSelectedArrivalStation(tempDeparture);
};
