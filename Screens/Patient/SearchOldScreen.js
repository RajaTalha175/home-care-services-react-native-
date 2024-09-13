import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const LoginScreen = ({ navigation }) => {
  const route = useRoute();
  const AppointmentID = route.params.AppointmentID || 0;
  const UserID = route.params?.UserID;
  const ip=apiEndpoint.apiEndpoint;
  const [role, setRole] = useState('Service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedHealthAgency, setSelectedHealthAgency] = useState(null);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);

  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(selectedDateFrom);
  const [isDateFrom, setIsDateFrom] = useState(true);
 
  const [services, setServices] = useState([]);
  const [healthAgencies, setHealthAgencies] = useState([]);
  const [radius, setRadius] = useState('');
  const [price, setPrice] = useState('');
  const [selectedPriceOption, setSelectedPriceOption] = useState('greater');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services data
        const servicesResponse = await fetch(`${ip}Nurse/GetServices`);
        if (servicesResponse.status === 200) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
          console.log('Response Status:',servicesResponse.status);
          console.log('Services Data:',services);
        } else {
          console.error('Failed to fetch services data');
        }
  
        // Fetch health agencies data
        const healthAgenciesResponse = await fetch(`${ip}Nurse/GetHealthAgency`);
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
useEffect(()=>{
  if(UserID==null){
navigation.goBack();
  }
  console.log('PatientID is :', UserID);
}, [UserID]);

  
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
    const userData={
      AppointmentID:AppointmentID,
      PatientID:UserID,
      ServiceID:selectedService,
      HealthagencyID:selectedHealthAgency,
      Male:isMaleSelected,
      Female:isFemaleSelected,
      datefrom:selectedDateFrom.toLocaleDateString(),
      dateto:selectedDateTo.toLocaleDateString(),
      radius:radius,
      price:price,
      pricestatus:selectedPriceOption,
     }
    

    console.log('Searching....');
    console.log(userData);
    
   
        // if (userData !== null) {
        //    navigation.navigate('psearchlist', { sendingData: userData });
        // }

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

            
           {/* New View for Radius and Price */}
  <View style={styles.radiusPriceContainer}>
    {/* Radius TextInput */}
    <View style={styles.textInputContainer}>
    <TextInput
        style={styles.textInput}
        placeholder="Enter Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      {/* Picker for Greater/Less */}
      <Picker
        style={styles.pricepicker}
        selectedValue={selectedPriceOption}
        onValueChange={(itemValue) => setSelectedPriceOption(itemValue)}
      >
        <Picker.Item label="Greater" value="greater" />
        <Picker.Item label="Less" value="less" />
      </Picker>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Radius"
        value={radius}
        onChangeText={(text) => setRadius(text)}
      />
    
      
    </View>
  </View> 

           
            
          </View>
        
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
    marginTop: 80,
    marginBottom:-20,

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
  radiusPriceContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 20,
    marginBottom:20
  },
  textInput: {
    width: 180,
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    fontSize: 16,
    marginBottom:10
  },
  pricepicker:{
  width: '45%',
  height: 40,
  position:'absolute',
  borderWidth: 7,
  borderRadius: 10,
  borderColor: 'blue',
  marginLeft:180,
  }
});
export default LoginScreen;