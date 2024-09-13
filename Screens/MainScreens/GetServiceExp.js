import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      const response = await fetch('http://192.168.165.21/HomeCareServices/api/Nurse/GetServices');
      console.log('Response Status:', response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log('Data:', data);
        setServices(data);
      } else {
        const errorMessage = `Request failed with status code ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hi</Text>
      <Button title="Fetch Services" onPress={fetchServices} />
      {services.length > 0 ? (
        <View>
          <Text style={styles.subHeading}>Services:</Text>
          {services.map((service, index) => (
            <Text style={styles.serviceName} key={index}>
              {service.Name}
            </Text>
          ))}
        </View>
      ) : null}
      {error && <Text style={styles.error}>Error: {error}</Text>}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 18,
    marginTop: 16,
  },
  serviceName: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default App;
