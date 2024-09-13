import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

const HelloWorldApp = () => {
  const [radius, setRadius] = useState(1);
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 33.642801,
    longitude: 73.070784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentCoordinates, setCurrentCoordinates] = useState(null);

  const handleMapPress = (e) => {
    setMarkerCoordinates(e.nativeEvent.coordinate);
  };

  const handleGetCoordinates = () => {
    setCurrentCoordinates(`Latitude: ${markerCoordinates.latitude}, Longitude: ${markerCoordinates.longitude}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Radius (in km):</Text>
        <TextInput
          style={styles.input}
          value={radius}
          placeholder='Enter Raduis Please'
          onChangeText={(text) => setRadius(text)} // Fixed this line
          keyboardType="numeric"
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoordinates.latitude,
          longitude: markerCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={markerCoordinates} title="Marker" />
        <Circle
          center={markerCoordinates}
          radius={radius * 1000} // Convert kilometers to meters
          fillColor="rgba(0, 128, 255, 0.2)" // Fill color for the circle
          strokeColor="rgba(0, 128, 255, 0.8)" // Stroke color for the circle
        />
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleGetCoordinates}>
        <Text style={styles.buttonText}>Get Current Coordinates</Text>
      </TouchableOpacity>
      {currentCoordinates && (
        <Text style={styles.coordinatesText}>{currentCoordinates} </Text>
      )}
      <Text style={styles.coordinatesText}>{radius}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '60%', // Adjust the height to your preference
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
  coordinatesText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default HelloWorldApp;
