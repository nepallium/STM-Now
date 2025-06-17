import { Stack } from 'expo-router';

export default function _layout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}


// OLD
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabIcon = ({ focused, title }: any) => {
    if (focused) {
        return (
            <View className='size-full flex w-[50px] h-full overflow-hidden bg-[#505050]'>
                <Text className='flex-1 text-[16px] text-base fond-semibold text-white'>{title}</Text>
            </View>
        )
    } else {
        return (
            <View className='flex w-full flex-1 min-w-[168px] min-h-10 justify-center items-center overflow-hidden'>
                <Text className='text-[16px] text-base fond-semibold text-white'>{title}</Text>
            </View>
        )
    }
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#282828',
                    borderRadius: 20,
                    marginHorizontal: 25,
                    marginTop: 25,
                    height: 50,
                    position: 'absolute',
                    top: '40%', // taken from h-[40%] of MapScreen
                    borderWidth: 0,
                    borderColor: '#273854',
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: "Favorites",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            title="Favorites"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='nearby'
                options={{
                    title: "Nearby",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            title="Nearby"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

// export default _layout