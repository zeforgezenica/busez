import { Route, RouteLap, StationTime } from "@/models/route.model";
import { Week, Weekdays } from "@/models/weekdays.model";
import dayjs from "dayjs";

/**
 * Helper function, gets the time in minutes from a StationTime object matching a given station id.
 */
function getDepartureTimeForStation(
    stations: StationTime[],
    stationId: string
): number {
    const station = stations.find((st) => st.stationId === stationId);
    const timeString = station ? station.time : "00:00";
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
};

/**
 * Builds RouteLap array from a Route array that is first filtered for the correct stations and departure date.
 */
function getFilteredRouteLaps(allRoutes: Route[], srcStationId: string, destStationId: string, departDate: number){
    
    const stationIndexMap = buildStationIndexMap(srcStationId, destStationId);
    const isActiveDayFilter = buildIsActiveDayFilter(departDate);

    const filterResult = allRoutes.map(stationIndexMap)
    .filter(validStationIndexFilter)
    .filter(isActiveDayFilter)
    .flatMap(buildRouteLapArray);
    return filterResult;
}

/**
 * Generates a map function to note the match within a Route of a given departure station and arrival station.
 * If there is no match, -1 is applied: remove these by filtering with validStationIndexFilter on the map result.
 */
function buildStationIndexMap(srcStationId: string, destStationId: string){
    return (route: Route) => {
        const srcStationIndex = route.stations.findIndex(
            (station) => station.stationId === srcStationId
          );
          const destStationIndex = route.stations.findIndex(
            (station) => station.stationId === destStationId
          );
          return {
            route,
            srcStationIndex,
            destStationIndex
          }
    }
}

/**
 * Filter function (not a filter generator) to filter out route search results missing one or both of the required stations.
 */
function validStationIndexFilter(
    res: {
        route: Route,
        srcStationIndex: number,
        destStationIndex: number
    }){
        return res.srcStationIndex !== -1 && res.destStationIndex !== -1;
}

/**
 * Generates a filter function to filter out route search results where the route is not active on a given day.
 */
function buildIsActiveDayFilter(departureDate: number){
    const departureDayIndex =
    departureDate !== null
        ? departureDate
        : (new Date().getDay() + 6) % 7;
    const departureDay = Week[departureDayIndex];
    return (res: {
        route: Route,
        srcStationIndex: number,
        destStationIndex: number
    }) => {
        const isBusReturning = res.destStationIndex < res.srcStationIndex;
        const activityDays = isBusReturning ? res.route.returnDays : res.route.activeDays;
        return activityDays?.[departureDay as keyof Weekdays] ?? false;
    }    
}

/**
 * FlatMap function (not a generator) that constructs a RouteLap array from a previously filtered Route array.
 */
function buildRouteLapArray(
    res: {
      route: Route,
      srcStationIndex: number,
      destStationIndex: number
    }): RouteLap[] {
    const route = res.route;
    const departureStationIndex = res.srcStationIndex;
    const arrivalStationIndex = res.destStationIndex;
    const isReversedOrder = arrivalStationIndex < departureStationIndex;
  
    const times = isReversedOrder
      ? route.stations[arrivalStationIndex]?.returnTime || []
      : route.stations[departureStationIndex]?.departureTime || [];
  
    const validTimes = times.filter((time) => time !== "*");
  
    if (validTimes.length === 0) {
      return [];
    }
  
    return validTimes
      .map((time, index) => {
        const departureTime = isReversedOrder
          ? route.stations[arrivalStationIndex]?.returnTime?.[index] || ""
          : route.stations[departureStationIndex]?.departureTime?.[index] ||
            "";
        const arrivalTime = isReversedOrder
          ? route.stations[departureStationIndex]?.returnTime?.[index] || ""
          : route.stations[arrivalStationIndex]?.departureTime?.[index] || "";
  
        if (departureTime === "*" || arrivalTime === "*") {
          return null;
        }
  
        const stationsWithTimes: StationTime[] = route.stations.reduce(
          (acc: StationTime[], station, i) => {
            const stationTime: StationTime = {
              stationId: station.stationId,
              time: isReversedOrder
                ? station.returnTime[index] || ""
                : station.departureTime[index] || "",
            };
  
            if (isReversedOrder) {
              acc.unshift(stationTime);
            } else {
              acc.push(stationTime);
            }
  
            return acc;
          },
          []
        );
  
        return {
          _id: route._id,
          agencyId: route.agencyId,
          name: route.name,
          type: route.type,
          activeDays: route.activeDays,
          returnDays: route.returnDays,
          stations: stationsWithTimes,
          duration: route.duration,
          departureTime,
        };
      })
      .filter((result) => result !== null) as RouteLap[];
}

/**
 * Separates a given RouteLap array into two sorted arrays, one for the search results and the other to show past departures.
 * If the departure date is not today, "past departures" will be an empty array.
 */
function dividePastAndCurrentRouteLaps(routeLaps: RouteLap[], departureStationId: string, isTodayDeparture: boolean) {
    const routeLapSorter = buildRouteLapSorter(departureStationId);
    if(isTodayDeparture){
        const dividePastAndFutureRoutes = buildRouteLapReducerNow(departureStationId);
        const reducerInit = { futureRoutes: [] as RouteLap[], pastRoutes: [] as RouteLap[] };
        const { futureRoutes, pastRoutes } = routeLaps.reduce(dividePastAndFutureRoutes, reducerInit);
        const sortedResults = futureRoutes.sort(routeLapSorter);
        const sortedPastDepartures = pastRoutes.sort(routeLapSorter);
        return { sortedResults, sortedPastDepartures };
    }
    const sortedResults = routeLaps.sort(routeLapSorter);
    return { sortedResults, sortedPastDepartures: [] as RouteLap[] };
}

/**
 * Generates a sort function to order RouteLap search results for a given departure station.
 */
function buildRouteLapSorter(departureStationId: string){
    return (a: RouteLap, b: RouteLap) => {
      const minutesA = getDepartureTimeForStation(
        a.stations,
        departureStationId
      );
      const minutesB = getDepartureTimeForStation(
        b.stations,
        departureStationId
      );
      return minutesA - minutesB;
    }
}

/**
 * Generates a reducer function to divide past and upcoming route results according to the current time.
 * Note that the comparison time is set when the reducer function is generated, so generate a new one before using it.
 */
function buildRouteLapReducerNow(departureStationId: string){
    return (
        acc: {
            futureRoutes: RouteLap[],
            pastRoutes: RouteLap[]
        }, 
        routeLap: RouteLap
    ) => {
        const now = dayjs();
        const nowMinutes = now.hour() * 60 + now.minute();
        const departureTimeInMinutes = getDepartureTimeForStation(
          routeLap.stations,
          departureStationId
        );

        if (departureTimeInMinutes < nowMinutes) {
          acc.pastRoutes.push(routeLap);
        } else {
          acc.futureRoutes.push(routeLap);
        }
        return acc;
    }
}

class FilterService {

    getFilterResults(allRoutes: Route[], srcStationId: string, destStationId: string, departDate: number, isTodayDeparture: boolean){
        const routeLaps = getFilteredRouteLaps(allRoutes, srcStationId, destStationId, departDate);
        return dividePastAndCurrentRouteLaps(routeLaps, srcStationId, isTodayDeparture);
    }

}

const filterServiceInstance = new FilterService();
export default filterServiceInstance;