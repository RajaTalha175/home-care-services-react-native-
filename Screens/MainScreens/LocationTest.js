import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HelloWorldApp = () => {
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 33.642801,
    longitude: 73.070784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleMapPress = (e) => {
    setMarkerCoordinates(e.nativeEvent.coordinate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View!</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.642801,
          longitude: 73.070784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={markerCoordinates} title="Marker" />
      </MapView>
      <TouchableOpacity style={styles.button} onPress={() => console.log(markerCoordinates)}>
        <Text style={styles.buttonText}>Get Current Coordinates</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '40%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HelloWorldApp;
