// <<<<<<< HEAD
import {View, Text, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { fetchTripUpdates, fetchVehiclePositions } from '@/services/api';
import useFetch from '@/services/useFetch';
import BusCard from "@/components/BusCard";
// =======
// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import { useRouter } from 'expo-router'
// import { fetchTripUpdates, fetchVehiclePositions } from '@/services/api';
// import useFetch from '@/services/useFetch';
// // import { sendNotification } from '@/services/busNotification';
// >>>>>>> temp

const index = () => {
    const router = useRouter();

    // setTimeout( () => {
    //     useEffect(() => {
    //     sendNotification();
    // }, [])}, 1000
    // )

    // BASE OBJECT : vehiclePositionsData & tripUpdatesData
    // OBJECT.entity gives an array of all buses (use array indexing to access one object, ex: OBJECT.entity[0])

    const {
        data: tripUpdatesData,
        loading: tripUpdatesLoading,
        error: tripUpdatesError,
    } = useFetch(() => fetchTripUpdates());

    const {
        data: vehiclePositionsData,
        loading: vehiclePositionsLoading,
        error: vehiclePositionsError,
    } = useFetch(() => fetchVehiclePositions());

    console.log(tripUpdatesData?.entity[0]);

    vehiclePositionsData?.entity.forEach((busTrip : any) => {
        if (busTrip.vehicle?.trip?.routeId === '51') {
            console.log(busTrip.vehicle?.position);
        }
    })

    console.log(vehiclePositionsData?.entity[0]?.vehicle?.trip);
    // console.log(tripUpdatesData?.entity[0]?.tripUpdate?.stopTimeUpdate[0].departure);

    return (
        <View className='flex-1 justify-center items-center bg-[#273854]'>
            {/* MAP */}


            <FlatList
                data={[{id: 12345, routeId: 64}]}
                renderItem={({ item }) => (
                    <BusCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                className="pt-32"
            />
        </View>
    )
}

export default index