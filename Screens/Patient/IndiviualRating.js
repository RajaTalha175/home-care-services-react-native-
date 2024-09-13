import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiEndpoint from '../IpFIle';

const App = ({ navigation }) => {
  const route = useRoute();
  const nurse = route.params;
  const ip = apiEndpoint.apiEndpoint;
  const [patientdata, setPatientData] = useState(null);
  const [ratings, setRatings] = useState({
    behavior: 0,
    punctuality: 0,
    communicationSkills: 0,
    professionalism: 0,
    knowledge: 0,
  });

useEffect(()=>{
if(nurse!==null){
    console.log('Recived Data is:',nurse);
}
},[nurse])

const fetchdata = async () => {
    try {
        console.log(`${ip}Search/GetRating?NurseID=${nurse.nurse.NurseID}`);
        const healthAgenciesResponse = await fetch(`${ip}Search/GetRating?NurseID=${nurse.nurse.NurseID}`);
      if (healthAgenciesResponse.status === 200) {
        const healthAgenciesData = await healthAgenciesResponse.json();
       
        
        if(healthAgenciesData){
           const rat={
            behavior:healthAgenciesData.behavior,
            professionalism:healthAgenciesData.professionalism,
            knowledge:healthAgenciesData.knowledge,
            communicationSkills:healthAgenciesData.communicationSkills,
            punctuality:healthAgenciesData.punctuality,
           }
            setRatings(rat);
            console.log('Response Status:',rat);
        }
      } else {
        console.error('Failed to fetch health agencies data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
     
  };
useEffect(()=>{
   
    fetchdata();
  },[nurse]);



  const handleStarPress = (category, starIndex) => {
    setRatings((prevRatings) => {
      const newRatings = { ...prevRatings };
      const currentRating = prevRatings[category];

      // If the clicked star is the same as the current rating, decrease the count by 1
      // Otherwise, set the count to the clicked star index + 1
      newRatings[category] = starIndex === currentRating ? starIndex - 1 : starIndex + 1;

      // Ensure the count is within the range [0, 5]
      newRatings[category] = Math.max(0, Math.min(5, newRatings[category]));

      return newRatings;
    });
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
          {nurse ? (
            <Image
              source={{ uri: `data:${nurse.nurse.ImageType};base64,${nurse.nurse.Baseimage64}` }}
              style={styles.circleImage}
            />
          ) : (
            <Text>Loading image...</Text>
          )}
        </View>

        {/* Additional Text */}
        <View style={styles.additionalTextContainer}>
          {nurse ? (
            <>
              
              <Text style={styles.additionalText}>{`Rating By: ${nurse.nurse.FullName}`}</Text>
              <Text>{nurse.ServiceName}</Text>
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

        {/* Rating Categories */}
        <View style={styles.ratingCategoriesContainer}>
          {Object.keys(ratings).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={(starIndex) => handleStarPress(category, starIndex)}
              style={styles.ratingCategory}
            >
              <Text style={styles.ratingCategoryText}>{category}</Text>
              {[...Array(5)].map((_, starIndex) => (
                <TouchableOpacity
                  key={starIndex}
                  onPress={() => handleStarPress(category, starIndex)}
                >
                  <Image
                    source={
                      starIndex < ratings[category]
                        ? require('../Assets/yellowratingstar.png')
                        : require('../Assets/ratingstar.png')
                    }
                    style={styles.ratingStar}
                  />
                </TouchableOpacity>
              ))}
              <Text style={styles.ratingValue}>{ratings[category]}</Text>
            </TouchableOpacity>
          ))}
        </View>

       
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
    width: 120,
    height: 120,
    borderRadius: 60,
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
  ratingCategoriesContainer: {
    marginTop: 20,
  },
  ratingCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingCategoryText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  ratingStar: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  ratingValue: {
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