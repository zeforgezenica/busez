export const handleFilterClick = (
  selectedDepartureStation: string | null,
  selectedArrivalStation: string | null,
  onFilter: () => void,
  setError: (error: string | null) => void
) => {
  if (!selectedDepartureStation || !selectedArrivalStation) {
    setError("Molimo odaberite i polaznu i dolaznu stanicu.");
    return;
  }

  if (selectedDepartureStation === selectedArrivalStation) {
    setError("Molimo odaberite različite stanice polaska i dolaska.");
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
