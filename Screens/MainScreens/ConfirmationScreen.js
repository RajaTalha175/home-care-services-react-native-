import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("You're successfully Signup !");
  const images = [
    require('../Assets/welcomnurse.jpg'),
    require('../Assets/welcom1.jpg'),
    require('../Assets/welcom2.jpg'),
  ];

  const route = useRoute(); // Use useRoute to access route parameters
  const { role, UserID } = route.params;
  const navigation = useNavigation();

  const changeImage = (next) => {
    if (next) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check for the condition here using role
      if (role !== null && UserID !== null) {
        console.log('UserID recive ho gyi ha ',UserID)
      } else {
        navigation.goBack();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [role, navigation]);

  const handleNextButtonClick = () => {
    if (role !== null && UserID !== null) {
      console.log(role);
      if (role === 'patient') {
        console.log('Role IS:', role);
        console.log('ID IS:', UserID);
        navigation.navigate('psignup', { UserID: String(UserID) });
      } else if (role === 'nurse') {
        console.log('ID IS:', UserID);
        navigation.navigate('nsignup', { UserID: String(UserID) });
      }
    }
  };
  
  return (
    <ImageBackground source={require('../Assets/imagebackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{message}</Text>
        <Text style={styles.secondaryText}>Let's take a guide to start with creating a profile.</Text>
        <TouchableOpacity onPress={() => changeImage(false)}>
          <Image source={images[currentIndex]} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => changeImage(false)}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeImage(true)}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button1} onPress={handleNextButtonClick}>
          <Text style={styles.buttonText1}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    marginBottom: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop:20,
    maxWidth: 200,
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom:-20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 20,
    borderRadius: 5,
  }, 
  button1: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    
  },
  buttonText: {
    fontSize: 16,
    
  },
  buttonText1: {
    fontSize: 16,
    color: 'white',
    textAlign:'center',
  },
});

export default App;
