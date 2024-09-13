import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomePage = () => {
  const fetchServices = async () => {
    try {
      const response = await fetch('http://192.168.165.21/HomeCareServices/api/Nurse/GetServices');
      console.log('Response Status:', response.status);
      
      if (response.status === 200) {
        const data = await response.json();
        console.log('Data:', data);
       
      } else {
        const errorMessage = `Request failed with status code ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      
      console.error('Error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default HomePage;
