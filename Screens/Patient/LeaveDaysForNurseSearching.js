import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const SearchList = ({ navigation }) => {
  const route = useRoute();
  const ip = apiEndpoint.apiEndpoint;
  const {PatientID, sendingData}=route.params;
  
  const [ReceivedData, setReceivedData] = useState(null);


    const fetchData = async () => {
      if (sendingData !== null) {
        try {
          console.log(`Sending Data Is:${ip}Patient/PatientSearchNurses?serviceName=${sendingData.ServiceName}&patientID=${PatientID}`)
          const response = await fetch(`${ip}Patient/PatientSearchNurses?serviceName=${sendingData.ServiceName}&patientID=${PatientID}`);
  
          if (response.ok) {
            const result = await response.json();
  
            if (result.length > 0) {
              console.log('Data From Api:', result);
              setReceivedData(result);
              navigation.navigate('psearchlist', { sendingData: sendingData });
            }
          } else {
            console.log('Error searching for nurses:', response.status);
            console.log('Error searching for nurses. Please try again.');
          }
        } catch (error) {
          console.log(`Error searching for nurses:, ${error.message}`);
          console.log('Error searching for nurses. Please try again.');
        }
      } 
    };
    useEffect(() => {
    fetchData();
  }, [sendingData]);
  

 

  const getStarImages = (rating) => {
    const yellowStar = require('../Assets/yellowratingstar.png');
    const grayStar = require('../Assets/ratingstar.png');
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? yellowStar : grayStar);
    }

    return stars;
  };

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        {/* Patient's Image and Bell Icon */}
        <View style={styles.imageBellContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../Assets/backarrow.png")}
              style={styles.nurseImage}
            />
          </TouchableOpacity>
          <Text style={styles.searchtextstyle}>Search List</Text>
        </View>

        {/* "My Appointments" and "See All" */}
        <View style={styles.appointmentContainer}>
          <Text style={styles.appointmentText}>Near By Nurses:</Text>
        </View>
        <View style={styles.separator} />

        {/* nurse List */}
        <ScrollView style={styles.appointmentListScrollView}>
  <View style={styles.appointmentListContainer}>
    {ReceivedData && ReceivedData.map(data => (
      <View key={data.PatientID} style={styles.appointmentListItem}>
        {/* Rectangular box for nurse details */}
        <View style={styles.appointmentDetailsBox}>
          {/* Additional information if needed */}
         
          {/* Iterate over the "Nurses" array */}
          {data.Nurses && data.Nurses.map(nurse => (
            <View key={nurse.NurseID}>
              {/* First row with nurse date */}
              <View style={styles.appointmentRow}>
                <Text style={{ color: 'black', fontSize: 18 }}>Appointment Date:</Text>
              </View>

              {/* Second row with date range and status */}
              <View style={styles.appointmentRow}>
                <Image source={require('../Assets/historyicon.png')} style={styles.clockIcon} />
                <Text style={styles.dateText}>{`${sendingData.datefrom} To ${sendingData.dateto}`}</Text>
              </View>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.appointmentStatus,
                    {
                      backgroundColor: 'green',
                    },
                  ]}
                >
                  <TouchableOpacity 
                     onPress={() => {
                      console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
                      console.log('Details is:', {
                        AppointDetail: sendingData,
                        ServiceName: data.ServiceName,
                      });
                      
                      navigation.navigate('nurseprofleleave', { 
                      nurses: nurse,
                      AppointDetail: {
                        AppointDetail: sendingData,
                        ServiceName: data.ServiceName,
                        PatientID:PatientID,
                      },
                     }
                    )
                    }
                     }
                  >
                    <Text style={{ color: 'white' }}>See Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Black color line */}
              <View style={styles.blackLine} />

              {/* Third row with History icon, patient image, patient name, and service name */}
              <View style={styles.appointmentRow}>
                <Image
                  source={{ uri: `data:image/png;base64,${nurse.Baseimage64}` }}
                  style={styles.patientImage}
                />
                <View>
                  <Text>{`PatientID: ${data.PatientID}`}</Text>
                  <Text>{`Nurse: ${nurse.NurseID}`}</Text>
                  <Text>{`Nurse: ${nurse.FullName}`}</Text>
                  {/* Add additional information if needed */}
                  <Text>{`Service: ${data.ServiceName}`}</Text>
                  <Text>{`Distance: ${nurse.Distance}`}</Text>
                  <View style={styles.appointmentRow}>
                    {/* Render star images based on the rating */}
                    {getStarImages(nurse.Rating).map((star, index) => (
                      <Image key={index} source={star} style={styles.ratingStar} />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
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
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 25,
  },
  searchtextstyle: {
  fontSize:26,
  color:'black',
  fontWeight:'bold',
  marginTop:10,
  marginRight:90,
  },
  imageBellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
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
    
  },
  nurseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bellIcon: {
    width: 50,
    height: 50,
  },
  dateText: {
    marginLeft: 5, // Adjust this margin based on your preference
  },
  clockIcon: {
    width: 20,
    height: 20,
  },
  backgroundImage: {
    flex: 1,
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
  appointmentDetailsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentStatus: {
    padding: 5,
    borderRadius: 5,
    marginRight:30,
  },
  blackLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  statusRow: {// Align status to the right side
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align status to the right side
    marginTop: -60,
    marginBottom:30,
    marginRight:-15,
    
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 30,
  },
  editIconContainer: {
    marginLeft: 'auto', // Align to the right
  },
  editIcon: {
    width: 30,
    height: 30,
    marginRight: 32,
  },

  rectangularBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginTop: 10,
    marginBottom:25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 10,
    marginTop:20,
  },
  icon: {
    
    width: 30,
    height: 30,
  },
  ratingStar: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default SearchList;
