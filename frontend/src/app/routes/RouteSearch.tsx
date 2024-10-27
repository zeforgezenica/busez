import React, { useState, useEffect, useCallback } from 'react';
import SwapIcon from '@mui/icons-material/SwapHoriz';
import Notification from '@/components/ui/Notification';
import { Station } from '../models/station.model';
import {
    handleFilterClick,
    handleSwapStations,
} from '../handlers/route.search.handler';
import dayjs from 'dayjs';
import StationSelect from '@/components/StationSelect';
import DateSelector from '@/components/DateSelector';
import MapSelector from '../components/MapSelector';

interface RouteSearchProps {
    stations: Station[];
    selectedDepartureStation: string | null;
    setSelectedDepartureStation: (stationId: string | null) => void;
    selectedArrivalStation: string | null;
    setSelectedArrivalStation: (stationId: string | null) => void;
    dateOfDeparture: dayjs.Dayjs | null;
    onDateChange: (date: dayjs.Dayjs | null) => void;
    onFilter: () => void;
}

const RouteSearch: React.FC<RouteSearchProps> = ({
    stations,
    selectedDepartureStation,
    selectedArrivalStation,
    setSelectedDepartureStation,
    setSelectedArrivalStation,
    dateOfDeparture,
    onDateChange,
    onFilter,
}) => {
    const [error, setError] = useState<string | null>(null);

    // Initialize dateOfDeparture to today's date if null
    useEffect(() => {
        if (!dateOfDeparture) {
            onDateChange(dayjs());
        }
    }, [dateOfDeparture, onDateChange]);

    // Debounced handleFilterClick function to prevent excessive calls
    const debouncedFilterClick = useCallback(() => {
        const timeout = setTimeout(() => {
            handleFilterClick(
                selectedDepartureStation,
                selectedArrivalStation,
                onFilter,
                setError
            );
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(timeout);
    }, [selectedDepartureStation, selectedArrivalStation, onFilter]);

    // Call debounced function whenever selectedDepartureStation or selectedArrivalStation changes
    useEffect(() => {
        debouncedFilterClick();
    }, [debouncedFilterClick]);

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        onDateChange(date);
        handleFilterClick(
            selectedDepartureStation,
            selectedArrivalStation,
            onFilter,
            setError
        );
    };

    return (
        <>
            {/* TODO: Uncomment and use MapSelector once station coordinates are gathered */}
            {/* <MapSelector
        stations={stations}
        setSelectedDepartureStationId={setSelectedDepartureStation}
        setSelectedDestinationStationId={setSelectedArrivalStation}
        selectedDepartureStationId={selectedDepartureStation}
        selectedDestinationStationId={selectedArrivalStation}
      /> */}
            <div>
                <h2 className="text-left my-5">
                    <div className="flex flex-col sm:flex-row align-center items-center justify-start">
                        <StationSelect
                            stations={stations}
                            selectedStation={selectedDepartureStation}
                            setSelectedStation={setSelectedDepartureStation}
                            placeholder="Odaberite Stanicu Polaska"
                        />
                        <button
                            className='my-5'
                            onClick={() => {
                                handleSwapStations(
                                    selectedDepartureStation,
                                    selectedArrivalStation,
                                    setSelectedDepartureStation,
                                    setSelectedArrivalStation
                                );
                                handleFilterClick(
                                    selectedDepartureStation,
                                    selectedArrivalStation,
                                    onFilter,
                                    setError
                                );
                            }}
                        >
                            <SwapIcon className="mx-3 hover:text-indigo-400" />
                        </button>
                        <StationSelect
                            stations={stations}
                            selectedStation={selectedArrivalStation}
                            setSelectedStation={setSelectedArrivalStation}
                            placeholder="Odaberite Stanicu Dolaska"
                        />
                    </div>
                </h2>
            </div>
            <div className='w-full flex flex-col sm:flex-row space-y-4 my-10'>
                <div className=''>
                    <DateSelector
                        dateOfDeparture={dateOfDeparture}
                        onDateChange={handleDateChange} // Use the updated handler
                    />
                </div>
                {error && (
                    <Notification message={error} color="red" />
                )}
            </div>
        </>
    );
};

export default RouteSearch;