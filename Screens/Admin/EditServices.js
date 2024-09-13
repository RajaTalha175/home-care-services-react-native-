import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const EditServices = () => {
  const route = useRoute();
  const UserID = route.params && route.params.UserID;
  const ip=apiEndpoint.apiEndpoint;
  const initialService = route.params && route.params.service;
  const navigation = useNavigation();
  const [service, setService] = useState(initialService || {});
  // const [DailyPrice, setDailyPrice] = useState(initialService?.DailyPrice.toString() || '');
  // const [WeeklyPrice, setWeeklyPrice] = useState(initialService?.WeeklyPrice.toString() || '');
  // const [MontlyPrice, setMontlyPrice] = useState(initialService?.MontlyPrice.toString() || '');
  const [status, setStatus] = useState(initialService?.Status || 'Active');
  const [description, setDescription] = useState(initialService?.Description || '');
 
useEffect(()=>{
  if(UserID!==null){
    console.log('Login UserID IS:',UserID);
  }
},[UserID]);


  const handleSave = async () => {
    try {
        if (initialService) {
            
          const updatedService = await updateService({
            ServiceID: initialService.ServiceID,
            Name: service.Name,
            Status: status,
            Description: description,
          });
            console.log('Update Service:');
            navigation.navigate('adminhome',{UserID: UserID});
        } else {
            
                // DailyPrice: DailyPrice,
                // WeeklyPrice: WeeklyPrice,
                // MontlyPrice: MontlyPrice,
            const newService = await addService({
                Name: service.Name,
                Status: status,
                Description: description,
            });

            console.log('Create New Service:');
           navigation.navigate('adminhome',{UserID: UserID});
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const addService = async (serviceData) => {
    try {
        const response = await fetch(`${ip}Admin/AddServices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });
         console.log('Sending Data is :',serviceData);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(`Failed to add service: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error adding service: ${error.message}`);
    }
};

const updateService = async (serviceData) => {
    try {
        const response = await fetch(`${ip}Admin/UpdateServices`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(`Failed to update service: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error updating service: ${error.message}`);
    }
};

  
  const isServiceNull = !initialService || Object.keys(initialService).length === 0;
const buttonText = isServiceNull ? 'Save' : 'Update';

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View>
      <Text style={styles.headerText}>{buttonText} Service</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Service Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={service.Name}
          onChangeText={(text) => setService({ ...service, Name: text })}
        />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Service Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        </View>
        {/* <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Service Packages:</Text>
  <View style={styles.inputRow}>
    <View style={styles.inputCol}>
      <Text style={styles.packageLabel}>Daily:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a Daily Price"
        value={DailyPrice}
        onChangeText={(text) => setDailyPrice(text)}
        keyboardType="numeric"
      />
    </View>
    <View style={styles.inputCol}>
      <Text style={styles.packageLabel}>Weekly:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a Weekly Price"
        value={WeeklyPrice}
        onChangeText={(text) => setWeeklyPrice(text)}
        keyboardType="numeric"
      />
    </View>
    <View style={styles.inputCol}>
      <Text style={styles.packageLabel}>Monthly:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a Monthly Price"
        value={MontlyPrice}
        onChangeText={(text) => setMontlyPrice(text)}
        keyboardType="numeric"
      />
    </View>
  </View>
</View> */}
       
        <Text style={styles.label}>Choose Status:</Text>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              color="blue"
              status={status === 'Active' ? 'checked' : 'unchecked'}
              onPress={() => setStatus('Active')}
            />
            <Text style={styles.radioButtonText}>Active</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              color="blue"
              status={status === 'UnActive' ? 'checked' : 'unchecked'}
              onPress={() => setStatus('UnActive')}
            />
            <Text style={styles.radioButtonText}>UnActive</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{buttonText}</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 10,
  },
  inputLabel: {
    color: 'black',
    marginLeft: 10,
    fontSize:16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom:30,
    marginTop:20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '90%',
    marginLeft:5,
    marginTop:10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginLeft: 40,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputCol: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  packageLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    marginTop:10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    margin: 10,
    marginLeft:80,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    color: 'black',
    marginLeft: 5,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 150, // Adjust the width as needed
    alignSelf: 'center', // Center the button horizontally
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
  },
});

export default EditServices;