'use client';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { RouteLap } from '../models/route.model';
import Station from '../models/station.model';
import RouteProgressStepper from './RouteProgressStepper';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    calculateETA();
  }, [currentTime, departureTime]);

  const getGrammaticalForm = (
    count: number,
    singular: string,
    few: string,
    plural: string
  ) => {
    const remainder = count % 10;
    const isTeens = count % 100 >= 11 && count % 100 <= 19;

    if (remainder === 1 && !isTeens) {
      return singular;
    } else if (remainder >= 2 && remainder <= 4 && !isTeens) {
      return few;
    } else {
      return plural;
    }
  };

  const calculateETA = () => {
    const current = dayjs();
    const currentFormatted = current.format('YYYY-MM-DD');
    const departure = dayjs(
      `${currentFormatted} ${departureTime}`,
      'YYYY-MM-DD HH:mm'
    );

    if (departure.isBefore(current)) {
      setEta('Vrijeme polaska je prošlo.');
      return null;
    } else {
      const totalSecondsDiff = departure.diff(current, 'second');
      const remainingMinutes = Math.floor(totalSecondsDiff / 60);

      const hours = Math.floor(totalSecondsDiff / 3600);
      const minutes = Math.floor((totalSecondsDiff % 3600) / 60);
      const seconds = totalSecondsDiff % 60;

      let etaString = '';

      if (hours > 0) {
        const hourForm = getGrammaticalForm(hours, 'sat', 'sata', 'sati');
        etaString += `${hours} ${hourForm} `;
      }
      if (minutes > 0 || hours > 0) {
        const minuteForm = getGrammaticalForm(
          minutes,
          'minuta',
          'minute',
          'minuta'
        );
        etaString += `${minutes} ${minuteForm} `;
      }
      if (hours === 0 && minutes < 60) {
        const secondForm = getGrammaticalForm(
          seconds,
          'sekunda',
          'sekunde',
          'sekundi'
        );
        etaString += `${seconds} ${secondForm}`;
      }

      setEta(`${etaString}`);
      return remainingMinutes;
    }
  };

  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);

  useEffect(() => {
    const minutes = calculateETA();
    setRemainingMinutes(minutes);
  }, [currentTime, departureTime]);

  const departureStation = stations.find(
    (station) => station._id === departureStationId
  );
  const arrivalStation = stations.find(
    (station) => station._id === arrivalStationId
  );

  const handleNavigate = () => {
    router.push(`/agency/${route.agencyId}`);
  };

  const modalBodyStyle: React.CSSProperties = {
    maxHeight: 'calc(100vh * 0.7)',
    overflowY: 'auto' as 'auto',
    marginTop: '0',
    padding: screenWidth <= 375 ? '0' : '16px',
  };

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

        <Modal backdrop='opaque' isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Detalji Linije
                </ModalHeader>
                <ModalBody style={modalBodyStyle}>
                  <RouteProgressStepper
                    stations={route.stations}
                    currentTime={currentTime}
                    departureStationId={departureStationId}
                    arrivalStationId={arrivalStationId}
                    isToday={isToday}
                  />
                </ModalBody>
                <ModalFooter
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {isToday && eta && (
                    <div style={{ color: 'var(--accent-orange)' }}>
                      <p>{eta}</p>
                    </div>
                  )}

                  <Button
                    variant='ghost'
                    onClick={onClose}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'rgba(255, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Zatvori
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
};

export default RouteSearchResult;
