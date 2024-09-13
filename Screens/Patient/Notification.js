import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';
import PatientProfile from './ProfileScreen';

const App = ({navigation}) => {
  const route = useRoute();
  const ip=apiEndpoint.apiEndpoint;
  const PatienID = route.params?.PatientID;
  const [appointmentList, setAppointmentList] = useState([
    // { AppointID: 1, nursename: 'John Doe', patientimage: '../Assets/serviceicon.png', Servicname: 'Woundcare', datefrom: '2023-01-01', dateto: '2023-01-05', appointstatus: 'Accepted' },
    // { AppointID: 2, nursename: 'Jane Smith', patientimage: '../Assets/serviceicon.png', Servicname: 'Woundcare', datefrom: '2023-02-01', dateto: '2023-02-10', appointstatus: 'Declined' },
    // { AppointID: 3, nursename: 'Bob Johnson', patientimage: '../Assets/serviceicon.png', Servicname: 'Woundcare', datefrom: '2023-03-01', dateto: '2023-03-15', appointstatus: 'Pending' },
  ]);

 
useEffect(()=>{
if(PatienID!==null){
  console.log('PatientID is:',PatienID);
}
}, [PatienID])
  
    const fetchPatientProfile = async () => {
      
      try {
        const response = await fetch(`${ip}Patient/GetNotifications?PatientID=${PatienID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        setAppointmentList(data);
      } catch (error) {
        console.error('Error fetching patient details:', error.message);
        // Handle error (e.g., show an error message to the user)
      }
    };
    useEffect(() => {
    fetchPatientProfile();
  }, [PatienID]);
  const handleleave=async(appointment)=>{
    if(appointment!==null)
    try {
      const response = await fetch(`${ip}Nurse/DeleteAlterNativeNurse?AppointID=${appointment.AppointmentID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }

      const data = await response.json();
      if(data){
        console.log('Rsponse leave data:',data);
      fetchPatientProfile();
      }
    } catch (error) {
      console.error('Error fetching patient details:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  }
 
  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        {/* Nurse's Image, Header Text, Bell Icon, and Circle Image */}
        <View style={styles.imageBellContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../Assets/backarrow.png")}
              style={styles.backarrow}
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Patient Notifications</Text>
          </View>

          
        </View>
        {/* "My Appointments" and "See All" */}
        <View style={styles.appointmentContainer}>
           </View>
        <View style={styles.separator} />
        
      {/* Appointment List */}
      <ScrollView style={styles.appointmentListScrollView}>
       <View style={styles.appointmentListContainer}>
       {appointmentList.map(appointment => (
  <View key={appointment.AppointmentID} style={styles.appointmentListItem}>
    <View style={styles.appointmentDetailsBox}>
      {/* First row with Appointment date */}
      <View style={styles.appointmentRow}>
        <Text style={{ color: 'black', fontSize: 18 }}>Appointment Date:</Text>
      </View>

      {/* Second row with date range, history icon, and status */}
      <View style={styles.appointmentRow}>
      <Image source={require('../Assets/historyicon.png')} style={styles.clockIcon} />
        <Text style={styles.dateText}>{`${appointment.DateTimeFrom} To ${appointment.DateTimeTo}`}</Text>
        
        {/* You can add status here if needed */}
      </View>
      {/* Black color line */}
      <View style={styles.blackLine} />

      {/* Third row with patient image, patient name, and service name */}
      <View style={styles.appointmentRow}>
  <Image source={{ uri: `data:${appointment.Type};base64,${appointment.ImageBase64}` }} style={styles.patientImage} />
  <View>
  {appointment.LeaveStatus !== null && appointment.LeaveStatus === 'Checked' ? (
      <Text>{`AlterNate Nurse: ${appointment.newnurse}`}</Text>
    ) : (
      <Text>{`Nurse: ${appointment.NurseName}`}</Text>
    )}
    <Text>{`Service: ${appointment.ServiceName}`}</Text>
    <Text>Appointment has been :<Text style={[styles.Status, { 
  color: appointment.Status === 'Accepted' ? 'green' : 
         (appointment.Status === 'Declined' ? 'red' : 
         (appointment.Status === 'Complete' ? 'yellow' : 'blue'))
}]}>
  {` ${appointment.Status}`}
</Text>
  </Text>
  {appointment.LeaveDateTimeFrom !== null && appointment.LeaveDateTimeTo !== null && appointment.LeaveStatus !== null && (
            <View>
              <Text>{`Leave From: ${appointment.LeaveDateTimeFrom}`}</Text>
              <Text>{`Leave To: ${appointment.LeaveDateTimeTo}`}</Text>
              <Text>Leave Status:<Text style={{ color: appointment.LeaveStatus === 'Checked' ? 'green' : 'red' }}>
                  {` ${appointment.LeaveStatus}`}
                  </Text>
              </Text>
            </View>
          )}
  </View>
  
</View>
 {/* Accept and Decline buttons */}
 {/* &&
      (new Date() < new Date(appointment.LeaveDateTimeFrom).toLocaleDateString() ||
        new Date().toLocaleDateString() ===
          new Date(appointment.LeaveDateTimeFrom).toLocaleDateString()) */}
  {appointment.LeaveStatus === 'Checked' && appointment.newnurse!==null
          && ( 
        <View style={styles.acceptDeclineContainer}>
          
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleleave(appointment)}
          >
            <Text style={styles.buttonText}>Reject AlterNativeNurse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
))}
</View>
</ScrollView>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  imageBellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    marginTop: 70,
  },
  backarrow: {
    width: 40,
    height: 40,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  bellIcon: {
    width: 40,
    height: 40,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
 separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    margin:8,
    marginTop:15,
  },
  appointmentListScrollView: {
    flex: 1,
    marginBottom: 20,
    marginTop:40, 
    
  },
  nurseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
 
  dateText: {
    marginLeft: 5, // Adjust this margin based on your preference
  },
  clockIcon: {
    width: 20,
    height: 20,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  appointmentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  seeAllText: {
    fontSize: 16,
    color: 'blue',
    marginRight: 30,
  },
  appointmentListContainer: {
    marginTop: 20,
  },
  appointmentListItem: {
    marginBottom: 10,
  },
  
  
  appointmentStatus: {
    padding: 5,
    borderRadius: 5,
    marginRight:30,
  },

  appointmentLabel: {
    color: 'black',
    fontSize: 18,
  },
  appointmentListItem: {
    marginBottom: 20,
  },
  appointmentDetailsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: '90%', // Adjust the width as per your preference
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    borderLeftColor: 'blue', // Add left border color
    borderLeftWidth: 5, // Add left border width
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  blackLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  patientDetails: {
    flex: 1,
    marginLeft: 10,
  },
  patientText: {
    fontSize: 16,
  },
  serviceText: {
    fontSize: 14,
    color: 'gray',
  },
  acceptDeclineContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft:10,
  },
  acceptButton: {
    height:35,
    width:70,
    borderRadius: 5,
    padding:7,
    backgroundColor: 'blue',
    marginLeft:10,
  },
  declineButton: {
    height:35,
    width:70,
    borderRadius: 5,
    borderRadius: 5,
    padding:7,
    backgroundColor: 'red',
    marginLeft:10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default App;