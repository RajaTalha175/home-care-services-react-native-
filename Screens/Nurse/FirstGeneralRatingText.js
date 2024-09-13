import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const App = () => {
  
  
  // const ratingData =  route.params?.ratingData || 2062;
  const patientID=2008;
  const appointID=1;
  const ServiceName="WoundCare";
  const ip=apiEndpoint.apiEndpoint;
  const [patientdata, setPatientData] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchNurseProfile = async () => {
      console.log('PatientID Recive ID:',patientID);
      try {
        const response = await fetch(`${ip}Patient/ShowPatientProfile?UserID=${patientID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch nurse details');
        }

        const data = await response.json();
        console.log(data);
        setPatientData(data); 
      } catch (error) {
        console.error('Error fetching nurse details:', error.message);
      }
    };

    fetchNurseProfile();
  }, [patientID]);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = () => {
    // Handle the submission logic here
    console.log('Submitted Rating:', rating);
    console.log('Submitted Review:', review);
    // You can perform any other actions here, such as sending the data to a server
  };
  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        {/* Nurse's Image, Header Text, Bell Icon, and Circle Image */}
        <View style={styles.imageBellContainer}>
          <TouchableOpacity onPress={() => console.log("Go back")}>
            <Image
              source={require("../Assets/backarrow.png")}
              style={styles.backarrow}
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Nurse Rating</Text>
          </View>

          <TouchableOpacity onPress={() => console.log("No notifications")}>
            <Image
              source={require("../Assets/notificationicon.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Circle Image */}
        <View style={styles.circleImageContainer}>
          <Image
            source={{ uri: `data:${patientdata.ImageType};base64,${patientdata.ImageBase64}` }}  
            style={styles.circleImage}
          />
        </View>

        {/* Additional Text */}
        <View style={styles.additionalTextContainer}>
          <Text style={styles.additionalText}>{patientdata.Name}</Text>
          <Text>{ServiceName}</Text>
        </View>

        {/* Black Line */}
        <View style={styles.blackLine}></View>

        {/* Give Rating and Review Section */}
        <View style={styles.ratingContainer}>
          <Text style={styles.giveRatingText}>Give Rating</Text>



          <View style={styles.ratingStarsContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(star)}
                activeOpacity={0.7}
              >
                <Image
                  source={
                    star <= rating
                      ? require('../Assets/yellowratingstar.png')
                      : require('../Assets/ratingstar.png')
                  }
                  style={styles.ratingStar}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.giveReviewText}>Give Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your Review here"
            placeholderTextColor="gray"
            onChangeText={(text) => setReview(text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleReviewSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  imageBellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    marginTop: 70,
  },
  backarrow: {
    width: 40,
    height: 40,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  bellIcon: {
    width: 40,
    height: 40,
  },
  circleImageContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  circleImage: {
    width: 120, // Adjust the size as needed
    height: 120, // Adjust the size as needed
    borderRadius: 60, // Half of the width and height to make it a circle
  },
  additionalTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  additionalText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 3,
  },
  blackLine: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'black',
    marginTop: 10,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  giveRatingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingStar: {
    width: 30,
    height: 30,
    marginRight: 5,
    backgroundColor: 'transparent',
  },
 
  giveReviewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  reviewInput: {
    width: '80%',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign:'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default App;
