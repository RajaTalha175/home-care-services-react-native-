import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker, Circle } from 'react-native-maps';
import apiEndpoint from '../IpFIle';


const NurseSignup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const UserID = route.params;
  const ip=apiEndpoint.apiEndpoint;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [healthAgency, setHealthAgency] = useState(null);
  const [serviceStatus, setServiceStatus] = useState('OnService');
  const [healthAgencyList,sethealthAgencyList] = useState([
    // { id: 0, name: 'Select' },
    // { id: 1, name: 'Bill Medicare' },
    // { id: 2, name: 'HBS Medicare' },
    // { id: 3, name: 'Rawal Hospital' },
  ]);
  const [radius, setRadius] = useState(1);
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 33.642801,
    longitude: 73.070784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentCoordinates, setCurrentCoordinates] = useState(null);

  useEffect(() => {
    const fetchHealthAgencies = async () => {
      try {
        const response = await fetch(`${ip}Nurse/GetHealthAgency`
        );
        if (response.ok) {
          const data = await response.json();
          //console.log('Health Agencies:', data); // Log the data
          sethealthAgencyList(data);
        } else {
          console.error('Error fetching health agencies:', response.status);
        }
      } catch (error) {
        console.error('Error fetching health agencies:', error.message);
      }
    };

    const timer = setTimeout(() => {
      if (UserID !== null) {
        console.log('UserID received:', UserID);
        fetchHealthAgencies(); // Fetch health agencies after UserID is received
      } else {
        navigation.goBack();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [UserID, navigation]);

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

  const handleMapPress = (e) => {
    setMarkerCoordinates(e.nativeEvent.coordinate);
  };
  const handleSignup = async () => {
    setCurrentCoordinates(
      `Latitude: ${markerCoordinates.latitude}, Longitude: ${markerCoordinates.longitude}`
    );
  
    // Validate input fields
    if (!firstName || !lastName || !phoneNumber || !date || !selectedImage || !radius) {
      Alert.alert('Please fill in all fields.');
      return;
    }
  
    const birthDate = date.toISOString(); // Convert date to string
    const fullName = `${firstName} ${lastName}`;
  
    const formData = new FormData();
    let uid = 0;
  
    if (UserID.UserID !== 0) {
      uid = UserID.UserID;
    }
  
    formData.append('UserID', String(uid));
    let agencyid = 0;
if (healthAgency) {
  agencyid = healthAgency.HealthagencyID;
}

      formData.append('HealthAgencyStatus', String(agencyid));
      formData.append('isEmployee', false);
      formData.append('isRegistered', false); // Set your default value for isRegistered
      formData.append('FullName', fullName);
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
      formData.append('Radius', radius);
    console.log('???????????????????');
    console.log('Sending Data Is: ', formData);
    try {
      const response = await fetch(`${ip}Nurse/AddNurseProfileData`
      , {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(response.status);
        console.log('Inserted Data:', data);
        console.log('//////////////////');
        console.log('Sending UserID Is :', data);
        navigation.navigate('nservice', { UserID: data });
      } else {
        console.error('Error adding nurse:', response.status);
      }
    } catch (error) {
      console.error('Error adding nurse:', error.message);
      // Handle error, if needed
    }
  };
  // const handleSignup = () => {
  //   setCurrentCoordinates(
  //     `Latitude: ${markerCoordinates.latitude}, Longitude: ${markerCoordinates.longitude}`
  //   );
  //   if (
  //     firstName === '' ||
  //     lastName === '' ||
  //     phoneNumber === '' ||
  //     date === null ||
  //     serviceStatus === ''
  //   ) {
  //     Alert.alert('Please fill in all the required fields.');
  //   } else {
  //     console.log('First Name:', firstName);
  //     console.log('Last Name:', lastName);
  //     console.log('Phone Number:', phoneNumber);
  //     console.log('Date of Birth:', date);
  //     console.log('Gender:', gender);
  //     console.log('Selected Image:', selectedImage);
  //     console.log('Health Agency:', healthAgency);
  //     console.log('Service Status:', serviceStatus);
  //     console.log('User ID: ', UserID);
  //     console.log('Coordinates Is:', currentCoordinates);
  //     console.log('Radius Is:', radius);
  //     navigation.navigate('nservice', { UserID: UserID });
  //   }
  // };

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
       <Text style={styles.headerText}>Nurse Signup</Text>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={handleChooseImage}
        >
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
          ) : (
            <Image source={require('../Assets/welcom1.jpg')} style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={styles.inputLabel}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
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
          />
          <Text style={styles.inputLabel}>Female</Text>
        </View>
        <Text style={styles.inputLabel}>Select Your Health Agency:</Text>
        <Picker
  selectedValue={healthAgency}
  onValueChange={(itemValue) => setHealthAgency(itemValue)}
  
  style={styles.picker}
>
  
      <Picker.Item label='Select' value={null} />
      {healthAgencyList.map((item) => (
        <Picker.Item key={item.HealthagencyID} label={item.Name} value={item} />
      ))}
   
  
</Picker>

        <Text style={styles.inputLabel}>Choose Your Service Status:</Text>
        <RadioButton.Group onValueChange={(value) => setServiceStatus(value)} value={serviceStatus}>
          <View style={styles.radioContainer}>
            <RadioButton.Item label="OnService" value="OnService" />
            <RadioButton.Item label="Retired" value="Retired" />
          </View>
        </RadioButton.Group>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Radius (in km):</Text>
          <TextInput
  style={styles.input}
  value={`${radius}`} // Convert to string using template literals
  placeholder="Enter Radius Please"
  onChangeText={(text) => setRadius(text)}
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
      </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    paddingTop: 80,
    marginTop:-50,
    
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop:130,
  },
  inputLabel: {
    color: 'black',
    marginLeft: 10,
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
    width: 150, // Adjust the width as needed
    alignSelf: 'center', // Center the button horizontally
    marginTop: 10,
   
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom:-40,
    marginTop:20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom:30,
  },
  picker: {
    width: '90%',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  map: {
    height: 300,
    marginVertical: 10,
  },
});

export default NurseSignup;
