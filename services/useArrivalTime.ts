import useFetch from "@/services/useFetch";
import {fetchTripUpdates} from "@/services/api";

export default function useArrivalTime(tripId: string | null | undefined, stopId: string | null | undefined) {
    // console.log("Trip id: " + tripId);
    // console.log("Stop id: " + stopId);

    const {
        data: tripUpdatesData,
        loading: tripUpdatesLoading,
        error: tripUpdatesError,
    } = useFetch(() => fetchTripUpdates());

    let ETA;
    if (tripUpdatesData) {
        const foundBus = tripUpdatesData.entity.find((bus) => bus.id === tripId);

        ETA = foundBus?.tripUpdate?.stopTimeUpdate?.find((stop) => stop.stopId === stopId)?.arrival?.time;
        // console.log(ETA)
    }

    if (typeof ETA !== "number") {
        return null;
    }

    const arrivalTime = ETA * 1000; // convert to ms
    const now = Date.now(); // current time in ms

    const minutesUntilArrival: number = Math.floor((arrivalTime - now) / (1000 * 60));
    // console.log("now: " + now)
    // console.log("arr : " + arrivalTime)

    console.log(`Arrives in ${minutesUntilArrival} minutes`);

    return minutesUntilArrival;
}