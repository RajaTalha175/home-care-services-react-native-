import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const App = () => {
  const [nurseData, setNurseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.43.100/HomeCareServices/api/Admin/Healthagencynewnurses', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            HealthagencyID: 6,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setNurseData(data);
        } else {
          console.error('Error fetching nurse data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching nurse data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the values after nurseData is updated
    if (nurseData.length > 0) {
      console.log('Nurse Data:', nurseData);
    }
  }, [nurseData]);

  return (
    <ScrollView style={styles.container}>
      {nurseData.map((nurse) => (
        <View key={nurse.userid} style={styles.nurseContainer}>
          <Image
            source={{
              uri: `data:${nurse.image_type};base64,${nurse.image_base64}`,
            }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text>Name: {nurse.name}</Text>
            <Text>Email: {nurse.email}</Text>
            <Text>Phone: {nurse.phone}</Text>
            <Text>Type: {nurse.image_type}</Text>
            <Text>Path: {nurse.image}</Text>
            <Text>Employee Status: {nurse.isemployee ? 'On Service' : 'Retired'}</Text>
            <Text>Register Status: {nurse.isregistered ? 'Registered' : 'Not Registered'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  nurseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
});

export default App;
