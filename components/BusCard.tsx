import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";

const BusCard = ({id, routeId}: Bus) => {
    const isFrequent = false; // used for determining background color
    const BGCOLOR = isFrequent ? '#7a1f7e' : '#8ed0eb';
    // or blue : #0d9ddb

    return (
        // <Link href={`schedules/${id}`} asChild>
            <TouchableOpacity className="text-secondary w-[100%] h-16">
                <View style={{backgroundColor: BGCOLOR}} className="flex justify-center items-center w-16 h-10">
                    <Text className="text-black">{routeId}</Text>
                </View>
            </TouchableOpacity>
        // </Link>
    );
};

export default BusCard;
