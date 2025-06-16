import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabIcon = ({ focused, title }: any) => {
    if (focused) {
        return (
            <View className='flex flex-row w-full flex-1 min-w-[172px] min-h-20 mt-9 justify-center items-center rounded-[20] overflow-hidden bg-[#505050]'>
                <Text className='text-[16px] text-base fond-semibold ml-2 text-white'>{title}</Text>
            </View>
        )
    } else {
        return (
            <View className='flex flex-row w-full flex-1 min-w-[168px] min-h-20 mt-9 justify-center items-center rounded-[20] overflow-hidden'>
                <Text className='text-[16px] text-base fond-semibold ml-2 text-white'>{title}</Text>
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
                    marginBottom: 50,
                    height: 70,
                    position: 'absolute',
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

export default _layout