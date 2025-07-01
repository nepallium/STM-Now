import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;

export interface Bus {
    id: number,
    routeId: number,
    direction: string,
    stop: string,
    time: number
}

export interface BusWithDistance extends IFeedEntity {
    distanceKm: number;
}

export interface BusWithStop {
    busId: string,
    stopName: String,
    time: String,
    distanceKm: number,
    direction: number,
    stopId: String,
}
