import React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
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
}

const StationSelect: React.FC<StationSelectProps> = ({
  stations,
  selectedStation,
  setSelectedStation,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);

  const onStationSelect = (comboBoxSelection: Station) => {
    setOpen(false);
    const callbackValue = comboBoxSelection._id ? comboBoxSelection._id : null;
    setSelectedStation(callbackValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {selectedStation
            ? stations.find((station) => station._id === selectedStation)?.name
            : placeholder}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[240px] p-0'>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{placeholder}</CommandEmpty>
            <CommandGroup>
              {stations.map((station) => (
                <CommandItem
                  key={station._id}
                  value={station.name}
                  onSelect={() => onStationSelect(station)}
                >
                  {station.name}
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

export default StationSelect;
