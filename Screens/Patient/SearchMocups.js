import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState('Service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHealthAgency, setSelectedHealthAgency] = useState(null);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);

  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(selectedDateFrom);
  const [isDateFrom, setIsDateFrom] = useState(true);
  const [selectedTimeType, setSelectedTimeType] = useState('');
  const [isPreferredTimePickerVisible, setIsPreferredTimePickerVisible] = useState(false);
  const [selectedOnceTime, setSelectedOnceTime] = useState('');
  const [selectedDifferentTime, setSelectedDifferentTime] = useState('');
  const [selectedDays, setSelectedDays] = useState({});
  const [services, setServices] = useState([]);
  const [healthAgencies, setHealthAgencies] = useState([]);
  const times = [
    '6am-7am', '7am-8am', '8am-9am', '9am-10am', '10am-11am', '11am-12pm',
    '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '4pm-5pm', '5pm-6pm',
    '6pm-7pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm', '11pm-12am',
    '12am-1am', '1am-2am', '2am-3am', '3am-4am', '4am-5am', '5am-6am'
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services data
        const servicesResponse = await fetch('http://192.168.36.21/HomeCareServices/api/Nurse/GetServices');
        if (servicesResponse.status === 200) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
          console.log('Response Status:',servicesResponse.status);
          console.log('Services Data:',services);
        } else {
          console.error('Failed to fetch services data');
        }
  
        // Fetch health agencies data
        const healthAgenciesResponse = await fetch('http://192.168.36.21/HomeCareServices/api/Nurse/GetHealthAgency');
        if (healthAgenciesResponse.status === 200) {
          const healthAgenciesData = await healthAgenciesResponse.json();
          setHealthAgencies(healthAgenciesData);
          console.log('Response Status:',healthAgenciesResponse.status);
          console.log('HealthAgency Data:', healthAgencies);
        } else {
          console.error('Failed to fetch health agencies data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


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
  const calculateDayLabels = (dateFrom, dateTo) => {
    console.log('DateFrom:', dateFrom.getDate());
    console.log('DateTo:', dateTo.getDate());
  
    const dayDifference = Math.round((dateTo - dateFrom) / (1000 * 60 * 60 * 24));
    
   console.log('DaysDifference:',dayDifference);
    if (dayDifference === 0) {
      console.log('Today Name:',getDayName(dateFrom));
      return [getDayName(dateFrom)];
      
    } else if (dayDifference >= 1 && dayDifference <= 6) {
      const daysInRange = [];
      for (let i = 0; i <= dayDifference; i++) {
        const currentDate = new Date(dateFrom);
        currentDate.setDate(dateFrom.getDate() + i);
        daysInRange.push(getDayName(currentDate));
      }
      return daysInRange;
    } else if (dayDifference > 6 ) {
      const daysInRange = [];
      for (let i = 0; i <= dayDifference; i++) {
        const currentDate = new Date(dateFrom);
        currentDate.setDate(dateFrom.getDate() + i);
        daysInRange.push(getDayName(currentDate));
      }
      return daysInRange.slice(0, 7); 
    }
  };
  
  const getDayName = (date) => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  };
  const handleDateChange = (event, selectedDate) => {
    setIsVisibleDatePicker(false);

    if (selectedDate !== undefined) {
      if (isDateFrom) {
        setSelectedDateFrom(selectedDate);
        // Automatically set Date To to the next day
        // const nextDate = new Date(selectedDate);
        // nextDate.setDate(nextDate.getDate() + 1);
        
        //nextDate.setDate(nextDate.getDate() + 1);

      // Next month
      //nextDate.setMonth(nextDate.getMonth() + 1);

      // Next year
     // nextDate.setFullYear(nextDate.getFullYear() + 1);
        setSelectedDateTo(selectedDate);
      } else {
        // Check if Date To is after Date From
        if (selectedDate > selectedDateFrom) {
          setSelectedDateTo(selectedDate);
        } else {
          Alert.alert('Invalid Date', 'Date To must be after Date From');
        }
      }
    }
  };

  const openDatePicker = (isDateFrom) => {
    setIsDateFrom(isDateFrom);
    setIsVisibleDatePicker(true);
  }
  const handleSearch = async() => {
    
    
    
    let schedule = {};

if (selectedOnceTime !== '') {
  
  const dayDifference = Math.round((selectedDateTo - selectedDateFrom) / (1000 * 60 * 60 * 24));
  const daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInRange = [];

  for (let i = 0; i <= dayDifference; i++) {
    const currentDate = new Date(selectedDateFrom); // Pass the full date string
    currentDate.setDate(selectedDateFrom.getDate() + i);
    const dayName = daysname[currentDate.getDay()]; // Use square brackets to access array elements
    daysInRange.push(dayName);
  }

  const totaldays = daysInRange.slice(0, 7); 
  schedule.DateTme = selectedOnceTime;
  console.log('Daysname are Here', totaldays);

  for (let i = 0; i < totaldays.length; i++) {
    
    
    switch (totaldays[i]) {
      case 'Mon':
        schedule.WeekDay1 = 'Monday';
        break;
      case 'Tue':
        schedule.WeekDay2 = 'Tuesday';
        break;
      case 'Wed':
        schedule.WeekDay3 = 'Wednesday';
        break;
      case 'Thu':
        schedule.WeekDay4 = 'Thursday';
        break;
      case 'Fri':
        schedule.WeekDay5 = 'Friday';
        break;
      case 'Sat':
        schedule.WeekDay6 = 'Saturday';
        break;
      case 'Sun':
        schedule.WeekDay7 = 'Sunday';
        break;
      default:
        break;
    }
  }
}
let schedule1={};
if (selectedDays !== null) {
  schedule1 = Object.keys(selectedDays).map((time) => {
    const Days = selectedDays[time]; 

    const daySchedule = {};
    
    Days.forEach((day) => {
      switch (day) {
        case 'Mon':
          daySchedule.WeekDay1 = 'Monday';
          break;
        case 'Tue':
          daySchedule.WeekDay2 = 'Tuesday';
          break;
        case 'Wed':
          daySchedule.WeekDay3 = 'Wednesday';
          break;
        case 'Thu':
          daySchedule.WeekDay4 = 'Thursday';
          break;
        case 'Fri':
          daySchedule.WeekDay5 = 'Friday';
          break;
        case 'Sat':
          daySchedule.WeekDay6 = 'Saturday';
          break;
        case 'Sun':
          daySchedule.WeekDay7 = 'Sunday';
          break;
        default:
          break;
      }
    });

    return {
      DateTime: time,
      ...daySchedule,
    };
  });
}


console.log('Schedule is here: ',schedule1);


    // console.log('Searching....');
    // console.log('Selected Role:', role);
    // console.log('Selected Service:', selectedService);
    // console.log('Selected Health Agency:', selectedHealthAgency);
    // console.log('Is Male Selected:', isMaleSelected);
    // console.log('Is Female Selected:', isFemaleSelected);
    // console.log('Selected Date From:', selectedDateFrom.toLocaleDateString());
    // console.log('Selected Date To:', selectedDateTo.toLocaleDateString());
    // console.log('Selected Days:', selectedOnceTime);
    // console.log('Selected Schedule Date & Time ', selectedDays);
    // console.log("Schedule OnceTime:", schedule);
    // console.log("Schedule DifferentTime:", schedule1);
    const userData={
      PatientID:7,
      ServiceID:selectedService,
      HealthagencyID:selectedHealthAgency,
     }
     if (isMaleSelected) {
      userData.Male = true;
    } 
     if (isFemaleSelected) {
      userData.Female = true;
    }
    if(schedule!==null){
      userData.Schedules=schedule;
    }if(schedule1!==null){
      userData.Schedules=schedule1;
    }


    console.log('Searching....');
    console.log(userData);
    try {
      const response = await fetch('http://192.168.126.21/HomeCareServices/api/Search/PatientSearchNurses', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Nurses found:', result);
        // Handle the result as needed
      } else {
        console.error('Error searching for nurses:', response.status);
        Alert.alert('Error searching for nurses. Please try again.');
      }
    } catch (error) {
      console.error('Error searching for nurses:', error.message);
      Alert.alert('Error searching for nurses. Please try again.');
    }
  };

 

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../Assets/backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Nurse</Text>
        <View style={styles.divider}></View>
        <ScrollView style={styles.scrollView} >
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Search By:</Text>
            <View style={styles.radioContainer}>
              {['Service', 'HealthAgency', 'Both'].map((item) => (
                <View key={item} style={styles.radioButton}>
                  <RadioButton
                    value={item}
                    status={role === item ? 'checked' : 'unchecked'}
                    onPress={() => setRole(item)}
                    color="blue"
                  />
                  <Text style={styles.radioLabel}>{item}</Text>
                </View>
              ))}
            </View>

            {(role === 'Service' || role === 'Both') && (
              <Picker
                style={styles.picker}
                selectedValue={selectedService}
                onValueChange={(itemValue) => setSelectedService(itemValue)}
              >
                <Picker.Item label={`Select ${role === 'Both' ? 'Service' : ''}`} value="" />
                {services.map((service) => (
                  <Picker.Item
                    key={service.ServiceID}
                    label={service.Name}
                    value={service.ServiceID}
                  />
                ))}
              </Picker>
            )}

{(role === 'HealthAgency' || role === 'Both') && (
              <Picker
                style={styles.picker}
                selectedValue={selectedHealthAgency}
                onValueChange={(itemValue) => setSelectedHealthAgency(itemValue)}
              >
                <Picker.Item label={`Select Health Agency`} value="" />
                {healthAgencies.map((agency) => (
                  <Picker.Item
                    key={agency.HealthagencyID}
                    label={agency.Name}
                    value={agency.HealthagencyID}
                  />
                ))}
              </Picker>
            )}

            {/* Gender Checkboxes */}
            <Text style={styles.inputLabel}>Select Gender:</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                title="Male"
                value={isMaleSelected}
                onValueChange={() => setIsMaleSelected(!isMaleSelected)}
                style={styles.checkbox}
              />
              <Text style={[styles.checkboxText, styles.checkboxTextRightMargin]}>
                Male
              </Text>
              <CheckBox
                title="Female"
                value={isFemaleSelected}
                onValueChange={() => setIsFemaleSelected(!isFemaleSelected)}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>Female</Text>
            </View>

            {/* Preferred Date Range */}
        <View style={styles.preferredTimeContainer}>
          <Text style={styles.preferredTimeLabel}>
            Your Preferred Date Range:
          </Text>
          <TouchableOpacity
            style={styles.scheduleIcon}
            onPress={() => openDatePicker(true)}
          >
            <Text style={{ fontSize: 16, color: 'black' }}>
              Select Date From: {selectedDateFrom.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scheduleIcon}
            onPress={() => openDatePicker(false)}
          >
            <Text style={{ fontSize: 16, color: 'black' }}>
              Select Date To: {selectedDateTo.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {/* Corrected DateTimePicker */}
          {isVisibleDatePicker && (
            <DateTimePicker
              value={isDateFrom ? selectedDateFrom : selectedDateTo}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

            
            

            {/* Preferred Time Picker */}
            <View style={styles.preferredTimeContainer}>
              <Text style={styles.preferredTimeLabel}>
                Select Preferred Time:
              </Text>

              <Picker
                style={styles.picker}
                selectedValue={selectedTimeType}
                onValueChange={(itemValue) => {
                  setSelectedTimeType(itemValue);
                }}
              >
                <Picker.Item label="Select" value="Select" />
                <Picker.Item label="Once" value="Once" />
                <Picker.Item label="Different" value="Different" />
              </Picker>

              {selectedTimeType === 'Once' ? (
                <Picker
                  style={styles.picker}
                  selectedValue={selectedOnceTime}
                  onValueChange={(itemValue) => setSelectedOnceTime(itemValue)}
                >
                  <Picker.Item  label='Select Your Time Solt' />
                  {times.map((time) => (
                    <Picker.Item key={time} label={time} value={time} />
                  ))}
                </Picker>
              ) : null}

{selectedTimeType === 'Different' ? (
  <View style={styles.DifferentContainer}>
    <View style={styles.differentheaderRow}>
      <Text style={[styles.differentheaderText, styles.timeLabel]}>Time</Text>
      {calculateDayLabels(selectedDateFrom, selectedDateTo).map(day => (
        <Text key={day} style={styles.differentheaderText}>
          {day}
        </Text>
      ))}
    </View>
    
      {times.map(time => (
        <View style={styles.timeRow} key={time}>
          <Text style={styles.timeText}>{time}</Text>
          {calculateDayLabels(selectedDateFrom, selectedDateTo).map(day => (
            <CheckBox
              key={time + day}
              value={selectedDays[time] && selectedDays[time].includes(day)}
              onValueChange={() => handleDayChange(time, day)}
            />
          ))}
        </View>
      ))}
  </View>
) : null}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
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
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop:12,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 10,
    marginTop: 30,
  },
  inputLabel: {
    color: 'black',
    fontSize: 24,
    marginRight: 170,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    color: 'black',
    fontSize: 16,
  },
  picker: {
    width: '50%',
  height: 40,
  marginBottom: 10,
  marginRight: 70,
  borderWidth: 7,
  borderRadius: 10,
  borderColor: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 8,
    marginTop: 18,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 12,
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'start',
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  checkboxTextRightMargin: {
    marginRight: 20,
  },
  preferredTimeLabel: {
    color: 'black',
    fontSize: 24,
    marginBottom: 10,
  },
  scheduleIcon: {
    fontSize: 16, // Adjusted font size
    color: 'black',
    marginBottom: 5,
    marginRight: 20,
  },
  timeTypeContainer: {
    marginBottom: 10,
  },
  DifferentContainer: {
    flex: 1,
    marginTop: 5, // Add margin top for spacing
  },
  differentheaderRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  differentheaderText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold', 
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  timeText: {
    
    fontSize: 16, 
    marginRight:5,
  },
  timeLabel: {
    flex: -1,
    marginRight:20,
    marginLeft: 5,
  fontWeight: 'bold', 
  
  },
  
  
});
export default LoginScreen;