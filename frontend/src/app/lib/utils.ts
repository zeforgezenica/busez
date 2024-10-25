import Station from '@/models/station.model';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSortedStationsAlphabetically(stations:Station[]):Station[] {
  const rootStationName = 'Zenica "AS"'

  return stations.sort((a, b) => {
    if (a.name === rootStationName || b.name === rootStationName) return 1;
    return a.name.localeCompare(b.name);
  });
}