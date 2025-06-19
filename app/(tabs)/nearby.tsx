import {View, Text, FlatList} from 'react-native'
import React from 'react'
import getBusesWithinRadius from "@/services/getBusesWithinRadius";
import BusCard from "@/components/BusCard";
import {transit_realtime} from "gtfs-realtime-bindings";
import {DataEntity} from "@/interfaces/GTFS";
import FeedMessage = transit_realtime.FeedMessage;
import {BusWithDistance} from "@/interfaces/interfaces";
import IFeedEntity = transit_realtime.IFeedEntity;
import BusCardsList from "@/components/BusCardsList";

interface Props {
    locationAllowed: boolean;
    userLat: number | undefined;
    userLon: number | undefined;
    gtfsData: FeedMessage | null;
    radiusKm: number
}

const Nearby = ({locationAllowed, userLat, userLon, gtfsData, radiusKm}: Props) => {
    let nearbyBuses: BusWithDistance[] | null = null;
    if (locationAllowed && userLat != null && userLon != null && gtfsData) {
        nearbyBuses = getBusesWithinRadius(userLat, userLon, gtfsData, radiusKm);
    }

    return (
        <>
            {nearbyBuses ?
                // TODO there will be duplis bc of two bus directions
                // <BusCardsList data={nearbyBuses} /> :
                <FlatList
                    data={nearbyBuses}
                    renderItem={({ item }) => (
                        <BusCard {...(item as IFeedEntity)} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
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