import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {getBusColor} from "@/services/getBusColor";

const BusCard = ({id, routeId, direction, stop, time}: Bus) => {
    const BGCOLOR = getBusColor(routeId);

    return (
        // <Link href={`schedules/${id}`} asChild>
        <TouchableOpacity className="bg-light-300 w-[100%] h-20 px-2 py-4 flex flex-row justify-between items-center">
            <View className="flex flex-row gap-3">
                <View style={{backgroundColor: `#${BGCOLOR}`}} className="flex justify-center items-center w-20 h-12">
                    <Text className="text-white font-bold text-xl">{routeId}</Text>
                </View>
                <View className="flex flex-col justify-between">
                    <View className="flex-row gap-0.5 items-center">
                        <MaterialIcons name="east" size={20} color="black"/>
                        <Text className="text-sm">{direction}</Text>
                    </View>
                    <Text className="text-sm">{stop}</Text>
                </View>
            </View>
            <View className="items-center">
                <View className="flex-row items-baseline gap-0.5">
                    <Text className="text-3xl font-bold leading-none">{time}</Text>
                    <Text className="text-xs">min</Text>
                </View>
            </View>
        </TouchableOpacity>
        // </Link>
    );
};

export default BusCard;