import React from 'react';

import {FlatList, Text, View} from 'react-native';
import BusCard from "@/components/BusCard";
import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;

interface Props {
    data: IFeedEntity[];
}

const BusCardsList = ({ data }: Props) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <BusCard {...(item as IFeedEntity)} />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-7"/>}
            className="flex-1 mx-5"
        />
    );
};

export default BusCardsList;
