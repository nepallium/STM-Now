import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;
import IFeedMessage = transit_realtime.IFeedMessage;

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
    distanceMeters: number;
}

export default function getBusesWithinRadius(
    userLat: number,
    userLon: number,
    feedMessage: IFeedMessage,
    radiusKm: number
): BusWithDistance[] {
    const nearbyBuses: BusWithDistance[] = [];

    feedMessage.entity?.forEach((entity: IFeedEntity) => {
        const position = entity.vehicle?.position;
        if (position?.latitude && position?.longitude) {
            const distance = calculateDistance(userLat, userLon, position.latitude, position.longitude);
            if (distance <= radiusKm) {
                nearbyBuses.push({
                    ...entity,
                    distanceKm: distance,
                    distanceMeters: Math.round(distance * 1000),
                });
            }
        }
    });

    return nearbyBuses.sort((a, b) => a.distanceKm - b.distanceKm);
}
