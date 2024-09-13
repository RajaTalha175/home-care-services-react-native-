import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const LoginScreen = ({ navigation }) => {
  const route = useRoute();
  const role = route.params?.selectedRole || 'defaultRole';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ip=apiEndpoint.apiEndpoint;
  const loginEndpoint = `${ip}Admin/Login`;


  const handleLogin = async () => {
    if (role !== '' && email !== '' && password !== '') {
      const userData = {
        Gmail: email,
        Password: password,
      };
      console.log('Sending Data ',userData);
      
      try {
        const response = await fetch(loginEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status===200) {
          if (response.ok) {
            const data = await response.json();
            console.log('Response data is:', data);
            if(data!==null){
              console.log('Login Data is :',data);
          if (data.Role === 'patient') {
           if(role==='patient'){
           console.log('Patient User Data:', { UserID: data.UserID });
           navigation.navigate('phome',{ UserID: data.UserID });
           // Navigate to 'PatientHome' with user data
           }else{
             Alert.alert('Please Choose Your Correct Role !');
           }
          
       } else if (data.Role === 'nurse') {
         if(role==='nurse'){
 
         console.log('Nurse User Data:', { UserID: data.UserID });
           // Navigate to 'NurseHome' with user data
           navigation.navigate('nhome', { UserID: data.UserID });
         }else{
           Alert.alert('Please Choose Your Correct Role !');
         }
       } else if (data.Role === 'admin') {
         if(role==='admin'){
           console.log('Admin User Data:', { UserID: data.UserID });
           // Navigate to 'patienttabnavigation' with user data
           navigation.navigate('adminhome', { UserID: data.UserID });
         }else{
           Alert.alert('Please Choose Your Correct Role !');
         }
      }
       else{
              Alert.alert('Please Enter a Valid Email & Password! ');
 
       }
       } else {
           Alert.alert('Invalid Role', 'Unknown user role');
       }
            
        } else {
          console.log('Sent Data:', userData);
          console.log('Response :', response);
          console.log('Response status:', response.status);
          Alert.alert('Login Failed', 'Invalid response status');
        }
      } else {
        console.log('Sent Data:', userData);
        console.log('Response :', response);
        console.log('Response status:', response.status);
        Alert.alert('Login Failed', 'Invalid response status');
      }
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Login Failed', 'An error occurred');
      }
    } else {
      Alert.alert('Permission Denied', 'Enter Credentials');
    }
  };
  
  // Function to handle navigation to the signup page based on the selected role
  const handleSignUp = (role) => {
    if (role === 'patient' || role === 'nurse') {
      navigation.navigate('register', { role });
    } else {
      Alert.alert('Permission Denied', 'Admins cannot create accounts.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/Capture123-removebg-preview.png')} style={styles.image} />
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="abc123@gmail.com"
        onChangeText={setEmail}
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="XYZ123"
        secureTextEntry
        onChangeText={setPassword}
      />
     <TouchableOpacity style={styles.button} onPress={handleLogin}>
       <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button1} onPress={() => handleSignUp(role)}>
      <Text>Create New Account ?</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 50,
    color:'black',
    
  },
  input: {
    width: '80%',
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 60,
    marginTop: -10,
    marginLeft:-10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 8,
    marginTop: 18,
    borderRadius: 5,
  },
  button1: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
