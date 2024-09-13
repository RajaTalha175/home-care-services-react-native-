import React, { useState, useEffect } from 'react';
import { View, Text,TextInput , StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const ip=apiEndpoint.apiEndpoint;
  const {UserID} = route.params;
  const [selectedTab, setSelectedTab] = useState(null);
  const [Nurses, setNurses] = useState(null);
  const [ServicesList, setServicesList] = useState([
    // { id: 1, name: 'WoundCare', description: 'Service description 1', dailyCost: '100$', status: 'Active' },
    // { id: 2, name: 'HeartBeat', description: 'Service description 2', dailyCost: '120$', status: 'Active' },
    // { id: 3, name: 'IV Canula', description: 'Service description 3', dailyCost: '80$', status: 'Active' },
    // { id: 4, name: 'WoundCare', description: 'Service description 1', dailyCost: '100$', status: 'Active' },
    // { id: 5, name: 'HeartBeat', description: 'Service description 2', dailyCost: '120$', status: 'Active' },
    // { id: 6, name: 'IV Canula', description: 'Service description 3', dailyCost: '80$', status: 'Active' },
  ]);
  const [healthAgencyList, setHealthAgencyList] = useState([
    // { 
    //   id: 1,
    //   name: 'Bill Medicare',
    //   address: '123 Main Street, City',
    //   phoneNumber: '555-1234',
    // },
    // { 
    //   id: 2,
    //   name: 'HBS Medicare',
    //   address: '456 Oak Avenue, Town',
    //   phoneNumber: '555-5678',
    // },
    // { 
    //   id: 3,
    //   name: 'Rawal Hospital',
    //   address: '789 Pine Road, Village',
    //   phoneNumber: '555-9101',
    // },{ 
    //   id: 4,
    //   name: 'Bill Medicare',
    //   address: '123 Main Street, City',
    //   phoneNumber: '555-1234',
    // },
    // { 
    //   id: 5,
    //   name: 'HBS Medicare',
    //   address: '456 Oak Avenue, Town',
    //   phoneNumber: '555-5678',
    // },
    // { 
    //   id: 6,
    //   name: 'Rawal Hospital',
    //   address: '789 Pine Road, Village',
    //   phoneNumber: '555-9101',
    // },
  ]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${ip}Admin/admindata`);
      console.log('Response Status:', response.status);
      const data = await response.json();

      if (response.ok) {
        
        setServicesList(data.service);
        setHealthAgencyList(data.healthagency);
      } else {
        Alert.alert('Error', 'Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };
  useEffect(() => {
   
    if (!UserID) {
      console.log('UserID not received. Navigating back...');
      navigation.goBack();
      return; // Stop execution if UserID is not received
    }
 fetchData();
  }, [UserID, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ip}Admin/GetAllNurses`);
        console.log('Response Status:', response.status);
        const data = await response.json();

        if (response.ok) {
          setNurses(data)
         
        } else {
          Alert.alert('Error', 'Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    };
    if (!UserID) {
      console.log('UserID not received. Navigating back...');
      navigation.goBack();
      return; // Stop execution if UserID is not received
    }

    fetchData();
  }, [UserID, navigation]);
 

 

  
  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('home') 
          } style={styles.backButton}>
            <Image
              source={require('../Assets/logouticon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Admin Home</Text>
          <TouchableOpacity onPress={() => console.log('Welcome Home')} style={styles.homeButton}>
            <Image
              source={require('../Assets/homeicon.png')}
              style={styles.homeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* New View for Center Box */}
        <View style={styles.centerBox}>
          <View style={styles.rectangularContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log('Services Pressed');
                setSelectedTab('services');
              }}
              style={styles.touchableBox}
            >
              <Text style={styles.touchableText}>Services</Text>
              {selectedTab === 'services' && <View style={styles.selectedLine}></View>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('Health Agency Pressed');
                setSelectedTab('healthAgency');
              }}
              style={styles.touchableBox}
            >
              <Text style={styles.touchableText}>HealthAgency</Text>
              {selectedTab === 'healthAgency' && <View style={styles.selectedLine}></View>}
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                console.log('Health Agency Pressed');
                setSelectedTab('Nurse');
              }}
              style={styles.touchableBox}
            >
              <Text style={styles.touchableText}>Nurse</Text>
              {selectedTab === 'Nurse' && <View style={styles.selectedLine}></View>}
            </TouchableOpacity> */}
          </View>
        </View>

        
        {selectedTab === 'services' && (
           <View style={styles.listContainer}>
            <View style={styles.rowContainer}>
  <Text style={styles.servicesListText}>ServicesList</Text>
  <TouchableOpacity style={styles.addServicesButton} onPress={() => navigation.navigate('service',{UserID: UserID})}><Text style={{textShadowColor:'blue',color:'white'}}>Add Services</Text></TouchableOpacity>
</View>
           <ScrollView style={styles.scrollView}>
            {ServicesList.map((service) => (
              <TouchableOpacity
                key={service.ServiceID}
                style={styles.listItemContainer}
                onPress={() => navigation.navigate('service',{service: service, UserID: UserID})}
              >
                <View style={styles.listItem}>
                  <Image
                    source={require('../Assets/serviceicon.png')}
                    style={styles.listIcon}
                  />
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listName}>{service.Name}</Text>
                    <Text style={styles.listDescription}>{`Description: ${service.Description}`}</Text>
                    <Text style={styles.listCost}>{`Status: ${service.Status}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        )}
 {selectedTab === 'Nurse' && (
           <View style={styles.listContainer}>
            <View style={styles.rowContainer}>
  <Text style={styles.servicesListText}>NurseList</Text>
 </View>
           <ScrollView style={styles.scrollView}>
            {Nurses.map((nurse) => (
              <TouchableOpacity
                key={nurse.profileid}
                style={styles.listItemContainer}
                onPress={() => navigation.navigate('verfiynurse',{nurse: nurse, UserID: UserID})}
              >
                <View style={styles.listItem}>
                  <Image
                     source={{
                      uri: `data:${nurse.image_type};base64,${nurse.image_base64}`,
                    }}
                    style={styles.listIcon}
                  />
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listName}>{nurse.name}</Text>
                    <Text style={styles.listDescription}>{`Email: ${nurse.email}`}</Text>
                    <Text style={styles.listDescription}>{`PhoneNo: ${nurse.phone}`}</Text>
                    <Text>Employee Status:
  <Text style={{ color: nurse.isemployee ? 'blue' : 'red' }}> {nurse.isemployee ? 'On Service' : 'Retired'}</Text></Text><Text>
  Register Status:<Text style={{ color: nurse.isresgistered ? 'blue' : 'red' }}> {nurse.isresgistered ? 'Registered' : 'Not Registered'}</Text>
  </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        )}
{selectedTab === 'healthAgency' && (
          <View style={styles.listContainer}>
            <View style={styles.rowContainer}>
  <Text style={styles.servicesListText}>healthAgencyList</Text>
  <TouchableOpacity style={[styles.addServicesButton, { marginLeft: 40 }]} onPress={() => navigation.navigate('addhealthagency',{UserID: UserID})}><Text style={{color:'white'}}>Add Agency</Text></TouchableOpacity>
</View>
<ScrollView style={styles.scrollView}>
            {healthAgencyList.map((healthAgency) => (
              <TouchableOpacity
                key={healthAgency.HealthagencyID}
                style={styles.listItemContainer}
                onPress={() => navigation.navigate('admindetail',{healthAgency: healthAgency, UserID: UserID})}
              >
                <View style={styles.listItem}>
                  <Image
                    source={require('../Assets/healthicon.jpg')}
                    style={styles.listIcon}
                  />
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listName}>{healthAgency.Name}</Text>
                    <Text style={styles.listAddress}>{`Address: ${healthAgency.Address}`}</Text>
                    <Text style={styles.listPhoneNumber}>{`Phone Number: ${healthAgency.PhoneNo}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        )}
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
  mainContainer: {
    flex: 1,
    marginTop: 100,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop: 12,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    marginTop: 12,
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  scrollView: {
    
    maxHeight: 350,
    marginHorizontal: 10, 
  },
  centerBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 14,
  },
  servicesListText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    marginTop:5,
    marginLeft:6,
    
  },
  addServicesButton: {
    backgroundColor: 'green',
    marginLeft: 80, 
    width: 100,
    height: 30,
    borderRadius: 5, // Set the border radius as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Adjust the width as needed
  },
  imageStyle: {
    width: 30, // Adjust the width as needed
    height: 30, // Adjust the height as needed
    marginTop: 10,
    marginBottom:10,
    marginLeft:45, // Adjust the margin as needed
    borderRadius:800,
  },
  rectangularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue', // Light blue color
    padding: 10, // Adjust the padding as needed
    borderRadius: 10, // Adjust the border radius as needed
    width: '80%', // Adjust the width as needed
  },
  touchableBox: {
    flex: 1,
  },
  touchableText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedLine: {
    height: 3,
    backgroundColor: 'white',
    marginTop: 5,
    width:'50%',
    alignSelf:'center'
  },
  listContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf:'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    
    padding: 10,
  },
  listIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  listTextContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listDescription: {
    fontSize: 14,
    color: '#555',
  },
  listAddress: {
    fontSize: 14,
    color: '#555',
  },
  listPhoneNumber: {
    fontSize: 14,
    color: '#555',
  },
  listCost: {
    fontSize: 14,
    color: 'green',
  },
  listItemContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd', // Set the border color as needed
    borderRadius: 10,
    overflow: 'hidden',
    
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  phoneInputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  phoneInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
  updateButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
  },
});

export default HomePage;