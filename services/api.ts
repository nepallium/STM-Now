import GtfsRealtimeBindings from "gtfs-realtime-bindings";

const API_KEY = process.env.STM_API_KEY;

export const STM_CONFIG = {
    BASE_URL: 'https://api.stm.info/pub/od/gtfs-rt/ic/v2',
    API_KEY,
    headers: {
        accept: 'application/x-protobuf',
        apiKey: API_KEY,
    }
}

export const fetchVehiclePositions = async () => {

    console.log("API: " + API_KEY)
    const endpoint = `${STM_CONFIG.BASE_URL}/vehiclePositions`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: STM_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch vehicle positions', response.statusText);
    }

    // PARSE DATA X PROTOBUF LIBRARY
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
    );

    return feed;
}

export const fetchTripUpdates = async () => {
    const endpoint = `${STM_CONFIG.BASE_URL}/tripUpdates`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: STM_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch vehicle positions', response.statusText);
    }

    // PARSE DATA X PROTOBUF LIBRARY
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
    );

    return feed;
}