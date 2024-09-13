import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as geolib from 'geolib';

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
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
    } else {
      console.error('Geolocation is not supported by your device');
    }
  }, []);

  const handleMapPress = (event) => {
    setUserLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  
  const calculateDistance = (pointA, pointB) => {
    if (pointA && pointB) {
      const distance = geolib.getDistance(pointA, pointB);
      return geolib.convertUnit('km', distance, 2);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleMapPress}>
        {userLocation && <Marker coordinate={userLocation} />}
      </MapView>
      {userLocation && (
        <View>
          <Text>Location Coordinates: {userLocation.latitude}, {userLocation.longitude}</Text>
          {userLocation && userLocation.latitude && userLocation.longitude && (
            <Text>Distance from a specific point: {calculateDistance(userLocation, { latitude: 0, longitude: 0 })} km</Text>
          )}
        </View>
      )}
      <Button title="Clear Location" onPress={() => setUserLocation(null)} />
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

export default MapScreen;
