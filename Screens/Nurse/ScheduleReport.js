import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import apiEndpoint from '../IpFIle';
import { useRoute, useNavigation } from '@react-navigation/native';

const ReportScreen = () => {
  const ip = apiEndpoint.apiEndpoint;
  const route = useRoute();
  const { nurseID } = route.params;
  const [nurseSchedules, setNurseSchedules] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNurseSchedules = async () => {
      try {
        const response = await fetch(`${ip}Nurse/GetNurseSchedulesReport?nurseID=${nurseID}`);
        if (response.ok) {
          const schedules = await response.json();
          setNurseSchedules(schedules);
        } else {
          console.log('Error', 'Failed to fetch nurse schedules');
        }
      } catch (error) {
        console.error('Error fetching nurse schedules:', error.message);
        console.log('Error', 'Failed to fetch nurse schedules');
      }
    };

    fetchNurseSchedules();
  }, [nurseID]);

  const renderTimeSlots = () => {
    return nurseSchedules.map((schedule) => {
      return (
        <View key={schedule.dayname}>
          <Text style={styles.dayHeader}>{schedule.dayname.trim()}</Text>
          <View style={styles.timeSlotsContainer}>
            {schedule.Time.map((timeSlot, index) => (
              <Text key={index} style={styles.timeSlot}>{timeSlot}</Text>
            ))}
            <Text style={styles.totalTimeHeader}>Total Time: {schedule.Time.length} hours</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainView}>
      <TouchableOpacity onPress={() => { console.log('Going back'); navigation.goBack(); }} style={styles.backButton}>
  <Image source={require('../Assets/backarrow.png')} style={styles.backImage} />
</TouchableOpacity>

        <Text style={styles.centeredText}>Nurse Schedule </Text>
        <Text style={[styles.centeredText, { marginTop: -10 }]}>   Report      </Text>
        <ScrollView>
          <View style={styles.scheduleView}>
            {nurseSchedules.length > 0 && renderTimeSlots()}
          </View>
        </ScrollView>
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
  mainView: {
    flex: 1,
    marginTop: 120,
  },
  scheduleView: {
    flex: 1,
    padding: 10,
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginTop: 10,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  timeSlot: {
    backgroundColor: 'lightgray',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  totalTimeHeader: {
    marginLeft: 10,
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 10,
    marginTop:-10,
  },
  backImage: {
    width: 40,
    height: 40,
  },
});

export default ReportScreen;
