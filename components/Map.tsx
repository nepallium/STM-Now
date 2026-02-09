import { useState, useEffect } from 'react';
import * as Location from "expo-location";
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { getCurrentLocation } from '@/services/getCurrentLocation';

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
      const [errorMsg, setErrorMsg] = useState<string | null>(null);
      useEffect(() => {
          getCurrentLocation(setLocation, setErrorMsg)
      }, [])

  let latitude = location?.coords.latitude || "45.5"
  let longitude = location?.coords.longitude || "-73.55"

  const mapUrl =
      `https://www.openstreetmap.org/export/embed.html?bbox=-73.6,45.4,-73.5,45.6&layer=mapnik&marker=${latitude},${longitude}`;

  return (
      <View className="flex-1">
        <WebView
            source={{ uri: mapUrl }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            className="flex-1 bg-red-500"
        />
      </View>
  );
};

export default MapScreen;
