import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute and useNavigation
import MapView, { Marker } from 'react-native-maps';
import apiEndpoint from '../IpFIle';

const PatientSignup = () => {
  // Use useRoute to access route parameters
  const route = useRoute();
  const  {UserID}  = route.params;
  const ip=apiEndpoint.apiEndpoint;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 33.642801,
    longitude: 73.070784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation(); // Use useNavigation to access navigation

  const handleMapPress = (e) => {
    setMarkerCoordinates(e.nativeEvent.coordinate);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  const handleChooseImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setSelectedImage(response.assets[0]);
    });
  };

  const handleSignup = async () => {
    try {
      // Validate input fields
      if (!firstName || !lastName || !phoneNumber || !date || !selectedImage) {
        Alert.alert('Please fill in all fields.');
        return;
      }
  
      const birthDate = date.toISOString(); // Convert date to string
      const fullName = `${firstName} ${lastName}`;
  
      const formData = new FormData();
      formData.append('UserID', UserID);
      formData.append('Fullname', fullName);
      formData.append('Imagepath', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
      formData.append('Gender', gender);
      formData.append('Datebirth', birthDate);
      formData.append('PhoneNo', phoneNumber);
      formData.append('Latitude', String(markerCoordinates.latitude));
      formData.append('Longitude', String(markerCoordinates.longitude));
  
      //console.log(formData);
      const response = await fetch(`${ip}Patient/AddPatientProfileData`
      , {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Inserted Data:', data);
        navigation.navigate('home');
      } else {
        console.error('Error adding patient:', response.status);
        // Handle error, if needed
      }
    } catch (error) {
      console.log(response);
      console.error('Error adding patient:', error.message);
      // Handle error, if needed
    }
  };
  // const handleSignup = async () => {
  //   if (firstName === '' || lastName === '' || phoneNumber === '' || date === null) {
  //     Alert.alert('Please fill in all fields.');
  //   } else if (selectedImage === null) {
  //     Alert.alert('Please select a profile image.');
  //   } else if (markerCoordinates === null) {
  //     Alert.alert('Please select your location on the map.');
  //   } else {
  //     const birthDate = date;
  //     const today = new Date();
  //     const age = today.getFullYear() - birthDate.getFullYear();
  //     const fullName = firstName + ' ' + lastName;
  
  //     console.log('User ID:', UserID);
  //     console.log('Your Name:', fullName);
  //     console.log('Selected Image Uri :', selectedImage.uri);
  //     console.log('Selected Image Type :', selectedImage.type);
  //     console.log('Selected Image Name :', selectedImage.fileName);
  //     console.log('Gender:', gender);
  //     console.log('Date of Birth:', date);
  //     console.log('Phone Number:', phoneNumber);
  //     console.log('User Location Coordinates:', markerCoordinates);
  //     console.log('Age:', age);
  
      
  //   const userData = new FormData();
  //   userData.append('UserID', UserID);
  //   userData.append('Fullname', fullName);
  //   userData.append('Imagepath', {
  //     uri: selectedImage.uri,
  //       type: selectedImage.type,
  //       name: selectedImage.fileName
  //   });
  //   userData.append('Gender', gender);
  //   userData.append('Datebirth', birthDate); 
  //   userData.append('PhoneNo', phoneNumber);
  //   userData.append('Latitude', String(markerCoordinates.latitude));
  //   userData.append('Longitude', String(markerCoordinates.longitude));



  //     console.log('First Data :', userData);
  //     try {
  //       const response = await fetch('http://192.168.64.21/HomeCareServices/api/Patient/AddPatientProfileData', {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(userData),
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Inserted Data:', data);
  //         // Handle success, if needed
  //       } else {
  //         console.error('Error adding patient:', response.status);
  //         console.log(response);
  //         // Handle error, if needed
  //       }
  //     } catch (error) {
  //       console.error('Error adding patient:', error.message);
  //       // Handle error, if needed
  //     }
  //   };
  // };
  
  
  

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Patient Profile</Text>
        <TouchableOpacity style={styles.profileImageContainer} onPress={handleChooseImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
          ) : (
            <Image source={require('../Assets/welcom1.jpg')} style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="First Name"
        />

        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Last Name"
        />

        <Text style={styles.inputLabel}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Phone Number"
        />

        <Text style={styles.inputLabel}>Date of Birth:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.inputLabel}>Gender:</Text>
        <View style={styles.radioContainer}>
          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
          <Text style={styles.inputLabel}>Male</Text>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
            style={{ marginLeft: 30, justifyContent: 'center' }}
          />
          <Text style={styles.inputLabel}>Female</Text>
        </View>
        <View>
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
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: 'black',
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 180,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '90%',
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  map: {
    width: '100%',
    height: '50%',
    marginBottom:10,
    borderRadius:10,
  },
});

export default PatientSignup;
