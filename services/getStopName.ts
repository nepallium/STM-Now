import stopData from '../assets/gtfs_stm/stops'

// minimal
interface StopData {
    stop_id: string;
    stop_name: string;
}

let parsedStops: StopData[] = [];

const parseStops = (): void => {
    const lines: string[] = stopData.trim().split('\n');
    const headers: string[] = lines[0].split(',');

    parsedStops = lines.slice(1).map((line: string) => {
        const values: string[] = line.split(',');

        return {
            stop_id: values[headers.findIndex(header => header === "stop_id")],
            stop_name: values[headers.findIndex(header => header === "stop_name")],
        }
    })
}

const ensureDataLoaded = () : void => {
    if (parsedStops.length === 0) {
        parseStops();
    }
}

export default function getStopName(stopId: string | undefined) {
    ensureDataLoaded();
    let stopName = parsedStops.find(stop => stop.stop_id === stopId)?.stop_name;

    if (stopName) {
        if (stopName?.startsWith("Station") && stopName?.includes(" (")) {
            stopName = stopName?.slice(0, stopName?.indexOf(" ("))
        }

        return stopName = stopName?.charAt(0).toUpperCase() + stopName?.slice(1);
    }
}