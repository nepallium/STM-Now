import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

const MapScreen = () => {
  const mapUrl =
      'https://www.openstreetmap.org/export/embed.html?bbox=-73.6,45.4,-73.5,45.6&layer=mapnik&marker=45.5,-73.55';

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
