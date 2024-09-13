import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PatientProfile = () => {
  const PatientID = 8;
  const [patientProfile, setPatientProfile] = useState(null);
  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateTime = new Date(birthDate).getTime();
    const ageInMilliseconds = currentDate - birthDateTime;
  
    const ageDate = new Date(ageInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 33.642801,
    longitude: 73.070784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

 
  useEffect(() => {
    // This effect runs once when the component mounts
    const fetchPatientProfile = async () => {
      try {
        if (!PatientID) {
          console.log('Invalid profile ID.');
          return;
        }
  
        const response = await fetch(`http://192.168.64.21/HomeCareServices/api/Patient/ShowPatientProfile?PatientID=${PatientID}`);
        console.log(PatientID);
        console.log(response);
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          console.log(`Error: ${response.statusText}`);
          return;
        }
  
        const data = await response.json();
        console.log('Data:', data.Patient.PatientID);
  
        setPatientProfile(data);
  
      } catch (error) {
        console.log(`Error fetching patient profile: ${error.message}`);
      }
    };
  
    fetchPatientProfile();
  }, [PatientID]);
  
  useEffect(() => {
    // This effect runs whenever patientProfile changes
    if (patientProfile !== null) {
      setMarkerCoordinates({
        latitude: parseFloat(patientProfile.Patient.Latitude),
        longitude: parseFloat(patientProfile.Patient.Longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [patientProfile]); // Only re-run the effect if patientProfile changes
  
  
  const renderRatingStars = () => {
    const rating = patientProfile.Patient.Rating?.Rating || 1;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starImage =
        i <= rating
          ? require('../Assets/yellowratingstar.png')
          : require('../Assets/ratingstar.png');

      stars.push(
        <Image
          key={i}
          source={starImage}
          style={styles.ratingStar}
        />
      );
    }

    return stars;
  };
  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <TouchableOpacity
  style={styles.logoutIcon}
  onPress={() => console.log('Logout Pressed')} 
>
  <Image
    source={require('../Assets/logouticon.png')}  // Replace with your actual logout icon image
    style={styles.logoutIconImage}
  />
</TouchableOpacity>

        <Text style={styles.header}>Patient Profile</Text>

        {patientProfile && (
          <View>
            {/* Image view */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `data:${patientProfile.ImageType};base64,${patientProfile.ImageBase64}` }}
                style={styles.image}
              />
            </View>

            {/* Additional Information view */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.name}>{patientProfile.Patient.Fullname}</Text>
              <Text style={styles.email}>{patientProfile.Gmail}</Text>
              <Text style={styles.details}>PhoneNo: {patientProfile.Patient.PhoneNo}</Text>
              <Text style={styles.details}>DOB: {new Date(patientProfile.Patient.Datebirth).toLocaleDateString()} & Age: {calculateAge(patientProfile.Patient.Datebirth)}</Text>
              <View style={styles.ratingContainer}>
                {renderRatingStars()}
              </View>
            </View>

            {/* Black Line */}
            <View style={styles.blackLine}></View>

            {/* MapView */}
            
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: 33.642801,
              longitude: 73.070784,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={markerCoordinates} title="Marker" />
          </MapView>

            </View>
         )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop:90,
  },
  logoutIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginLeft:5,
  },
  logoutIconImage: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign:'center',
    marginBottom:20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  additionalInfoContainer: {
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ratingStar: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  blackLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 20,
    marginBottom: 30,
  },
 
  map: {
    width: '100%',
    height: '30%',
    marginBottom:10,
    borderRadius:20,
  },
});

export default PatientProfile;
