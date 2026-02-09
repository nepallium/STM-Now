import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;
import IFeedMessage = transit_realtime.IFeedMessage;
import stopData from '../assets/gtfs_stm/stops'

// options for date formatting
const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/New_York'
}

// Haversine formula
function calculateDistance(userLat: number, userLon: number, busLat: number, busLon: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(busLat - userLat);
    const dLon = toRadians(busLon - userLon);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(userLat)) * Math.cos(toRadians(busLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

/* TODO
Adaptive radius options:

Dense urban areas: 0.5-1 km
Suburban areas: 1.5-2.5 km
Rural areas: 3-5 km
 */

interface BusWithDistance extends IFeedEntity {
    distanceKm: number;
}

interface StopData {
    stop_id: String,
    stop_lat: number,
    stop_lon: number,
    stop_name: String,
}

interface StopWithDistance extends StopData{
    distanceKm: number;
}

interface BusWithStop {
    busId: string,
    stopName: String,
    time: String,
    distanceKm: number,
    direction: number,
    stopId: String,
}

let parsedStops: StopData[] = [];

const getNearbyStops = function(
    userLat: number,
    userLon: number,
    radiusKm: number
): StopWithDistance[] {
    console.log(userLat)
    console.log(userLon)

    const nearbyStops: StopWithDistance[] = [];

    const lines: string[] = stopData.trim().split('\n');
    const headers: string[] = lines[0].split(',');

    parsedStops = lines.slice(1).map((line: string) => {
        const values: string[] = line.split(',');

        return {
            stop_id: values[headers.findIndex(header => header === "stop_id")],
            stop_lat: Number.parseFloat(values[headers.findIndex(header => header === "stop_lat")]),
            stop_lon: Number.parseFloat(values[headers.findIndex(header => header === "stop_lon")]),
            stop_name: values[headers.findIndex(header => header === "stop_name")]
        }
    })

    parsedStops.forEach((stop) => {
        if (stop.stop_lat && stop.stop_lon) {
            const distance = calculateDistance(userLat, userLon, stop.stop_lat, stop.stop_lon)
            if (distance <= radiusKm && nearbyStops.find(obj => obj == stop) == undefined) {
                nearbyStops.push({
                    ...stop,
                    distanceKm: distance,
                })
            }
        }
    })

    return nearbyStops.sort((a, b) => a.distanceKm - b.distanceKm);
}

export default function getBusesWithinRadius(
    userLat: number,
    userLon: number,
    feedMessage: IFeedMessage,
    radiusKm: number,
): BusWithStop[] {
    let nearbyStops = getNearbyStops(userLat, userLon, radiusKm)

    let buses: BusWithStop[] = []

    feedMessage.entity?.forEach((entity: IFeedEntity) => {
        let stops = entity.tripUpdate?.stopTimeUpdate

        stops?.forEach((stop) => {
            let searchedStop = nearbyStops.find((obj) => obj.stop_id == stop.stopId)

            if (searchedStop != undefined) {
                if (stop.arrival?.time) {
                    let arrival = Number(stop.arrival.time)
                let ETA = arrival * 1000

                // console.log("FORMATTED: ", searchedStop.distanceKm, entity.tripUpdate?.trip.routeId, searchedStop.stop_name, ETA, entity.tripUpdate?.trip.directionId)
                if (searchedStop.distanceKm
                    && entity.tripUpdate?.trip.routeId
                    && searchedStop.stop_name
                    && entity.tripUpdate?.trip.directionId != null) {
                    let obj: BusWithStop = {
                        // @ts-ignore
                        busId: entity.tripUpdate?.trip.routeId,
                        stopName: searchedStop.stop_name,
                        time: ETA.toString(),
                        distanceKm: searchedStop.distanceKm,
                        direction: entity.tripUpdate.trip.directionId,
                        stopId: searchedStop.stop_id
                    }


                    if (buses.find((bus) => bus.busId == obj.busId && bus.direction == obj.direction ) == undefined) {
                        buses.push(obj)
                    } else {
                        // @ts-ignore
                        let bus: BusWithStop = buses.find((bus) => bus.busId == obj.busId && bus.direction == obj.direction)
                        if (bus?.distanceKm > obj.distanceKm || bus.time > obj.time) {
                            buses.push(obj)
                            buses.splice(buses.indexOf(bus), 1)
                        }
                    }
                }

                }
            }
        })
    })

    return buses.sort((a, b) => Number.parseInt(a.busId) - Number.parseInt(b.busId));
}
