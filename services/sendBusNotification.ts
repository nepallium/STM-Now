import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';

interface BusData {
  busNumber: String,
  busName: String,
  intersection: String,
  estimatedTime: String,
}

const sendBusNotification = async (data: BusData, callBackFunction: Function,) => {
  const { busNumber, busName, intersection ,estimatedTime } =  data

  await scheduleBusNotification(busNumber, busName, intersection, estimatedTime);

  () => (callBackFunction())
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function scheduleBusNotification(busNumber: String, busName: String, intersection: String, estimatedTime: String) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${busNumber} - ${busName} 🚌`,
      body: `Arriving at ${intersection} in ${estimatedTime}`,
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1
    },
  });
}

export default sendBusNotification