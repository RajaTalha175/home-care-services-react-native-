import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const App = () => {
  const route = useRoute();
  const navigation=useNavigation();
  const ip=apiEndpoint.apiEndpoint;
  const UserID = route.params && route.params.UserID;
  const nurse = route.params && route.params.nurse;
  const [isEmployee, setIsEmployee] = useState(nurse.isemployee);
  const [isRegistered, setIsRegistered] = useState(nurse.isresgistered);

  const handleEmployeeStatusChange = (status) => {
    setIsEmployee(status);
  };

  const handleRegisteredStatusChange = (status) => {
    setIsRegistered(status);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${ip}Admin/UpdateNursesStatus`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NurseID: nurse.profileid,
          isEmployee: isEmployee,
          isRegistered: isRegistered,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Profile Updated:', nurse.profileid, isEmployee, isRegistered);
        console.log('API Response:', responseData);
        navigation.navigate('adminhome',{UserID: UserID});
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <ImageBackground source={require('../Assets/imagebackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.verifyNurseText}>Verify Your Nurse</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.nurseName}>{nurse.name}</Text>
        </View>
        <View style={styles.subContainerLeft}>
          <Text style={styles.blackText}>Employee Status</Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="OnService"
              status={isEmployee ? 'checked' : 'unchecked'}
              onPress={() => handleEmployeeStatusChange(true)}
            />
            <Text style={[styles.radioText, { color: isEmployee ? 'black' : 'gray' }]}>On Service</Text>

            <RadioButton
              value="Retired"
              status={!isEmployee ? 'checked' : 'unchecked'}
              onPress={() => handleEmployeeStatusChange(false)}
            />
            <Text style={[styles.radioText, { color: !isEmployee ? 'black' : 'gray' }]}>Retired</Text>
          </View>
        </View>
        <View style={styles.subContainerLeft}>
          <Text style={styles.blackText}>Register Status</Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Registered"
              status={isRegistered ? 'checked' : 'unchecked'}
              onPress={() => handleRegisteredStatusChange(true)}
            />
            <Text style={[styles.radioText, { color: isRegistered ? 'black' : 'gray' }]}>Registered</Text>

            <RadioButton
              value="NotRegistered"
              status={!isRegistered ? 'checked' : 'unchecked'}
              onPress={() => handleRegisteredStatusChange(false)}
            />
            <Text style={[styles.radioText, { color: !isRegistered ? 'black' : 'gray' }]}>Not Registered</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.updateButtonContainer} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyNurseText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  nameContainer: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  nurseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  subContainerLeft: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 10,
  },
  blackText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:15,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 4,
  },
  radioText: {
    color: 'black',
    fontSize: 20,
  },
  updateButtonContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;
