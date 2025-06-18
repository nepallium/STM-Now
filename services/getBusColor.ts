import csvData from '../assets/gtfs_stm/routes';

interface BusRowData_routes {
    route_id: number;
    agency_id: string;
    route_short_name: number;
    route_long_name: string;
    route_type: number;
    route_url: string;
    route_color: string;
    route_text_color: string;
}

// Global variable to store parsed route data
let parsedRoutes: BusRowData_routes[] = [];

// Parse the CSV data
const parseRoutesData = (): void => {
    const lines: string[] = csvData.trim().split('\n');
    const headers: string[] = lines[0].split(',');

    parsedRoutes = lines.slice(1).map((line: string) => {
        const values: string[] = line.split(',');
        const row: any = {};

        headers.forEach((header: string, index: number) => {
            const value: string = values[index]?.trim() || '';
            const cleanHeader: string = header.trim();

            // Convert numeric fields
            if (cleanHeader === 'route_id' || cleanHeader === 'route_short_name' || cleanHeader === 'route_type') {
                row[cleanHeader] = parseInt(value) || 0;
            } else {
                row[cleanHeader] = value;
            }
        });

        return row as BusRowData_routes;
    });

    console.log(`Loaded ${parsedRoutes.length} routes`);
};

// Initialize data on first access
const ensureDataLoaded = (): void => {
    if (parsedRoutes.length === 0) {
        parseRoutesData();
    }
};

// Get route color by route_id
export const getBusColor = (routeId: number): string => {
    ensureDataLoaded();
    const route = parsedRoutes.find(r => r.route_id === routeId);
    // console.log(route?.route_color)
    return route ? route.route_color : "009EE0"; // default to STM blue
};
