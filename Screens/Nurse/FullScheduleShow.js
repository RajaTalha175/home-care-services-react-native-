import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const App = ({navigation}) => {
 const route=useRoute();
 const ip=apiEndpoint.apiEndpoint;
  const {UserID} = route.params || 3119;
  const [nurseSchedules, setNurseSchedules] = useState([]);
  const [selectedDays, setSelectedDays] = useState({});
  const [nurseID, setnurseID] = useState(null);
  const times = [
    '6am-7am', '7am-8am', '8am-9am', '9am-10am', '10am-11am', '11am-12pm',
    '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm', '5pm-6pm',
    '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am',
    '12am-1am', '1am-2am', '2am-3am', '3am-4am', '4am-5am', '5am-6am'
  ];
  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        const response = await fetch(`${ip}Nurse/GetNurse?UserID=${UserID}`);
        if (response.ok) {
          const data = await response.json();
          // Assuming your API returns an array of nurses, you may need to adjust accordingly
          const nurse = data && data.length > 0 ? data[0] : null;
          setnurseID((prevNurseID) => {
            console.log('NursID is :', prevNurseID);
            return nurse.NurseID;
          });
        } else {
          Alert.alert('Error', 'Failed to fetch nurse data');
        }
      } catch (error) {
        console.error('Error fetching nurse data:', error.message);
        Alert.alert('Error', 'Failed to fetch nurse data');
      }
    };

    fetchNurseData();
  }, [UserID]);
  useEffect(() => {
    if(nurseID){
    const fetchNurseSchedules = async () => {
      try {
        const response = await fetch(`${ip}Nurse/GetNurseSchedules?nurseID=${nurseID}`);
        if (response.ok) {
          const schedules = await response.json();
          setNurseSchedules(schedules);
        } else {
          Alert.alert('Error', 'Failed to fetch nurse schedules');
        }
      } catch (error) {
        console.error('Error fetching nurse schedules:', error.message);
        Alert.alert('Error', 'Failed to fetch nurse schedules');
      }
    };
    fetchNurseSchedules();
  }
    
  }, [nurseID]);

  useEffect(() => {
    if (UserID === null) {
      // navigation.goBack();
    } else {
      console.log('Received UserID Is:', UserID);
    }
  }, [UserID]);

  useEffect(() => {
    console.log('Schedule Data Is: ', nurseSchedules)
    if (nurseSchedules.length > 0) {
      const newSelectedDays = {};
      nurseSchedules.forEach(schedule => {
        if (times.includes(schedule.DateTime)) {
          if (!newSelectedDays[schedule.DateTime]) {
            newSelectedDays[schedule.DateTime] = [];
          }
          for (let dayIndex = 1; dayIndex <= 7; dayIndex++) {
            const dayKey = `WeekDay${dayIndex}`;
            if (schedule[dayKey]) {
              newSelectedDays[schedule.DateTime].push(schedule[dayKey].trim()); 
            }
          }
        }
      });
      setSelectedDays(newSelectedDays);
    }
  }, [nurseSchedules]);

  const handleDayChange = (time, day) => {
    const newSelectedDays = { ...selectedDays };
    if (newSelectedDays[time] && newSelectedDays[time].includes(day)) {
      newSelectedDays[time] = newSelectedDays[time].filter(d => d !== day);
    } else {
      if (!newSelectedDays[time]) {
        newSelectedDays[time] = [day];
      } else {
        newSelectedDays[time].push(day);
      }
    }
    setSelectedDays(newSelectedDays);
  };

  

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainView}>
        <Text style={styles.centeredText}>Nurse Schedule</Text>
        <View style={styles.scheduleView}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.timeLabel]}>Time</Text>
            {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(day => (
              <Text key={day} style={styles.headerText}>
                {day}
              </Text>
            ))}
          </View>
          <ScrollView style={styles.scheduleScrollView}>
            {times.map(time => (
              <View style={styles.timeRow} key={time}>
                <Text style={styles.timeText}>{time}</Text>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <CheckBox
                    key={time + day}
                    value={selectedDays[time] && selectedDays[time].includes(day)}
                    onValueChange={() => handleDayChange(time, day)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        
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
  },
  timeLabel: {
    marginRight: 86, // Adjust the margin as needed
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20, // Adjust the margin as needed
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  scheduleScrollView: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  timeText: {
    flex: 1,
  },
  buttonView: {
    flex: 0,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
