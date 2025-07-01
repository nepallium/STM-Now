import { Button, Platform, View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Link, useRouter} from 'expo-router'
import { fetchTripUpdates, fetchVehiclePositions } from '@/services/api';
import useFetch from '@/services/useFetch';
import BusCard from "@/components/BusCard";
import Map from '@/components/Map';
import registerForNotifications from '@/services/registerForNotifications';
import sendBusNotification from '@/services/sendBusNotification';
import {getCurrentLocation} from '@/services/getCurrentLocation'
import * as Location from "expo-location";
import Nearby from "@/app/(tabs)/nearby";
import {transit_realtime} from "gtfs-realtime-bindings";
import IFeedEntity = transit_realtime.IFeedEntity;
// import BusCardsList from "@/components/BusCardsList";
import getBusesWithinRadius from '@/services/getBusesWithinRadius';
import { BusWithStop } from '@/interfaces/interfaces';

const index = () => {
    registerForNotifications()

    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'favorites' | 'nearby'>('favorites');

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {
        getCurrentLocation(setLocation, setErrorMsg)
    }, [])

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
    // console.log(vehiclePositionsData?.entity[0].vehicle?.position)

    // vehiclePositionsData?.entity.forEach((busTrip : any) => {
    //     if (busTrip.vehicle?.trip?.routeId === '51') {
    //         // console.log(busTrip.vehicle?.position);
    //     }
    // })

    let tmpFavorites: BusWithStop[] = []
    // if (vehiclePositionsData && tripUpdatesData) {
    //     // tmpFavorites = [
    //     //     {positionData: vehiclePositionsData?.entity[0], tripData: tripUpdatesData?.entity[0]},
    //     //     {positionData: vehiclePositionsData?.entity[1], tripData: tripUpdatesData?.entity[1]}
    //     // ];
    //     tmpFavorites = [
    //         vehiclePositionsData?.entity[0],
    //         vehiclePositionsData?.entity[1]
    //     ]
    // }

    // tmpFavorites = vehiclePositionsData?.entity.slice(0, 2)


    const nearbyElement = <Nearby
        locationAllowed={location !== null}
        userLat={location?.coords.latitude}
        userLon={location?.coords.longitude}
        gtfsData={tripUpdatesData}
        radiusKm={0.5}
    />

    if (tripUpdatesData) {
    // console.log(
        getBusesWithinRadius(location?.coords.latitude || 0, location?.coords.longitude || 0, tripUpdatesData, 0.5)
    // )
    }
    // DISPLAY NEARBY STOPS -- TEST
    // useEffect(() => {
    //     if (location?.coords.latitude && location.coords.longitude) {
    //         const nearbyStops = getBusesWithinRadius(location?.coords.latitude, location?.coords.longitude, 0.5)

    //         nearbyStops.forEach((stop) => {
    //             console.log("STOP: ", stop)
    //         })
    //     }
    // }, [location])

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

            {/* {tmpFavorites && tmpFavorites.length > 0 && activeTab === 'favorites' ?
                // <BusCardsList data={tmpFavorites} /> :
                
                <View className="flex-1">
                    {nearbyElement}
                </View>
            } */}
            <View className="flex-1">
                    {nearbyElement}
                </View>
        </View>
    )
}

export default index;