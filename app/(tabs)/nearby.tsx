import {View, Text, FlatList} from 'react-native'
import React from 'react'
import getBusesWithinRadius from "@/services/getBusesWithinRadius";
import BusCard from "@/components/BusCard";
import {transit_realtime} from "gtfs-realtime-bindings";
// @ts-ignore
import {DataEntity} from "@/interfaces/GTFS";
import FeedMessage = transit_realtime.FeedMessage;
import {BusWithStop} from "@/interfaces/interfaces";
import IFeedEntity = transit_realtime.IFeedEntity;
// import BusCardsList from "@/components/BusCardsList";

interface Props {
    locationAllowed: boolean;
    userLat: number | undefined;
    userLon: number | undefined;
    gtfsData: FeedMessage | null;
    radiusKm: number
}

const Nearby = ({locationAllowed, userLat, userLon, gtfsData, radiusKm}: Props) => {
    let nearbyStops: BusWithStop[] | null = null;
    if (locationAllowed && userLat != null && userLon != null && gtfsData) {
        nearbyStops = getBusesWithinRadius(userLat, userLon, gtfsData, radiusKm);
    }

    return (
        <>
            {nearbyStops ?
                // TODO there will be duplis bc of two bus directions
                // <BusCardsList data={nearbyBuses} /> :
                <FlatList
                    data={nearbyStops}
                    renderItem={({ item }) => (
                        <BusCard {...(item as BusWithStop)} />
                    )}
                    keyExtractor={(item) => nearbyStops.indexOf(item).toString()}
                    ItemSeparatorComponent={() => <View className="h-7"/>}
                    className="flex-1 mx-5"
                /> :
                // TODO
                <Text>Cannot show nearby buses because location has been disabled</Text>
            }
        </>
    )
}

export default Nearby