import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('Select');
  const roles = ['Select', 'patient', 'nurse', 'admin'];
  const handleNext = () => {
    if (selectedRole !== 'Select') {
      navigation.navigate('login', { selectedRole });
    } else {
      Alert.alert('Permission Denied!', 'Please Choose Your Role.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../Assets/Capture123-removebg-preview.png')}  />
      </View>
      <View style={styles.selectionContainer}>
        <Text style={styles.boldText}>Select your Role :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedRole}
            
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          >
            {roles.map((role) => (
              <Picker.Item key={role} label={role} value={role} />
            ))}
          </Picker>
</View>
        <Text style={styles.descriptionText}>
          To continue, select your role in this application. Please clarify your role.
        </Text>
        <TouchableOpacity style={styles.customButton} onPress={handleNext}>
  <Text style={styles.buttonText}>Get Started</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    marginTop: -60,
    width: 200,
    height: 200,
  },
  selectionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom:15,
    marginLeft: -60,
    color: 'black', 
  },
  pickerContainer: {
    width: 200,
    height: 40,
    marginBottom: 10,
    borderColor: 'black', // Set the boundary color to black
    borderWidth: 1,  // Add a border width to make it visible
    borderRadius: 10, 
    backgroundColor:'white',// Set the border radius to 20
    marginLeft: -5,
  },
  picker: {
    color:'black',
    marginTop:-5,
  },
  
  
  
  
  
  
  
 
  descriptionText: {
    fontSize: 16,
    marginVertical: 10,
    width: 300,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 30, // Set the description text color to black
  },
  button: {
    width: 400,
    height: 60,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    fontSize: 30,
    color: 'white',
  },
  customButton: {
    width: 120,
    height: 50,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 0,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});


export default HomeScreen;
