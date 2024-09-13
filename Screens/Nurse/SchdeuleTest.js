import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute, useNavigation } from '@react-navigation/native';

const App = () => {

  
  const  UserID  = 2057;
  const [selectedDays, setSelectedDays] = useState({});
  const times = [
    '6am-7am', '7am-8am', '8am-9am', '9am-10am', '10am-11am', '11am-12pm',
    '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm', '5pm-6pm',
    '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am',
    '12am-1am', '1am-2am', '2am-3am', '3am-4am', '4am-5am', '5am-6am'
  ];



  useEffect(() => {
    if (UserID === null) {
      //navigation.goBack();
    } else {
      console.log('Received UserID Is:', UserID);
    }
  }, [UserID]);
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

  const showSelection = async() => {
   // console.log('Selected Days for Each Time Slot:', selectedDays);
  
    const userData = Object.keys(selectedDays).map((time) => {
      const userDataItem = {
        NurseID: UserID,
        DateTime: time,
      };
    
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
      for (let weekIndex = 1; weekIndex <= 8; weekIndex++) {
        const selectedWeekDays = days.reduce((acc, day) => {
          const dayIndex = days.indexOf(day) + 1; 
          acc[`WeekDay${dayIndex}`] = selectedDays[time].includes(day) ? day : null;
          return acc;
        }, {});
    
        Object.assign(userDataItem, selectedWeekDays);
      }
    
      return userDataItem;
    });
    
    

    console.log(userData);
    try {
      const response = await fetch('http://192.168.95.21/HomeCareServices/api/Nurse/AddNurseSchedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('Nurse schedules added successfully.');
      } else {
        console.log(response.status);
        console.error('Failed to add nurse schedules:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error sending request:', error.message);
      // Handle error
    }
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
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={showSelection}>
          <Text style={styles.buttonText}>Save Schedule</Text>
        </TouchableOpacity>
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
    marginTop:120,
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
    marginTop:10,
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
    borderRadius:10,
    width:300,
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
