import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
   
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {userLocation && <Marker coordinate={userLocation} />}
      </MapView>
      {userLocation && (
        <View>
          <Text>Location Coordinates: {userLocation.latitude}, {userLocation.longitude}</Text>
        </View>
      )}
      <Button title="Save Location" onPress={() => alert("Location Saved: " + JSON.stringify(userLocation))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
