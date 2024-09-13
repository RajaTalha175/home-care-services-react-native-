import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, queryParams } from 'react-native';
import apiEndpoint from '../IpFIle';








const PatientRegister = ({ route, navigation }) => {
  const role = route.params?.role || 'defaultRole';
  const [showrole, setshowrole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const ip=apiEndpoint.apiEndpoint;
  const loginEndpoint = `${ip}Admin/AddProfile`;

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (role !== '') {

      if (role === 'patient') {

        setshowrole('Patient');
      } else if (role === 'nurse') {
        setshowrole('Nurse');
      } else {
        
        navigation.goBack();
      }
    } else {
      
      navigation.goBack();
    }
  }, [role, navigation]);

  const handleRegister = async () => {
    if (!['patient', 'nurse', 'admin'].includes(role)) {
      Alert.alert('Invalid Role', 'Unknown user role');
      return;
    }
  
    if (!email || !password || !confirmPassword) {
      Alert.alert('Incomplete Information', 'Please fill in all the fields');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
  
    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
  
    if (role !== '' && email !== '' && password) {
      const userData = {
        Role: role,
        Gmail: email,
        Password: password,
      };
    //   const UserID=1;
    //  console.log('userdata is:',userData);
    //  if(role==='patient'||role==='nurse'){
    //   console.log('User Data:',{ role: role, UserID: UserID });
    //    navigation.navigate('message', { role: role, UserID: UserID });
    // }
      try {
        const response = await fetch(loginEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('UserID:',data.UserID);
          
          if (role === 'patient' || role === 'nurse') {
            console.log(`${role} data added`, data.UserID);
            navigation.navigate('message', { role: role, UserID: data.UserID });
          }
        } else {
          console.log(response.status);
          console.log('user data', userData);
          console.log('Registration Failed', 'Invalid response status');
        }
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Registration Failed', 'An error occurred');
      }
    } else {
      Alert.alert('Permission Denied', 'Enter Credentials');
    }
  };
  
  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <Text style={styles.roleText}>
          Register {showrole} Account
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm your password"
          />
        </View>

        <View style={styles.agreementContainer}>
          <Text style={styles.agreementText}>
            By clicking 'Register', you agree to the terms of service and privacy policy.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  roleText: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '90%',
  },
  agreementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  agreementText: {
    fontSize: 14,
    maxWidth: 260,
    textAlign: 'center',
    lineHeight: 24,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: -70,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default PatientRegister;