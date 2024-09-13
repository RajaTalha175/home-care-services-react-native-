import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import apiEndpoint from '../IpFIle';

const ServiceList = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { NurseID } = route.params || {};
  const ip = apiEndpoint.apiEndpoint;
  const [servicesData, setServicesData] = useState([]);
  const [nurseservicesData, setNurseServicesData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicePrices, setServicePrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (NurseID === null) {
      navigation.goBack();
      return;
    } else {
      console.log('Received NurseID Is:', NurseID);
    }
  
    const fetchData = async () => {
      try {
        const [nurseDetailResponse, servicesResponse] = await Promise.all([
          fetch(`${ip}Nurse/GetNurseServices?nurseID=${NurseID}`),
          fetch(`${ip}Nurse/GetServices`),
        ]);
  
        if (nurseDetailResponse.ok) {
          const nurseDetailData = await nurseDetailResponse.json();
          setNurseServicesData(nurseDetailData);
          console.log('Nurse Profile ID Is: ', nurseDetailData.NurseID);
  
          // Set initial state for selectedServices and servicePrices
          const initialSelectedServices = nurseDetailData.map((nurseService) => ({
            id: nurseService.ServiceID,
            dailyPrice: nurseService.DailyPrice,
            weeklyPrice: nurseService.WeeklyPrice,
            monthlyPrice: nurseService.MonthlyPrice,
          }));
          setSelectedServices(initialSelectedServices);
  
          const initialServicePrices = nurseDetailData.reduce((prices, nurseService) => {
            prices[nurseService.ServiceID] = {
              daily: nurseService.DailyPrice,
              weekly: nurseService.WeeklyPrice,
              monthly: nurseService.MonthlyPrice,
            };
            return prices;
          }, {});
          setServicePrices(initialServicePrices);
  
          console.log('Initial selected services:', initialSelectedServices);
        } else {
          console.error('Error fetching nurse detail:', nurseDetailResponse.status);
        }
  
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServicesData(servicesData);
          console.log('Services List Is: ', servicesData);
        } else {
          console.error('Error fetching services:', servicesResponse.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [NurseID, navigation]);
  

  const toggleService = (serviceId, dailyPrice, weeklyPrice, monthlyPrice) => {
    const isSelected = selectedServices.some((service) => service.id === serviceId);

    if (isSelected) {
      setSelectedServices(selectedServices.filter((service) => service.id !== serviceId));
      setServicePrices((prevPrices) => {
        const { [serviceId]: _, ...newPrices } = prevPrices;
        return newPrices;
      });
    } else {
      setSelectedServices([
        ...selectedServices,
        { id: serviceId, dailyPrice, weeklyPrice, monthlyPrice },
      ]);
      setServicePrices((prevPrices) => ({
        ...prevPrices,
        [serviceId]: { daily: 0, weekly: 0, monthly: 0 },
      }));
    }
  };
  

  const handleSavebutton = async () => {
    console.log('Sending NurseID:', NurseID);
    if (selectedServices.length > 0) {
      console.log('Selected Service IDs', selectedServices.map((service) => service.id).join(', '));
  
      const userData = selectedServices.map((service) => ({
        NurseID: NurseID,
        ServiceID: service.id,
        DailyPrice: servicePrices[service.id].daily,
        WeeklyPrice: servicePrices[service.id].weekly,
        MonthlyPrice: servicePrices[service.id].monthly,
        Action: 1,
      }));
      console.log(userData);
      try {
        const response = await fetch(`${ip}Nurse/UpdateNurseService`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          console.log('Nurse services added successfully.');
          navigation.goBack();  // Correct navigation syntax
        } else {
          console.error('Error adding nurse services:', response.status);
          Alert.alert('Error adding nurse services. Please try again.');
        }
      } catch (error) {
        console.error('Error adding nurse services:', error.message);
        Alert.alert('Error adding nurse services. Please try again.');
      }
    } else {
      Alert.alert('No services selected');
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Please wait for a few seconds...</Text>
        ) : (
          <>
            <Text style={styles.title}>Nurse Services</Text>
            <ScrollView style={styles.servicesList}>
              {servicesData.map((service, index) => (
                <React.Fragment key={service.ServiceID}>
                  <View style={styles.serviceRow}>
                    <View style={styles.serviceItem}>
                    <CheckBox
  value={selectedServices.some((selectedService) => selectedService.id === service.ServiceID)}
  onValueChange={() =>
    toggleService(
      service.ServiceID,
      service.DailyPrice,
      service.WeeklyPrice,
      service.MonthlyPrice
    )
  }
/>



                      <Text style={styles.serviceName}>{service.Name}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <View style={styles.priceInputContainer}>
                      <TextInput
  style={styles.priceInput}
  placeholder="Enter Daily Fee"
  keyboardType="numeric"
  value={(servicePrices[service.ServiceID]?.daily || '').toString()}
  onChangeText={(text) =>
    setServicePrices((prevPrices) => ({
      ...prevPrices,
      [service.ServiceID]: {
        ...prevPrices[service.ServiceID],
        daily: text !== '' ? parseFloat(text) : 0,
      },
    }))
  }
/>
                      </View>
                      <View style={styles.priceInputContainer}>
  <TextInput
    style={styles.priceInput}
    placeholder="Enter Weekly Fee"
    keyboardType="numeric"
    value={servicePrices[service.ServiceID]?.weekly?.toString() || ''}
    onChangeText={(text) =>
      setServicePrices((prevPrices) => ({
        ...prevPrices,
        [service.ServiceID]: {
          ...prevPrices[service.ServiceID],
          weekly: text !== '' ? parseFloat(text) : 0,
        },
      }))
    }
  />
</View>
<View style={styles.priceInputContainer}>
  <TextInput
    style={styles.priceInput}
    placeholder="Enter Monthly Fee"
    keyboardType="numeric"
    value={servicePrices[service.ServiceID]?.monthly?.toString() || ''}
    onChangeText={(text) =>
      setServicePrices((prevPrices) => ({
        ...prevPrices,
        [service.ServiceID]: {
          ...prevPrices[service.ServiceID],
          monthly: text !== '' ? parseFloat(text) : 0,
        },
      }))
    }
  />
</View>


                    </View>
                  </View>
                  {index !== servicesData.length - 1 && (
                    <View style={styles.serviceSeparator} />
                  )}
                </React.Fragment>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSavebutton}>
              <Text style={styles.savebuttonText}>Save</Text>
            </TouchableOpacity>
            <Text style={styles.selectedServices}>
              Selected Service IDs: {selectedServices.map((service) => service.id).join(', ')}
            </Text>
          </>
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  servicesList: {
    marginTop: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:40,
  },
  serviceSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginBottom: 10,
    marginTop:5,
  },
  
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop:5,
  },
  serviceName: {
    marginLeft: 10,
    fontSize: 16,
    maxWidth: 100, 
    color: 'black',

  },
  priceContainer: {
    marginRight:10,
  },
   servicePrice: {
    fontSize: 14, 
    color: 'green',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
    marginTop:5,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 3,
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    width: 120,
    textAlign: 'left',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: 100,
    marginTop: 20,
  },
  savebuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  selectedServices: {
    fontSize: 16,
    marginTop: 20,
    marginLeft:20,
  },
});

export default ServiceList;