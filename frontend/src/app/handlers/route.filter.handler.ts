import { Route, RouteLap, StationTime } from "@/models/route.model";
import { Week, Weekdays } from "@/models/weekdays.model";
import dayjs from "dayjs";

class FilterService {

    buildStationIndexMap(srcStationId: string | null, destStationId: string |  null){
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

    filterRoutesWithStations(
        res: {
            route: Route,
            srcStationIndex: number,
            destStationIndex: number
        }){
            return res.srcStationIndex !== -1 && res.destStationIndex !== -1;
    }

    buildIsActiveDayFilter(departureDate: number | null){
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
    
    buildRouteLapArray(
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
      
    getDepartureTimeForStation(
        stations: StationTime[],
        stationId: string | null
    ): number {
        const station = stations.find((st) => st.stationId === stationId);
        const timeString = station ? station.time : "00:00";
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    };
      
    buildRouteLapSorter(departureStationId: string | null){
        return (a: RouteLap, b: RouteLap) => {
          const minutesA = this.getDepartureTimeForStation(
            a.stations,
            departureStationId
          );
          const minutesB = this.getDepartureTimeForStation(
            b.stations,
            departureStationId
          );
          return minutesA - minutesB;
        }
    }

    buildRouteLapReducerNow(departureStationId: string | null){
        return (
            acc: {
                futureRoutes: RouteLap[],
                pastRoutes: RouteLap[]
            }, 
            routeLap: RouteLap
        ) => {
            const now = dayjs();
            const nowMinutes = now.hour() * 60 + now.minute();
            const departureTimeInMinutes = this.getDepartureTimeForStation(
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
}

const filterServiceInstance = new FilterService();
export default filterServiceInstance;