import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import apiEndpoint from '../IpFIle';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceList = () => {
  const ip = apiEndpoint.apiEndpoint;

  const navigation = useNavigation();
  const route = useRoute();
  const { NurseID } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(selectedDateFrom);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);
  const [isDateFrom, setIsDateFrom] = useState(true);
  const [nurseAppointments, setNurseAppointments] = useState([]);

  useEffect(() => {
    if (NurseID !== null) {
      console.log("NurseID:", NurseID);
    } else {
      navigation.goBack();
    }

    if (selectedDateFrom && selectedDateTo) {
      const fetchData = async () => {
        try {
          setNurseAppointments([]);
          const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${month}/${day}/${year}`;
          };
          
          const formattedDateFrom = formatDate(selectedDateFrom);
          const formattedDateTo = formatDate(selectedDateTo);
          
          const response = await fetch(
            `${ip}Nurse/ApplyLeaveForNurse?NurseID=${NurseID}&datefrom=${formattedDateFrom}&dateto=${formattedDateTo}`
          );
          
          console.log(`Sending Data is :  ${ip}Nurse/ApplyLeaveForNurse?NurseID=${NurseID}&datefrom=${formattedDateFrom}&dateto=${formattedDateTo}`);
          
          
          
          if (!response.ok) {
            setLoading(true);
            throw new Error(`Error: ${response.statusText}`);
          }
          setLoading(false);
          const data = await response.json();
          setNurseAppointments(data);
          console.log('Appointment Data:', data);
        } catch (error) {
          console.log('Error fetching data:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [NurseID, selectedDateFrom, selectedDateTo]);

  const handleDateChange = (event, selectedDate) => {
    setIsVisibleDatePicker(false);

    if (selectedDate !== undefined) {
      if (isDateFrom) {
        setSelectedDateFrom(selectedDate);
        setSelectedDateTo(selectedDate);
      } else {
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

 
  const handleSaveButton = async (appointment) => {
    if (appointment!==null) {
      
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
      };
      
      const formattedDateFrom = formatDate(selectedDateFrom);
      const formattedDateTo = formatDate(selectedDateTo);
    
      const userDataArray = {
        AppointID: appointment.AppointmentID,
        DateFrom: formattedDateFrom, 
        DateTo: formattedDateTo,
        Status:"Checked"
      };
      console.log('Leave Data:',userDataArray);
      try{
      const response = await fetch(`${ip}Nurse/AddNurseLeave`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataArray),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Leave Resposne Data:', data);
      const sendingData={
        PatientID:appointment.PatientID,
        NurseID:NurseID,
        ServiceName:appointment.ServiceName,
        datefrom:formattedDateFrom,
        dateto:formattedDateTo,
        NurseID:NurseID,
        NurseleaveID:data
       }
      console.log('sending Data Data:', sendingData);
      navigation.navigate('handoverlist', {sendingData: sendingData });
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  } else {
    Alert.alert('No Appointments Selected', 'Please select at least one appointment to apply leave.');
  }
};
  
  
  

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.HeaderContainer}>
          <Text style={styles.title}>Nurse Apply Leave</Text>

          <Text style={styles.preferredTimeLabel}>
            Select Your Leave DateTime:
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
        <View style={styles.blackLine} />

        {loading ? (
          <Text style={styles.loadingText}>Please wait for a few seconds...</Text>
        ) : null}

        <ScrollView style={styles.appointmentListScrollView}>
          <View style={styles.appointmentListContainer}>
            {nurseAppointments.map(appointment => (
              <View key={appointment.AppointmentID} style={styles.appointmentListItem}>
             {/* <CheckBox
  value={selectedAppointments.includes(appointment.AppointmentID)}
  onValueChange={() => handleAppointmentSelection(appointment.AppointmentID)}
  style={styles.checkBoxContainer}
/> */}
                <View style={styles.appointmentDetailsBox}>
                  <View style={styles.appointmentRow}>
                    <Text style={{ color: 'black', fontSize: 18 }}>Appointment Date:</Text>
                  </View>

                  <View style={styles.appointmentRow}>
                    <Image source={require('../Assets/historyicon.png')} style={styles.clockIcon} />
                    <Text style={styles.dateText}>{`${appointment.DateFrom} To ${appointment.DateTo}`}</Text>
                  </View>
                 <View style={styles.statusRow}>
  <View
    style={[
      styles.appointmentStatus,
      {
        backgroundColor: 'red',
      },
    ]}
  >
    <TouchableOpacity onPress={()=>handleSaveButton(appointment)}>
      <Text style={{ color: 'white' }}>Handover</Text>
    </TouchableOpacity>
  </View>
</View>

                  <View style={styles.blackLine} />

                  <View style={styles.appointmentRow}>
                    <Image source={{ uri: `data:${appointment.Type};base64,${appointment.ImageBase64}` }} style={styles.patientImage} />
                    <View>
                      <Text style={{color:'black',fontWeight:'bold',left:70}}>{`${appointment.PatientName}`}</Text>
                      <Text>{`Patient Gender: ${appointment.PatientGender}`}</Text>
                      <Text>{`Service Name: ${appointment.ServiceName}`}</Text>
                      <Text >{`Location Distance: ${appointment.Distance}`}</Text>
                      <Text style={{width:210}}>{`${appointment.daydetail}`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
  <Text style={styles.saveButtonText}>Apply</Text>
</TouchableOpacity> */}

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
  HeaderContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  preferredTimeLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  scheduleIcon: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  blackLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  appointmentListScrollView: {
    flex: 1,
    marginBottom: 20,
    marginTop: 40,
  },
  clockIcon: {
    width: 20,
    height: 20,
  },
  appointmentListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentDetailsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    borderLeftColor: 'blue',
    borderLeftWidth: 5,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentListContainer: {
    marginTop: 20,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: 100,
    marginTop: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -60,
    marginBottom: 30,
    marginRight: -15,
  },
  appointmentStatus: {
    padding: 5,
    borderRadius: 5,
    marginRight: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServiceList;
