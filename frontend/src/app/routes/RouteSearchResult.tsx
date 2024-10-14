'use client';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { RouteLap } from '../models/route.model';
import Station from '../models/station.model';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculateETA, getGrammaticalForm } from '@/lib/timeUtils';
import RouteDetailsModal from '@/components/RouteDetailsModal';

interface RouteSearchResultProps {
  route: RouteLap;
  agencyName: string;
  departureStationId: string | null;
  arrivalStationId: string | null;
  departureTime: string;
  arrivalTime: string;
  deltaTime: number;
  stations: Station[];
  isToday: boolean | null;
}

const RouteSearchResult: React.FC<RouteSearchResultProps> = ({
  route,
  agencyName,
  departureStationId,
  arrivalStationId,
  departureTime,
  arrivalTime,
  deltaTime,
  stations,
  isToday: initialIsToday,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'));
  const [isToday, setIsToday] = useState<boolean | null>(initialIsToday);
  const [eta, setEta] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsToday(initialIsToday);
  }, [initialIsToday]);

  useEffect(() => {
    setRemainingMinutes(calculateETA(currentTime, departureTime, setEta));
  }, [currentTime, departureTime]);

  const departureStation = stations.find(
    (station) => station._id === departureStationId
  );
  const arrivalStation = stations.find(
    (station) => station._id === arrivalStationId
  );

  const handleNavigate = () => router.push(`/agency/${route.agencyId}`);

  const etaColor =
    remainingMinutes !== null
      ? remainingMinutes > 9
        ? 'var(--calm-green)'
        : remainingMinutes > 3
        ? 'var(--accent-orange)'
        : 'var(--warning-red)'
      : 'inherit';

  return (
    <Card className='p-6 mb-4 w-full md:w-2/3 lg:w-1/2 mx-auto'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl mb-2 font-semibold'>{route.name}</h2>
        <Button
          variant='link'
          className='text-blue-400 underline'
          onClick={handleNavigate}
        >
          {agencyName}
        </Button>
        <h3>
          {departureStation?.name || 'Nepoznata polazna stanica'}:{' '}
          {departureTime}
          <ArrowRightAltIcon />
          {arrivalStation?.name || 'Nepoznata odredišna stanica'}: {arrivalTime}
        </h3>
        <p>
          Trajanje: {deltaTime}{' '}
          {getGrammaticalForm(deltaTime, 'minuta', 'minute', 'minuta')}
        </p>
        {isToday && eta && (
          <p style={{ color: etaColor }}>Preostalo vrijeme: {eta}</p>
        )}
        <Button onClick={onOpen}>Pogledaj detaljnije</Button>
        <RouteDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          route={route}
          currentTime={currentTime}
          departureStationId={departureStationId}
          arrivalStationId={arrivalStationId}
          isToday={isToday}
          eta={eta}
          screenWidth={screenWidth}
        />
      </div>
    </Card>
  );
};

export default RouteSearchResult;
