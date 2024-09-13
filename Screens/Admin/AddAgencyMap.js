import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';

Geocoding.init('AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE');

const HealthAgencyForm = () => {
    const [organizationName, setOrganizationName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 33.642801,
        longitude: 73.070784,
    });
    const [address, setaddress] = useState('');

    const handleMapPress = async (event) => {
        const selectedCoordinates = event.nativeEvent.coordinate;

        try {
            const response = await Geocoding.from(selectedCoordinates.latitude, selectedCoordinates.longitude);

            if (response.results.length > 0) {
                const formattedAddress = response.results[0].formatted_address;
                setaddress(formattedAddress);
                console.log('Address:', formattedAddress);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }

        setMarkerCoordinates(selectedCoordinates);
    };

    const handleSignup = () => {
        console.log('User Location Coordinates:', markerCoordinates);
        console.log('UserAddress:', address);
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
                <View style={styles.mapview}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 33.642801,
                            longitude: 73.070784,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={handleMapPress}
                    >
                        <Marker coordinate={markerCoordinates} title="Marker" />
                    </MapView>
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
        color: 'white',
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
        marginTop: -40,
        height: 30,
        width: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default HealthAgencyForm;
