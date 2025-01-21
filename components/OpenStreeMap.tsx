import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";

const OpenStreetMap: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 24.8654849, // Initial latitude
          longitude: 67.0528702, // Initial longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Use OpenStreetMap tiles */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19} // Maximum zoom level for OSM tiles
        />

        {/* Example Marker */}
        <Marker
          coordinate={{
            latitude: 24.864529,
            longitude: 67.0572001,
          }}
          title="San Francisco"
          description="This is a marker in San Francisco"
        />
      </MapView>
    </View>
  );
};

export default OpenStreetMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
