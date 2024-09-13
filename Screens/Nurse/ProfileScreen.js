import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const NurseProfile = () => {
    const route = useRoute();
    const navigation=useNavigation();
  const NurseID =  route.params?.UserID || 3120;
  const ip=apiEndpoint.apiEndpoint;
  const [nurseProfile, setNurseProfile] = useState(null);
  const [healthAgencyData, setHealthAgencyData] = useState(null);
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

  const goToServices = () => {
    // Navigate to the Services screen with the NurseID
    navigation.navigate('nservices', { NurseID: nurseProfile.Nurse.NurseID});
  };
  useEffect(() => {
    // This effect runs once when the component mounts
    const fetchNurseProfile = async () => {
      try {
        if (!NurseID) {
          console.log('Invalid profile ID.');
          return;
        }
  
        const response = await fetch(`${ip}Nurse/ShowNurseProfile?NurseID=${NurseID}`);
        console.log(NurseID);
        console.log(response);
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error:', errorData); 
          return;
        }
  
        const data = await response.json();
        console.log('Data:', data.Nurse.NurseID);
        
  
        setNurseProfile(data);
        console.log(nurseProfile.Nurse.Latitude);
        console.log(nurseProfile.Nurse.Longitude);
        
      } catch (error) {
        console.log(`Error fetching nurse profile: ${error.message}`);
      }
    };
  
    fetchNurseProfile();
  }, [NurseID]);
  
  useEffect(() => {
    // This effect runs whenever nurseProfile changes
    if (nurseProfile !== null) {
      setMarkerCoordinates({
        latitude: parseFloat(nurseProfile.Nurse.Latitude),
        longitude: parseFloat(nurseProfile.Nurse.Longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [nurseProfile]); // Only re-run the effect if NurseProfile changes
  

  useEffect(() => {
    const fetchHealthAgencyData = async () => {
      try {
        if (nurseProfile !== null) {
          let healthagencyid = nurseProfile.Nurse.HealthAgencyStatus;
          const response = await fetch(`${ip}Nurse/GetHealthAgencyStatus?healthagencyid=${healthagencyid}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const data = await response.json();
          setHealthAgencyData(data);
          console.log('HealthAgency Data:', healthAgencyData);
        }
      } catch (error) {
        console.error(`Error fetching health agency data: ${error.message}`);
      }
    };
  
    // Call the function to fetch data when the component mounts
    fetchHealthAgencyData();
  }, [nurseProfile]);  // Adding nurseProfile as a dependency
  
  
  const renderRatingStars = () => {
    const rating = nurseProfile.Nurse.Rating?.Rating || 1;
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
  onPress={() => navigation.goBack()} 
>
  <Image
    source={require('../Assets/logouticon.png')}  // Replace with your actual logout icon image
    style={styles.logoutIconImage}
  />
</TouchableOpacity>

        <Text style={styles.header}>Nurse Profile</Text>

        {nurseProfile && (
          <View>
            {/* Image view */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `data:${nurseProfile.ImageType};base64,${nurseProfile.ImageBase64}` }}
                style={styles.image}
              />
            </View>

            {/* Additional Information view */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.name}>{nurseProfile.Nurse.FullName}</Text>
              <Text style={styles.email}>{nurseProfile.Gmail}</Text>
              <Text style={styles.details}>PhoneNo: {nurseProfile.Nurse.PhoneNo}</Text>
              <Text style={styles.details}>DOB: {new Date(nurseProfile.Nurse.Datebirth).toLocaleDateString()} & Age: {calculateAge(nurseProfile.Nurse.Datebirth)}</Text>
              <Text style={styles.details}>
  {healthAgencyData ? `HealthAgency Name: ${healthAgencyData.Name}` : 'Loading...'}
</Text>


           <View style={styles.ratingContainer}>
                {renderRatingStars()}
              </View>
              <View style={styles.ServicesContainer}>
          <TouchableOpacity style={styles.seeServicesButton} onPress={goToServices}>
            <Text style={styles.seeServicesButtonText}>See Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyLeaveButton} onPress={()=>navigation.navigate('naleave', { NurseID: nurseProfile.Nurse.NurseID})}>
          <Text style={styles.applyLeaveButtonText}>Apply Leave</Text>
              </TouchableOpacity>
        </View>
            </View>

            {/* Black Line */}
            <View style={styles.blackLine}></View>

            {/* MapView */}
            
            {/* <MapView
            style={styles.map}
            initialRegion={{
              latitude: 33.642801,
              longitude: 73.070784,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            
          >
            <Marker coordinate={markerCoordinates} title="Marker" />
            <Circle
          center={markerCoordinates}
          radius={nurseProfile.Nurse.Radius * 1000} // Convert kilometers to meters
          fillColor="rgba(0, 128, 255, 0.2)" // Fill color for the circle
          strokeColor="rgba(0, 128, 255, 0.8)" // Stroke color for the circle
        />
          </MapView> */}

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
    marginTop: 5,
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
  ServicesContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom:-15,
  },
  seeServicesButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginRight:110,
  },
  seeServicesButtonText: {
    color: 'white',
    fontSize: 16,
  },
  applyLeaveButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
    marginRight:30,
  },
  applyLeaveButtonText: {
    color: 'white',
    fontSize: 16,
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

export default NurseProfile;
