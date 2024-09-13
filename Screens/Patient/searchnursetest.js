import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const YourApiEndpoint = 'http://192.168.36.21/HomeCareServices/api/Search/PatientSearchNurses';

const App = () => {
  const [patientID, setPatientID] = useState(null);
  const [serviceID, setServiceID] = useState(null);
  const [nurseData, setNurseData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  const fetchData = async () => {
    try {
      const requestData = {
        Female: true,
        HealthagencyID: 5,
        Male: true,
        PatientID: 7,
        Schedules: [
          {
            DateTime: '6am-7am',
            WeekDay2: 'Tuesday',
            WeekDay6: 'Saturday',
          },
        ],
        ServiceID: 2,
      };

      const response = await fetch(YourApiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      setPatientID(responseData.PatientID);
      setServiceID(responseData.ServiceID);
      setNurseData(responseData.Nurses);
      setScheduleData(responseData.Schedules);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderNurseList = () => (
    <View>
      <Text>Nurse List:</Text>
      {nurseData && nurseData.map((nurse) => (
        <View key={nurse.NurseID} style={styles.box}>
          <Text>{nurse.FullName}</Text>
          {/* Add other nurse details here */}
        </View>
      ))}
    </View>
  );

  const renderScheduleList = () => (
    <View>
      <Text>Schedule List:</Text>
      {scheduleData && scheduleData.map((schedule) => (
        <View key={schedule.ScheduleID} style={styles.box}>
          <Text>{schedule.DateTime}</Text>
          {/* Add other schedule details here */}
        </View>
      ))}
    </View>
  );

  return (
    <View>
      <Text>Patient ID: {patientID}</Text>
      <Text>Service ID: {serviceID}</Text>

      <TouchableOpacity onPress={() => renderNurseList()}>
        <Text>See NurseList</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => renderScheduleList()}>
        <Text>See SchedulesList</Text>
      </TouchableOpacity>

      {nurseData && renderNurseList()}
      {scheduleData && renderScheduleList()}
    </View>
  );
};

const styles = {
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
  },
};

export default App;
