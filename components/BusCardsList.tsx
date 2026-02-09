// import React from 'react';

// import {FlatList, Text, View} from 'react-native';
// import BusCard from "@/components/BusCard";
// import {transit_realtime} from "gtfs-realtime-bindings";
// import IFeedEntity = transit_realtime.IFeedEntity;
// import { BusWithStop } from '@/interfaces/interfaces';

// interface Props {
//     data: BusWithStop[];
// }

// const BusCardsList = ({ data }: Props) => {
//     return (
//         <FlatList
//             data={data}
//             renderItem={({ item }) => (
//                 <BusCard {...(item as BusWithStop)} />
//             )}
//             keyExtractor={(item) => nearbyStops.indexOf(item).toString()}
//             ItemSeparatorComponent={() => <View className="h-7"/>}
//             className="flex-1 mx-5"
//         />
//     );
// };

// export default BusCardsList;
