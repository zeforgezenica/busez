import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { StationTime } from '../models/route.model';
import Station from '../models/station.model';
import { isTimePast, getProgress } from '../handlers/route.progress.handler';

const Dot = styled('div')<{ isPast: boolean; isToday: boolean }>(
  ({ isPast, isToday }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: isPast && isToday ? 'var(--primary-blue)' : '#eee',
    marginInline: 'auto',
    marginTop: 'auto',
    marginBottom: '0px',
    zIndex: '100',
    position: 'relative',
  })
);

const DotContainer = styled('div')(({ theme }) => ({
  width: '20%',
  [theme.breakpoints.down('sm')]: {
    width: '15%',
  },
}));

const StopTime = styled('div')<{
  isPast: boolean;
  isToday: boolean;
  isArrivalOrDeparture: boolean;
}>(({ isPast, isToday, isArrivalOrDeparture, theme }) => ({
  width: '15%',
  textAlign: 'left',
  fontWeight: isArrivalOrDeparture ? 'bold' : 'normal',
  color: isArrivalOrDeparture
    ? 'var(--accent-orange)'
    : isPast && isToday
    ? 'var(--primary-blue)'
    : '#eee',
  [theme.breakpoints.down('sm')]: {
    width: '20%',
  },
}));

const StopName = styled('div')<{
  isPast: boolean;
  isToday: boolean;
  isArrivalOrDeparture: boolean;
}>(({ isPast, isToday, isArrivalOrDeparture }) => ({
  width: '65%',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: isArrivalOrDeparture
    ? 'var(--accent-orange)'
    : isPast && isToday
    ? 'var(--primary-blue)'
    : '#eee',
}));

interface StationStepProps {
  station: StationTime;
  index: number;
  filteredStations: StationTime[];
  currentTime: string;
  firstTime: string;
  lastTime: string;
  isToday: boolean | null;
  stationData: Station[];
  departureStationId: string | null;
  arrivalStationId: string | null;
}

const StationStep: React.FC<StationStepProps> = ({
  station,
  index,
  filteredStations,
  currentTime,
  firstTime,
  lastTime,
  isToday,
  stationData,
  departureStationId,
  arrivalStationId,
}) => {
  const progress = getProgress(
    index,
    filteredStations,
    currentTime,
    firstTime,
    lastTime,
    isToday ?? false
  );

  const stationName =
    stationData.find((s) => s._id === station.stationId)?.name ||
    'Unknown Station';
  const isDepartureOrArrival =
    station.stationId === departureStationId ||
    station.stationId === arrivalStationId;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0px',
        height: '48px',
      }}
    >
      {index === 0 ? (
        <>
          <DotContainer>
            <Dot
              style={{ bottom: '7px' }}
              isPast={isTimePast(
                station.time,
                currentTime,
                firstTime,
                lastTime
              )}
              isToday={isToday || false}
            />
          </DotContainer>
          <StopTime
            isPast={isTimePast(station.time, currentTime, firstTime, lastTime)}
            isToday={isToday || false}
            isArrivalOrDeparture={isDepartureOrArrival}
          >
            {station.time}
          </StopTime>
          <StopName
            isPast={isTimePast(station.time, currentTime, firstTime, lastTime)}
            isToday={isToday || false}
            isArrivalOrDeparture={isDepartureOrArrival}
          >
            {stationName}
          </StopName>
        </>
      ) : (
        <>
          <DotContainer>
            <div
              style={{
                height: '38px',
                width: '2px',
                marginInline: 'auto',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '-6px',
                overflow: 'hidden',
              }}
            >
              <LinearProgress
                variant='determinate'
                value={progress}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--primary-blue)',
                  },
                  transform: 'rotate(90deg)',
                  height: '2px',
                  width: '38px',
                  zIndex: 90,
                  margin: '0 -18px',
                }}
              />
            </div>

            <Dot
              style={{ bottom: '7px' }}
              isPast={isTimePast(
                station.time,
                currentTime,
                firstTime,
                lastTime
              )}
              isToday={isToday || false}
            />
          </DotContainer>
          <StopTime
            isPast={isTimePast(station.time, currentTime, firstTime, lastTime)}
            isToday={isToday || false}
            isArrivalOrDeparture={isDepartureOrArrival}
          >
            {station.time}
          </StopTime>
          <StopName
            isPast={isTimePast(station.time, currentTime, firstTime, lastTime)}
            isToday={isToday || false}
            isArrivalOrDeparture={isDepartureOrArrival}
          >
            {stationName}
          </StopName>
        </>
      )}
    </div>
  );
};

export default StationStep;
