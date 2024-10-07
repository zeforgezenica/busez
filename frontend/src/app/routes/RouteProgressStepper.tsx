import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { StationTime } from "../models/route.model";
import stationService from "../services/station.service";
import Station from "../models/station.model";
import { isTimePast, getProgress } from "../handlers/route.progress.handler";

const Dot = styled("div")<{ isPast: boolean; isToday: boolean }>(
  ({ isPast, isToday }) => ({
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: isPast && isToday ? "var(--primary-blue)" : "#eee",
    marginInline: "auto",
    marginTop: "auto",
    marginBottom: "0px",
    zIndex: "100",
    position: "relative",
  })
);

const DotContainer = styled("div")(({ theme }) => ({
  width: "20%",
  [theme.breakpoints.down("sm")]: {
    width: "15%",
  },
}));

const StopTime = styled("div")<{
  isPast: boolean;
  isToday: boolean;
  isArrivalOrDeparture: boolean;
}>(({ isPast, isToday, isArrivalOrDeparture, theme }) => ({
  width: "15%",
  textAlign: "left",
  fontWeight: isArrivalOrDeparture ? "bold" : "normal",
  color: isArrivalOrDeparture
    ? "var(--accent-orange)"
    : isPast && isToday
    ? "var(--primary-blue)"
    : "#eee",
  [theme.breakpoints.down("sm")]: {
    width: "20%",
  },
}));

const StopName = styled("div")<{
  isPast: boolean;
  isToday: boolean;
  isArrivalOrDeparture: boolean;
}>(({ isPast, isToday, isArrivalOrDeparture }) => ({
  width: "65%",
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: isArrivalOrDeparture
    ? "var(--accent-orange)"
    : isPast && isToday
    ? "var(--primary-blue)"
    : "#eee",
}));

interface RouteProgressStepperProps {
  stations: StationTime[];
  currentTime: string;
  departureStationId: string | null;
  arrivalStationId: string | null;
  isToday: boolean | null;
}

const RouteProgressStepper: React.FC<RouteProgressStepperProps> = ({
  stations,
  currentTime,
  departureStationId,
  arrivalStationId,
  isToday,
}) => {
  const [stationData, setStationData] = React.useState<Station[]>([]);

  React.useEffect(() => {
    const fetchStations = async () => {
      const ids = stations.map((station) => station.stationId);
      const fetchedStations = await stationService.getStationsByIds(ids);
      setStationData(fetchedStations);
    };

    fetchStations();
  }, [stations]);

  const filteredStations = stations.filter((station) => station.time !== "*");

  const firstTime = filteredStations[0]?.time;
  const lastTime = filteredStations[filteredStations.length - 1]?.time;

  return (
    <div
      className="p-6 mb-4"
      style={{
        padding: "0px",
        maxWidth: "420px",
        margin: "0",
      }}
    >
      {filteredStations.map((station, index) => {
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
          "Unknown Station";
        const isDepartureOrArrival =
          station.stationId === departureStationId ||
          station.stationId === arrivalStationId;

        return (
          <div
            key={station.stationId}
            style={{
              display: "flex",
              alignItems: "flex-end",
              padding: "0px",
              height: "48px",
            }}
          >
            {index === 0 ? (
              <>
                <DotContainer>
                  <Dot
                    style={{ bottom: "7px" }}
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
                  isPast={isTimePast(
                    station.time,
                    currentTime,
                    firstTime,
                    lastTime
                  )}
                  isToday={isToday || false}
                  isArrivalOrDeparture={isDepartureOrArrival}
                >
                  {station.time}
                </StopTime>
                <StopName
                  isPast={isTimePast(
                    station.time,
                    currentTime,
                    firstTime,
                    lastTime
                  )}
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
                      height: "38px",
                      width: "2px",
                      marginInline: "auto",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      top: "-6px",
                      overflow: "hidden",
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "var(--primary-blue)",
                        },
                        transform: "rotate(90deg)",
                        height: "2px",
                        width: "38px",
                        zIndex: 90,
                        margin: "0 -18px",
                      }}
                    />
                  </div>

                  <Dot
                    style={{ bottom: "7px" }}
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
                  isPast={isTimePast(
                    station.time,
                    currentTime,
                    firstTime,
                    lastTime
                  )}
                  isToday={isToday || false}
                  isArrivalOrDeparture={isDepartureOrArrival}
                >
                  {station.time}
                </StopTime>
                <StopName
                  isPast={isTimePast(
                    station.time,
                    currentTime,
                    firstTime,
                    lastTime
                  )}
                  isToday={isToday || false}
                  isArrivalOrDeparture={isDepartureOrArrival}
                >
                  {stationName}
                </StopName>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RouteProgressStepper;
