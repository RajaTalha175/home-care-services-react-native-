import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import apiEndpoint from '../IpFIle';
import { useRoute } from '@react-navigation/native';
const App = ({navigation}) => {
  const ip=apiEndpoint.apiEndpoint;
  const route=useRoute();
  const {UserID} = route.params || 3119;
  const [nurseSchedules, setNurseSchedules] = useState([]);
  const [selectedDays, setSelectedDays] = useState({});
  const [checkDay, setCheckDay] = useState([]);
  const [nurseID, setnurseID] = useState(2062);
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
            console.log('User NursID is :', prevNurseID);
            return nurse.NurseID;
          });
        } else {
          Console.log('Error', 'Failed to fetch nurse data');
        }
      } catch (error) {
        console.error('Error fetching nurse data:', error.message);
        Console.log('Error', 'Failed to fetch nurse data');
      }
    };

    fetchNurseData();
  }, [UserID]);
  useEffect(() => {
    if (UserID === null) {
    } else {
      console.log('Received UserID Is:', UserID);
    }
  }, [UserID]);
  
  useEffect(() => {
    const fetchNurseSchedules = async () => {
      try {
        console.log('Get Schedule nurid:',nurseID);
        const response = await fetch(`${ip}Nurse/GetNurseSchedules?nurseID=${nurseID}`);
        if (response.ok) {
          const schedules = await response.json();
          setNurseSchedules(schedules);
        } else {
          Console.log('Error', 'Failed to fetch nurse schedules');
        }
      } catch (error) {
        console.error('Error fetching nurse schedules:', error.message);
        Console.log('Error', 'Failed to fetch nurse schedules');
      }
    };

    fetchNurseSchedules();
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
  const handleCheckDay = (day) => {
    const isSelected = checkDay.includes(day);
  
    if (isSelected) {
      // If the day is already selected, unselect it and all the checkboxes for that day
      setCheckDay(checkDay.filter(selectedDay => selectedDay !== day));
      const newSelectedDays = { ...selectedDays };
  
      // Unselect all checkboxes for the clicked day
      for (const time of times) {
        if (newSelectedDays[time] && newSelectedDays[time].includes(day)) {
          newSelectedDays[time] = newSelectedDays[time].filter(d => d !== day);
        }
      }
  
      setSelectedDays(newSelectedDays);
    } else {
      // Otherwise, select the day and all the checkboxes for that day
      setCheckDay([...checkDay, day]);
      const newSelectedDays = { ...selectedDays };
  
      // Select all checkboxes for the clicked day
      for (const time of times) {
        if (!newSelectedDays[time]) {
          newSelectedDays[time] = [day];
        } else {
          newSelectedDays[time].push(day);
        }
      }
  
      setSelectedDays(newSelectedDays);
    }
  };

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
  
    const isSelected = checkDay.includes(day);
    if (isSelected) {
      setCheckDay(checkDay.filter(selectedDay => selectedDay !== day));
    } else {
      setCheckDay([...checkDay, day]);
    }
  };

  const UpdateSelection = async() => {
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
      const response = await fetch(`${ip}Nurse/UpdateNurseSchedules`, {
        method: 'PUT',
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

            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.headerTestTouchable,
                  checkDay.includes(day) && styles.selectedDayHeader,
                ]}
                onPress={() => handleCheckDay(day)}
              >
                <Text
                  key={day}
                  style={[
                    styles.headerText,
                    checkDay.includes(day) && styles.selectedDayHeaderText,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView style={styles.scheduleScrollView}>
            {times.map(time => (
              <View style={styles.timeRow} key={time}>
                <Text style={styles.timeText}>{time}</Text>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <CheckBox
                    key={time + day}
                    value={checkDay.includes(day.toLowerCase()) || (selectedDays[time] && selectedDays[time].includes(day))}
                    onValueChange={() => handleDayChange(time, day)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonView}>
       <TouchableOpacity
  style={styles.button}
  onPress={() => {
    navigation.navigate('Report', { nurseID: nurseID });
  }}
>
  <Text style={styles.buttonText}>See Report</Text>
</TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={UpdateSelection}>
            <Text style={styles.buttonText}>Update Schedule</Text>
          </TouchableOpacity> */}
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
  headerTestTouchable: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  selectedDayHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  selectedDayHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    color: 'green',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    color: 'blue',
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
