import React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  CounterClockwiseClockIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Station } from '../models/station.model';

interface StationSelectProps {
  stations: Station[];
  selectedStation: string | null;
  setSelectedStation: (stationId: string | null) => void;
  placeholder: string;
  history: string[];
}

const StationSelect: React.FC<StationSelectProps> = ({
  stations,
  selectedStation,
  setSelectedStation,
  placeholder,
  history,
}) => {
  const [open, setOpen] = React.useState(false);

  const onStationSelect = (comboBoxSelection: Station) => {
    setOpen(false);
    const callbackValue = comboBoxSelection._id ? comboBoxSelection._id : null;
    setSelectedStation(callbackValue);
  };

  const stationsHistory = history
    .map((stationId) => stations.find((station) => station._id === stationId))
    .filter((station) => !!station && station._id !== selectedStation)
    .reverse() as Station[];
  const stationsNotInHistory = stations.filter(
    (station) => station._id && !stationsHistory.includes(station)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          <span className={selectedStation ? 'notranslate' : ''} translate={selectedStation ? 'no' : 'yes'} lang={selectedStation ? 'bs' : 'bs'}>
            {selectedStation
              ? stations.find((station) => station._id === selectedStation)?.name
              : placeholder}
          </span>
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[240px] p-0'>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{placeholder}</CommandEmpty>
            <HistoryCommandGroup
              stations={stationsHistory}
              onStationSelect={onStationSelect}
            />
            <CommandGroup>
              {stationsNotInHistory.map((station) => (
                <CommandItem
                  key={station._id}
                  value={station.name}
                  onSelect={() => onStationSelect(station)}
                >
                  <span className='notranslate' translate='no' lang='bs'>{station.name}</span>
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedStation === station._id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const HistoryCommandGroup = ({
  stations,
  onStationSelect,
}: {
  stations: Station[];
  onStationSelect: (comboBoxSelection: Station) => void;
}) => {
  if (stations.length === 0) return null;
  return (
    <CommandGroup className={'border-b-3'}>
      <p className={'select-none text-sm px-2 py-1.5 flex gap-2 items-center'}>
        <CounterClockwiseClockIcon />
        Prošle pretrage
      </p>
      {stations.map((station) => (
        <CommandItem
          key={station._id}
          value={station.name}
          onSelect={() => onStationSelect(station)}
        >
          <span className='notranslate' translate='no' lang='bs'>{station.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default StationSelect;
