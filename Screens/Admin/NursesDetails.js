import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const NurseDetails = ({navigation}) => {
  const route = useRoute();
  const UserID = route.params && route.params.UserID;
  const healthAgency = route.params && route.params.healthAgency;
  const ip=apiEndpoint.apiEndpoint;
  const [nurseData, setNurseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (healthAgency) {
        const HealthagencyID = healthAgency.HealthagencyID;
        const userData = {
          HealthagencyID: HealthagencyID,
        };
        try {
          const response = await fetch(`${ip}Admin/HealthAgencyNewNurses`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setNurseData(data);
          } else {
            console.error('Error fetching nurse data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching nurse data:', error);
        }
      }
    };

    fetchData();
  }, [healthAgency]);
  const handleSeeAllPress = async () => {
    if (healthAgency) {
      const HealthagencyID = healthAgency.HealthagencyID;
      const userData = {
        HealthagencyID: HealthagencyID,
      };
      try {
        const response = await fetch('http://192.168.43.100/HomeCareServices/api/Admin/Healthagencyallnurses', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setNurseData(data);
        } else {
          console.error('Error fetching nurse data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching nurse data:', error);
      }
    }
    
  };
  return (
    <ImageBackground source={require('../Assets/imagebackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Header Text */}
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Nurses Details</Text>
        </View>

        {/* Nurses List and See All Row */}
        <View style={styles.rowContainer}>
          {/* Nurses List View */}
          <Text style={styles.nursesListText}>Nurses List</Text>

          {/* See All Button */}
          <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Black Line */}
        <View style={styles.line}></View>

        {/* Nurse Data */}
        <View style={styles.nurseDataContainer}>
          <ScrollView style={styles.scrollView}>
            {nurseData.map((nurse) => (
              <View key={nurse.userid} style={styles.nurseContainer}>
                 <TouchableOpacity
    key={nurse.userid}
    style={styles.nurseContainer}
    onPress={() => navigation.navigate('verfiynurse',{nurse: nurse, UserID: UserID})}
  >
                <View style={styles.rectangularContainer}>
                  <View style={styles.imageContainer}>
                    {nurse.image && <Image source={{
              uri: `data:${nurse.image_type};base64,${nurse.image_base64}`,
            }} style={styles.image} />}
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text>Name: {nurse.name}</Text>
                    <Text>Email: {nurse.email}</Text>
                    <Text>Phone: {nurse.phone}</Text><Text>Employee Status:
  <Text style={{ color: nurse.isemployee ? 'blue' : 'red' }}> {nurse.isemployee ? 'On Service' : 'Retired'}</Text></Text><Text>
  Register Status:<Text style={{ color: nurse.isresgistered ? 'blue' : 'red' }}> {nurse.isresgistered ? 'Registered' : 'Not Registered'}</Text>
  </Text>
</View>
                  
                </View>
                </TouchableOpacity>
              </View>
            ))}
            {nurseData.length === 0 && <Text>No nurse details available.</Text>}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerView: {
    marginTop: 150,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
    width: '80%',
  },
  nursesListText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  seeAllButton: {
    padding: 10,
    borderRadius: 5,
    marginRight:10,
  },
  seeAllButtonText: {
    color: 'blue',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '80%',
  },
  nurseDataContainer: {
    flex: 1,
    width: '80%',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    maxHeight: 350,
  },
  nurseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    flex: 1,
  },
  rectangularContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: '100%',
  },
});

export default NurseDetails;
