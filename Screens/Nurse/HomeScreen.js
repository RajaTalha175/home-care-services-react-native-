import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiEndpoint from '../IpFIle';
import { Picker } from '@react-native-picker/picker';

const App = ({ navigation }) => {
  const route = useRoute();
  const UserID = route.params?.UserID || 3120;
  const ip = apiEndpoint.apiEndpoint;
  const [onLoading, setOnLoading] = useState(false);
  const [nurseProfile, setNurseProfile] = useState(null);
  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerMode, setDatePickerMode] = useState('today');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchNurseProfile = async () => {
      console.log('Login Receive ID:', UserID);
      try {
        const response = await fetch(`${ip}Nurse/NurseDetail?UserID=${UserID}`);
        if (!response.ok) {
          console.log('Failed to fetch nurse details');
        }

        const data = await response.json();
        console.log(data);
        setNurseProfile(data);
      } catch (error) {
        console.log('Error fetching nurse details:', error.message);
      }
    };

    fetchNurseProfile();
  }, [UserID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sendingdata = {
          NurseUserID: nurseProfile?.UserID,
          AppointDate: selectedDate.toLocaleDateString().toString(),
          status: datePickerMode,
        };
        console.log('Sending Data', sendingdata);
        const response = await fetch(`${ip}Nurse/GetAppointment`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendingdata),
        });

        if (!response.ok) {
          console.log(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setOnLoading(true);

        if (data.Details.length === 0) {
          console.log('No appointments found.');
          setOnLoading(false);
        } else {
          setAppointmentList(data.Details);
        }
      } catch (error) {
        console.log('Error fetching data:', error.message);
        setOnLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, datePickerMode, nurseProfile]);

  const renderRatingStars = (r) => {
    const rating = r;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starImage =
        i <= rating
          ? require('../Assets/yellowratingstar.png')
          : require('../Assets/ratingstar.png');

      stars.push(
        <Image
          key={i}
          source={starImage}
          style={styles.ratingStar}
        />
      );
    }

    return stars;
  };
  

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <View style={styles.imageBellContainer}>
          {nurseProfile && nurseProfile.ImageType && nurseProfile.ImageBase64 && (
            <Image
              source={{ uri: `data:${nurseProfile.ImageType};base64,${nurseProfile.ImageBase64}` }}
              style={styles.nurseImage}
            />
          )}
          <TouchableOpacity onPress={() => navigation.navigate('nnotify', { NurseID: nurseProfile?.UserID })}>
            <Image
              source={require("../Assets/notificationicon.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentAndDatePickerContainer}>
          <View style={styles.appointmentContainer}>
            <Text style={styles.appointmentText}>My Appointments</Text>
          </View>

          <View style={styles.datePickerContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerButton}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={datePickerMode}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setDatePickerMode(itemValue)}
            >
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Past" value="past" />
              <Picker.Item label="Future" value="future" />
            </Picker>
          </View>
        </View>

        <View style={styles.separator} />
        {onLoading ? (
          <ScrollView style={styles.appointmentListScrollView}>
            {appointmentList.length > 0 ? (
              appointmentList.map(appointment => (
                <View key={appointment.AppointID} style={styles.appointmentListItems}>
                  <View style={styles.appointmentDetailsBox}>
                    <View style={styles.appointmentRow}>
                      <Text style={{ color: 'black', fontSize: 18 }}>Appointment Date:</Text>
                    </View>
                    <View style={styles.appointmentRow}>
                      <Image source={require('../Assets/historyicon.png')} style={styles.clockIcon} />
                      <Text style={styles.dateText}>{`${appointment.datefrom} To ${appointment.dateto}`}</Text>
                    </View>
                    <View style={styles.statusRow}>
                      <View
                        style={[
                          styles.appointmentStatus,
                          {
                            backgroundColor:
                              appointment.Status === 'Pending' ? 'blue' :
                                appointment.Status === 'Accepted' ? 'green' :
                                  appointment.Status === 'Completed' ? 'blue' :
                                    appointment.Status === 'Declined' ? 'red' :
                                      appointment.Status === 'Canceled' ? 'gray' :
                                        'default-color',
                          },
                        ]}
                      >
                        <Text style={{ color: 'white' }}>{appointment.Status}</Text>
                      </View>
                    </View>

                    <View style={styles.blackLine} />
                    <View style={styles.appointmentRow}>
                      <Image source={{ uri: `data:${appointment.ImageType};base64,${appointment.ImageBase64}` }} style={styles.patientImage} />
                      <View>
                        <Text>{`Patient: ${appointment.PatientName}`}</Text>
                        <Text>{`Nurse: ${appointment.NurseName}`}</Text>
                        <Text>{`Service: ${appointment.ServiceName}`}</Text>
                        <Text>{`Distance: ${appointment.Distance}`}</Text>
                        <Text>{`FeePakage: ${appointment.pakages} Price: ${appointment.FeePakagesPrice}`}</Text>
                        {appointment.leavedatefrom && (
                          <Text style={{ color: 'red' }}>{`Leave Date From: ${appointment.leavedatefrom}`}</Text>
                        )}
                        {appointment.leavedateto && (
                          <Text style={{ color: 'red' }}>{`Leave Date To: ${appointment.leavedateto}`}</Text>
                        )}
                        {appointment.alternativenurse && (
                          <Text style={{ color: 'red' }}>{`Alternative Nurse: ${appointment.alternativenurse}`}</Text>
                        )}
                        {appointment.PatientRating > 0 &&(
  <View style={styles.ratingContainer}>
  {renderRatingStars(appointment.PatientRating)}
</View>
)}

                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.appointmentListItems}>
                <Text style={{color:'black'}}>Doesn't Have Any Appointment</Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.appointmentListItem}>
            <Text style={styles.noAppointmentText}>Doesn't Have Any Appointment</Text>
          </View>
        )}
        <View style={styles.rectangularBox}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('nhome', { UserID: UserID })}>
              <Image source={require('../Assets/homeicon.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('nhistory', { UserID: nurseProfile.UserID })}>
              <Image source={require('../Assets/historyicon.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('nschedule', { UserID: UserID })}>
              <Image source={require('../Assets/scheduleicon.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('nprofile', { UserID: UserID })}>
              <Image source={require('../Assets/profileicon.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
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
  imageBellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  noAppointmentText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  appointmentAndDatePickerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: 150,
    left: 10,
    height: 35,
  },
  datePickerButton: {
    color: 'blue',
    fontSize: 16,
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    height: 35,
    right: -190,
    marginTop: -34,
  },
  picker: {
    flex: 1,
    height: 30,
    color: 'blue',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    margin: 8,
    marginTop: 15,
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
    marginLeft: 5,
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
  appointmentListItems: {
    marginBottom: 10,
  },
  appointmentListItem: {
    marginBottom: 300,
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
    marginRight: 30,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  ratingStar: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  blackLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -60,
    marginBottom: 30,
    marginRight: -15,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 30,
  },
  editIconContainer: {
    marginLeft: 'auto',
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
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default App;
