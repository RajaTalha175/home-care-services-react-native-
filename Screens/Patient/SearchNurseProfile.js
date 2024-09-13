import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const NurseProfile = ({ navigation }) => {
  const route = useRoute();
  const { nurses, AppointDetail } = route.params;
  const ip=apiEndpoint.apiEndpoint;
  const [nurseProfile, setNurseProfile] = useState(null);
  const [appointDetails, setappointDetails] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('Daily');
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [servicePackages, setServicePackages] = useState(null);
  const handleScheduleSelection = (scheduleID) => {
    // Check if the scheduleID is already in the selectedSchedules array
    const isSelected = selectedSchedule.includes(scheduleID);
  
    // If selected, remove it; if not selected, add it to the array
    if (isSelected) {
      setSelectedSchedule((prevSelected) =>
        prevSelected.filter((id) => id !== scheduleID)
      );
    } else {
      setSelectedSchedule((prevSelected) => [...prevSelected, scheduleID]);
    }
  };
  useEffect(() => {
    if (!nurses || !AppointDetail) {
      console.error('1. nurseProfile or appointDetails is null');
      navigation.goBack();
    } else {
      setNurseProfile(nurses);
      setappointDetails(AppointDetail);
  
      console.log('////////////////');
      console.log('Recived Nuse is:', NurseProfile);
      console.log('Recived Data is:', appointDetails); // Log the entire route params
    }
  }, [nurses, AppointDetail, navigation]);
  useEffect(() => {
    const fetchNurseServicePackages = async () => {
      try {
        const response = await fetch(`${ip}Search/GetNurseServicePakages?NurseID=${nurseProfile.NurseID}&ServiceName=${appointDetails.ServiceName}`);
        const data = await response.json();

        if (response.ok) {
          setServicePackages(data);
        } else {
          console.error('Failed to fetch nurse service packages:', data);
        }
      } catch (error) {
        console.error('Error fetching nurse service packages:', error);
      }
    };
    if (nurseProfile && appointDetails) {
      fetchNurseServicePackages();
    }
  }, [nurseProfile, appointDetails, ip]);
  
  useEffect(() => {
    const fetchNurseSchedules = async () => {
      try {
        // Check if nurseProfile and appointDetails are not null before making the API call
        if (!nurseProfile || !appointDetails) {
          console.log('2. nurseProfile or appointDetails is null');
          return;
        }
  
        const apiUrl = `${ip}Search/NurseScheduleShow?NurseID=${nurseProfile.NurseID}&dateFrom=${appointDetails.AppointDetail.datefrom}&dateTo=${appointDetails.AppointDetail.dateto}`;
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        // Check if the API call was successful and update the schedules state
        if (response.ok) {
          setSchedules(data);
        } else {
          console.error('Failed to fetch nurse schedules:', data);
          // Handle error as needed
        }
      } catch (error) {
        console.error('Error fetching nurse schedules:', error);
        // Handle error as needed
      }
    };
  
    // Call the fetchNurseSchedules function
    fetchNurseSchedules();
  }, [nurseProfile, appointDetails, ip]);
  
  
  
   
  
  const handlePackageSelection = (packageType) => {
    setSelectedPackage(packageType);
  };

  const handleBookNow = async () => {
    try {
      
  
      const userData = {
        AppointmentID: appointDetails.AppointDetail.AppointmentID,
        PatientID: appointDetails.AppointDetail.PatientID,
        NurseID: nurseProfile.NurseID,
        ServiceName: appointDetails.ServiceName,
        Distance: nurseProfile.Distance,
        datefrom: appointDetails.AppointDetail.datefrom,
        dateto: appointDetails.AppointDetail.dateto,
        Status: 'Pending',
        selectedPackage: selectedPackage,
        selectedSchedule: selectedSchedule,
      };
      console.log('$$$$$$$$$$$$$');
  console.log('Sending Data is:',userData);
      const response = await fetch(`${ip}Search/AddAppointnment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        navigation.navigate('phome', { UserID: data });
      } else {
        console.error('Error adding appointment. Status:', response.status);
        console.log('Error', 'Failed to add appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      console.log('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  



  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutIcon}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../Assets/backarrow.png')}
            style={styles.logoutIconImage}
          />
        </TouchableOpacity>

        <Text style={styles.header}>Nurse Profile</Text>

        {nurseProfile && (
          <View style={styles.profileContainer}>
            {/* Nurse's image on the left */}
            <View style={styles.imageContainer}>
              <Image
                 source={{ uri: `data:image/png;base64,${nurseProfile.Baseimage64}` }}
                style={styles.image}
              />
            </View>

            {/* Nurse's details on the right */}
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{nurseProfile.FullName}</Text>
              <Text style={styles.details}>PhoneNo: {nurseProfile.PhoneNo}</Text>
            </View>
          </View>
        )}

        {/* Service Packages */}
        {/* Service Packages */}
        <View style={styles.packageContainer}>
  <Text style={styles.packageTitle}>Select Service Packages</Text>

  {/* Check if servicePackages is available */}
  {servicePackages && servicePackages.DailyPrice !== null && (
    <>
      {/* Daily Package */}
      <View style={styles.priceContainer}>
        <Text style={styles.packagetextstyle}>Daily Package: <Text style={styles.priceText}>{servicePackages.DailyPrice}</Text></Text>
        <TouchableOpacity
          style={[
            styles.packageButton,
            selectedPackage === 'Daily' && styles.selectedPackageButton,
          ]}
          onPress={() => handlePackageSelection('Daily')}
        >
          <Text style={styles.packageButtonText}>Daily</Text>
        </TouchableOpacity>
      </View>
    </>
  )}

  {servicePackages && servicePackages.WeeklyPrice !== null && (
    <>
      {/* Weekly Package */}
      <View style={styles.priceContainer}>
        <Text style={styles.packagetextstyle}>Weekly Package: <Text style={styles.priceText}>{servicePackages.WeeklyPrice}</Text></Text>
        <TouchableOpacity
          style={[
            styles.packageButton,
            selectedPackage === 'Weekly' && styles.selectedPackageButton,
          ]}
          onPress={() => handlePackageSelection('Weekly')}
        >
          <Text style={styles.packageButtonText}>Weekly</Text>
        </TouchableOpacity>
      </View>
    </>
  )}

  {servicePackages && servicePackages.MonthlyPrice !== null && (
    <>
      {/* Monthly Package */}
      <View style={styles.priceContainer}>
        <Text style={styles.packagetextstyle}>Monthly Package: <Text style={styles.priceText}>{servicePackages.MonthlyPrice}</Text></Text>
        <TouchableOpacity
          style={[
            styles.packageButton,
            selectedPackage === 'Monthly' && styles.selectedPackageButton,
          ]}
          onPress={() => handlePackageSelection('Monthly')}
        >
          <Text style={styles.packageButtonText}>Monthly</Text>
        </TouchableOpacity>
      </View>
    </>
  )}

  {/* Packages are not available */}
  {(!servicePackages || (servicePackages.DailyPrice === null && servicePackages.WeeklyPrice === null && servicePackages.MonthlyPrice === null)) && (
    <Text style={styles.packagetextstyle}>Packages are not available.</Text>
  )}
</View>

         {/* Black Line */}
         <View style={styles.blackLine}></View>
         {/* Schedules */}
         <View style={styles.scheduleContainer}>
  <ScrollView style={styles.schedulescrollview}>
    {/* Schedule Header */}
    <View style={styles.scheduleHeader}>
      <Text style={[styles.headerText, styles.headerSelect]}>Select</Text>
      <Text style={[styles.headerText, styles.headerTime]}>Time</Text>
      <Text style={[styles.headerText, styles.headerDays]}>Days</Text>
      <Text style={[styles.headerText, styles.headerStatus]}>Status</Text>
    </View>

    {/* Schedule Items */}
    {schedules.map((schedule) => (
      <View key={schedule.ScheduleID} style={styles.scheduleItem}>
        <CheckBox
          value={selectedSchedule.includes(schedule.ScheduleID)}
          onValueChange={() => handleScheduleSelection(schedule.ScheduleID)}
        />
        <Text style={styles.scheduleTime}>{schedule.DateTime}</Text>
        <Text style={styles.scheduleDays}>{getFormattedWeekDays(schedule)}</Text>
        {schedule && schedule.AppointmentSchedules && schedule.AppointmentSchedules.length < 1 ? (
          <Text style={styles.scheduleAvailability}>Available</Text>
        ) : (
          <Text style={styles.scheduleAvailabilityRed}>Doesn't Have any Available Slots</Text>
        )}
      </View>
    ))}
  </ScrollView>
</View>
{/* Button */}
<View style={styles.bookNowContainer}>
    <TouchableOpacity
      style={styles.bookNowButton}
      onPress={handleBookNow}
    >
      <Text style={styles.bookNowButtonText}>Book Now</Text>
    </TouchableOpacity>
  </View>
      </View>
    </ImageBackground>
  );
};
const getFormattedWeekDays = (schedule) => {
  const weekdays = [];
  for (let i = 1; i <= 7; i++) {
    const day = schedule[`WeekDay${i}`];
    if (day) {
      weekdays.push(day.trim());
    }
  }
  return weekdays.join(', ');
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 90,
  },
  logoutIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginLeft: 5,
  },
  logoutIconImage: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
    marginBottom:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight:50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  
  selectedPackageContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  packageButton: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'blue', // Set initial background color
  },
  packageButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  selectedPackageButton: {
    backgroundColor: 'green',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  packagetextstyle: {
    color: 'black',          // Set text color to black
    textAlign: 'center',
    fontSize: 18,             // Set font size to your desired size
    fontWeight: 'bold',
    marginRight:70,
  },
  
  
  blackLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 20,
    marginBottom: 30,
  },

  scheduleContainer: {
    marginTop: 20,
    maxHeight: 300,
  },
  
  schedulescrollview: {
   marginTop:-40,
   height:210,
  },

  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'lightgray',
  },

  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  headerSelect: {
    flex: 1,
    textAlign: 'center',
  },

  headerTime: {
    flex: 2,
    textAlign: 'center',
  },

  headerDays: {
    flex: 2,
    textAlign: 'center',
  },

  headerStatus: {
    flex: 2,
    textAlign: 'center',
  },

  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxLabel: {
    marginLeft: 5,
  },

  scheduleTime: {
    fontSize: 18,
    flex: 2,
    textAlign: 'center',
  },

  scheduleDays: {
    fontSize: 16,
    flex: 2,
    textAlign: 'center',
  },

  scheduleAvailability: {
    color: 'green',
    fontSize: 16,
    flex: 2,
    textAlign: 'center',
  },

  scheduleAvailabilityRed: {
    color: 'red',
    fontSize: 16,
    flex: 2,
    textAlign: 'center',
  },
  bookNowContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  bookNowButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  bookNowButtonText: {
    color: 'white',
    fontSize: 16,
  }, 
});

export default NurseProfile;
