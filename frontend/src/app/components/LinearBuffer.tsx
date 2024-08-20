import * as React from "react";
import { Card } from "@nextui-org/react";
import { styled } from "@mui/material/styles";
import { StationTimes } from "../models/route.model";
import stationServiceInstance from "../services/station.service";
import Station from "../models/station.model";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// Function to convert time string to minutes since midnight (ignoring seconds)
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Function to check if a time is past the current time (ignoring seconds)
const isTimePast = (
  departureTime: string,
  currentTime: string,
  firstTime: string,
  lastTime: string
): boolean => {
  const departureMinutes = timeToMinutes(departureTime);
  const currentMinutes = timeToMinutes(currentTime);
  const firstMinutes = timeToMinutes(firstTime);
  const lastMinutes = timeToMinutes(lastTime);

  // Case 1: The route does not span midnight
  if (firstMinutes <= lastMinutes) {
    return currentMinutes >= departureMinutes;
  }

  // Case 2: The route spans midnight
  if (currentMinutes >= firstMinutes || currentMinutes <= lastMinutes) {
    // If the current time is after the first station's time or before the last station's time (past midnight)
    return currentMinutes >= departureMinutes;
  }

  // If the current time is before the first station and after the last station
  return false;
};

const Dot = styled("div")<{ isPast: boolean }>(({ isPast }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: isPast ? "#3f51b5" : "#eee", // Blue if past, gray otherwise
  margin: "0 auto",
}));

interface LinearBufferProps {
  stations: StationTimes[];
  currentTime: string;
}

const LinearBuffer: React.FC<LinearBufferProps> = ({
  stations,
  currentTime,
}) => {
  const [stationData, setStationData] = React.useState<Station[]>([]);

  React.useEffect(() => {
    const fetchStations = async () => {
      const ids = stations.map((station) => station.stationId);
      const fetchedStations = await stationServiceInstance.getStationsByIds(
        ids
      );
      setStationData(fetchedStations);
    };

    fetchStations();
  }, [stations]);

  // Filter out stations with departure time "*"
  const filteredStations = stations.filter(
    (station) => station.departureTime[0] !== "*"
  );

  const firstTime = filteredStations[0]?.departureTime[0];
  const lastTime =
    filteredStations[filteredStations.length - 1]?.departureTime[0];

  // Function to convert time string to seconds since midnight
  const timeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    // If seconds are not provided, default to 0
    const totalSeconds = hours * 3600 + minutes * 60 + (seconds || 0);

    return totalSeconds;
  };

  // Function to calculate the difference in seconds between two times, considering midnight crossover
  const getDeltaTime = (startTime: string, endTime: string): number => {
    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);

    // If the end time is after or equal to the start time (no midnight crossover)
    if (endSeconds >= startSeconds) {
      return endSeconds - startSeconds;
    }

    // If the end time is before the start time (midnight crossover)
    // Add 86400 seconds (24 hours) to endSeconds to calculate the correct delta
    return endSeconds + 86400 - startSeconds;
  };

  // Determine the progress for each buffer
  const getProgress = (index: number): number => {
    const currentBufferTime = filteredStations[index].departureTime[0];
    const nextBufferTime =
      index < filteredStations.length - 1
        ? filteredStations[index + 1].departureTime[0]
        : null;

    // Track if the current buffer is full
    const isCurrentBufferFull = nextBufferTime
      ? isTimePast(nextBufferTime, currentTime, firstTime, lastTime)
      : false;

    // Track the previous buffer's status
    const wasPreviousBufferFull =
      index > 0
        ? isTimePast(
            filteredStations[index].departureTime[0],
            currentTime,
            firstTime,
            lastTime
          )
        : false;

    // Log details if this is the first non-past buffer after past ones
    if (wasPreviousBufferFull && !isCurrentBufferFull) {
      console.log(`Buffer reached at index: ${index}`);
      console.log(
        `Time above (current): ${filteredStations[index - 1].departureTime[0]}`
      );
      console.log(
        `Time below (next): ${filteredStations[index].departureTime[0]}`
      );
      console.log(`Current time: ${currentTime}`);
    }

    return isCurrentBufferFull ? 100 : 0;
  };

  return (
    <Card
      shadow="sm"
      className="p-6 mb-4"
      style={{
        padding: "0",
        maxWidth: "420px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {filteredStations.map((station, index) => (
        <React.Fragment key={station.stationId}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "25%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dot
                isPast={isTimePast(
                  station.departureTime[0],
                  currentTime,
                  firstTime,
                  lastTime
                )}
              />
            </div>
            <div
              style={{ width: "75%", paddingLeft: "10px", textAlign: "left" }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: "20%", fontWeight: "bold" }}>
                  {station.departureTime[0]}
                </div>
                <div style={{ width: "80%" }}>
                  {stationData.find((s) => s._id === station.stationId)?.name ||
                    "Unknown Station"}
                </div>
              </div>
            </div>
          </div>
          {index < filteredStations.length - 1 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 2,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    transform: "rotate(90deg)",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={getProgress(index)}
                  />
                </Box>
              </div>
              <div style={{ width: "75%" }}></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default LinearBuffer;
