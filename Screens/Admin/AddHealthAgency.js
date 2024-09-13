import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';
import { useRoute } from '@react-navigation/native';
Geocoding.init('AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE');
import { useNavigation } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';


const HealthAgencyForm = () => {
    const navigation=useNavigation();
    const route = useRoute();
    const UserID = route.params && route.params.UserID;
    const [organizationName, setOrganizationName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const ip=apiEndpoint.apiEndpoint;
    const [address, setAddress] = useState('');

    

    const handleSignup = async () => {
        try {
            const response = await fetch(`${ip}Admin/AddHealthAgency`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: organizationName,
                    PhoneNumber: phoneNumber,
                    Address: address,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                navigation.navigate('adminhome',{UserID: UserID});
            } else {
                // Handle the case where the server returns an error
                console.error('Error adding HealthAgency. Status:', response.status);
                Alert.alert('Error', 'Failed to add HealthAgency. Please try again.');
            }
        } catch (error) {
            // Handle unexpected errors
            console.error('Error adding HealthAgency:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <ImageBackground
            source={require('../Assets/imagebackground.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.headerText}>ADD HealthAgency</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Organization Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                        value={organizationName}
                        onChangeText={(text) => setOrganizationName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>
                <View style={styles.buttonview}>
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
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
        marginTop: 130,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 60,
    },
    inputContainer: {
        marginBottom: 5,
        width: '80%',
    },
    label: {
        color: 'black',
        fontSize: 16,
        marginTop: 20, // Increased space between labels and TextInput
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: '100%',
        color: 'black',
    },
    mapview: {
        flex: 1,
        width: '80%',
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20, // Increased space above the MapView
    },
    map: {
        width: '100%',
        height: '80%', // Increased height of the MapView
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonview: {
        width: '80%',
        marginBottom: 60,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 70,
        height: 40,
        width: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginTop:10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default HealthAgencyForm;
