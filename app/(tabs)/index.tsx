import { Button, Platform, View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { fetchTripUpdates, fetchVehiclePositions } from '@/services/api';
import useFetch from '@/services/useFetch';
import BusCard from "@/components/BusCard";
import Map from '@/components/Map';
import registerForNotifications from '@/services/registerForNotifications';
import sendBusNotification from '@/services/sendBusNotification';
import {getCurrentLocation} from '@/services/getCurrentLocation'
import * as Location from "expo-location";

const index = () => {
    registerForNotifications()

    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'favorites' | 'nearby'>('favorites');

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {
        getCurrentLocation(setLocation, setErrorMsg)
    }, [])

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

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

    // console.log(tripUpdatesData?.entity[0]);

    vehiclePositionsData?.entity.forEach((busTrip : any) => {
        if (busTrip.vehicle?.trip?.routeId === '51') {
            // console.log(busTrip.vehicle?.position);
        }
    })

    // console.log(vehiclePositionsData?.entity[0]?.vehicle?.trip);
    // console.log(tripUpdatesData?.entity[0]?.tripUpdate?.stopTimeUpdate[0].departure);

    const tmpFavorites = [
        {id: 1, routeId: 215, direction: "Est", stop: "Marcel-Laurin / Poirier", time: 25},
        {id: 2, routeId: 64, direction: "Nord", stop: "Grenet / Poirier", time: 8}
    ]

    return (
        <View className='flex-1 bg-[#273854] flex flex-col gap-4'>
            <View className='h-[40%]'>
                <Map />
            </View>

            {/* Toggle tabs */}
            <View className="flex flex-row my-4 mx-12">
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'favorites' ? '#000' : '#555',
                        padding: 10,
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                    onPress={() => setActiveTab('favorites')}
                >
                    <Text style={{ color: 'white' }}>Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'nearby' ? '#000' : '#555',
                        padding: 10,
                        alignItems: 'center',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    onPress={() => setActiveTab('nearby')}
                >
                    <Text style={{ color: 'white' }}>Nearby</Text>
                </TouchableOpacity>

                {/* NOTIFICATION TEST BUTTON, DELETE TOUCHABLE OPACITY TO FIX MENU */}
                <TouchableOpacity
                    onPress={async () => {
                        await sendBusNotification({
                                busNumber: "XXX",
                                busName: "Bus Name",
                                intersection: "Street 1/Street 2",
                                estimatedTime: "X minutes"},
                            () => {});
                        console.log("Notification sent!")
                    }}
                >
                    <Text>Click for notif</Text>
                </TouchableOpacity>
            </View>

            {tmpFavorites.length > 0 ?
                <FlatList
                    data={tmpFavorites}
                    renderItem={({ item }) => (
                        <BusCard {...item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="h-7"/>}
                    className="flex-1 mx-5"
                /> :
                <View className="flex-1 mx-5">
                    <Text className="text-center font-bold text-4xl text-white">Add a favorite bus line!</Text>
                </View>
            }
        </View>
    )
}

export default index