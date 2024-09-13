/**
 * Converts a time string (HH:mm) to minutes.
 * @param time - The time string in "HH:mm" format.
 * @returns The total minutes.
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Determines if a given time has passed the current time, accounting for day transitions.
 * @param departureTime - The time of departure in "HH:mm" format.
 * @param currentTime - The current time in "HH:mm" format.
 * @param firstTime - The first time in "HH:mm" format.
 * @param lastTime - The last time in "HH:mm" format.
 * @returns True if the departure time has passed, false otherwise.
 */
export const isTimePast = (
  departureTime: string,
  currentTime: string,
  firstTime: string,
  lastTime: string
): boolean => {
  const departureMinutes = timeToMinutes(departureTime);
  const currentMinutes = timeToMinutes(currentTime);
  const firstMinutes = timeToMinutes(firstTime);
  const lastMinutes = timeToMinutes(lastTime);

  if (firstMinutes <= lastMinutes) {
    return currentMinutes >= departureMinutes;
  }

  if (currentMinutes >= firstMinutes || currentMinutes <= lastMinutes) {
    return currentMinutes >= departureMinutes;
  }

  return false;
};

/**
 * Converts a time string (HH:mm:ss) to seconds.
 * @param time - The time string in "HH:mm:ss" format.
 * @returns The total seconds.
 */
export const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};

/**
 * Calculates the difference in seconds between two times, accounting for day transitions.
 * @param startTime - The start time in "HH:mm:ss" format.
 * @param endTime - The end time in "HH:mm:ss" format.
 * @returns The difference in seconds.
 */
export const getDeltaTime = (startTime: string, endTime: string): number => {
  const startSeconds = timeToSeconds(startTime);
  const endSeconds = timeToSeconds(endTime);

  if (endSeconds >= startSeconds) {
    return endSeconds - startSeconds;
  }

  // Handles transition between days
  return endSeconds + 86400 - startSeconds;
};

/**
 * Calculates the progress for the current buffer based on the current time and station times.
 * @param index - The index of the station.
 * @param filteredStations - The filtered list of stations.
 * @param currentTime - The current time in "HH:mm:ss" format.
 * @param firstTime - The first station's time.
 * @param lastTime - The last station's time.
 * @param isToday - A boolean indicating if it is today.
 * @returns The progress as a percentage between 0 and 100.
 */
export const getProgress = (
  index: number,
  filteredStations: { time: string }[],
  currentTime: string,
  firstTime: string,
  lastTime: string,
  isToday: boolean
): number => {
  if (!isToday) {
    return 0;
  }

  const currentBufferTime = filteredStations[index].time;
  const nextBufferTime =
    index < filteredStations.length - 1
      ? filteredStations[index + 1].time
      : null;
  const previousBufferTime =
    index > 0 ? filteredStations[index - 1].time : null;

  const isCurrentBufferFull = nextBufferTime
    ? isTimePast(nextBufferTime, currentTime, firstTime, lastTime)
    : false;

  const wasPreviousBufferFull =
    index > 0
      ? isTimePast(
          filteredStations[index - 1].time,
          currentTime,
          firstTime,
          lastTime
        )
      : false;

  let progress = 0;

  if (wasPreviousBufferFull && !isCurrentBufferFull && previousBufferTime) {
    const deltaTimeAboveCurrent = getDeltaTime(previousBufferTime, currentTime);
    const deltaTimeAboveBelow = getDeltaTime(
      previousBufferTime,
      currentBufferTime
    );
    progress = Math.min(
      Math.max((deltaTimeAboveCurrent / deltaTimeAboveBelow) * 100, 0),
      100
    );
  } else if (isCurrentBufferFull) {
    progress = 100;
  }

  return progress;
};
