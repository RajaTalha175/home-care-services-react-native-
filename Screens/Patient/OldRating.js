import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet,Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';
import CheckBox from '@react-native-community/checkbox';

const App = ({ navigation }) => {
  const route = useRoute();
  const { appointment, RatingDetails } = route.params;
  const ip = apiEndpoint.apiEndpoint;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [patientdata, setPatientData] = useState(null);

  useEffect(() => {
    if (!appointment || !RatingDetails) {
      console.log('Invalid parameters. Going back.');
      navigation.goBack();
    } else {
      console.log('Rating Details:', RatingDetails);
      setPatientData(RatingDetails); // Corrected this line
    }
  }, [appointment, RatingDetails]);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });
  const checkboxValues = {
    checkbox1: 3,
    checkbox2: 4,
    checkbox3: 5,
    checkbox4: 1,
    checkbox5: 2,
  };

  const handleCheckboxChange = (checkbox) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkbox]: !prevCheckboxes[checkbox],
    }));
  };

  const handleReviewSubmit = async () => {
    const selectedCount = Object.entries(checkboxes)
      .filter(([key, value]) => value)
      .reduce((sum, [key]) => sum + checkboxValues[key], 0);

    if (selectedCount > 0) {
      const rating = Math.floor(selectedCount / 5);
      try {
        const userData = {
          AppointmentHistoryID: appointment.AppointmentHistoryID,
          NurseRating: rating,
          Status: 'Checked',
        };
  
        const response = await fetch(`${ip}Patient/AddNurseRating`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        console.log('Sending Data:', userData);
        if (response.status === 200) {
          // Handle success, if needed
          console.log('Review submitted successfully');
          navigation.goBack();
        } else {
          // Handle other response status codes or errors
          console.log('Review submission failed:', response.status);
          Alert.alert('Review Submission Failed', 'An error occurred');
        }
      } catch (error) {
        // Handle fetch error
        console.log('Error:', error);
        Alert.alert('Review Submission Failed', 'An error occurred');
      }
    } else {
      Alert.alert('Please At Least Check One Option!');
    }
  };
  

  return (
    <ImageBackground
      source={require('../Assets/imagebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        {/* Nurse's Image, Header Text, Bell Icon, and Circle Image */}
        <View style={styles.imageBellContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../Assets/backarrow.png')}
              style={styles.backarrow}
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Patient Review</Text>
          </View>
        </View>

        {/* Circle Image */}
        <View style={styles.circleImageContainer}>
          {patientdata ? (
            <Image
              source={{ uri: `data:${patientdata.ImageType};base64,${patientdata.ImageBase64}` }}
              style={styles.circleImage}
            />
          ) : (
            <Text>Loading image...</Text>
          )}
        </View>

        {/* Additional Text */}
        <View style={styles.additionalTextContainer}>
          {patientdata ? (
            <>
              
              <Text style={styles.additionalText}>
  {patientdata.Alternativenursename ? patientdata.Alternativenursename : patientdata.NurseName}
</Text>
<Text style={styles.additionalText}>{`Rating By: ${patientdata.PatientName}`}</Text>
<Text>{patientdata.ServiceName}</Text>

            </>
          ) : (
            <Text>Loading patient data...</Text>
          )}
        </View>

        {/* Black Line */}
        <View style={styles.blackLine}></View>

        {/* Give Rating and Review Section */}
        <View style={styles.ratingContainer}>
          <Text style={styles.giveRatingText}>Give Rating</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxes.checkbox1}
            onValueChange={() => handleCheckboxChange('checkbox1')}
          />
          <Text style={styles.checkboxText}>Patient behavior</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxes.checkbox2}
            onValueChange={() => handleCheckboxChange('checkbox2')}
          />
          <Text style={styles.checkboxText}>Punctuality</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxes.checkbox3}
            onValueChange={() => handleCheckboxChange('checkbox3')}
          />
          <Text style={styles.checkboxText}>Communication skills</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxes.checkbox4}
            onValueChange={() => handleCheckboxChange('checkbox4')}
          />
          <Text style={styles.checkboxText}>Professionalism</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxes.checkbox5}
            onValueChange={() => handleCheckboxChange('checkbox5')}
          />
          <Text style={styles.checkboxText}>Knowledge</Text>
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
    marginRight: 45,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    left: 30,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
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
