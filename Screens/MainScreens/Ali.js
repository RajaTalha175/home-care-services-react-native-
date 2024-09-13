import { React, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import { TextInput } from 'react-native-paper';

const Login = (props) => {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 20, color: darkGreen, fontWeight: 'bold' }}>
            Dicom Viewer & Annotator
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <TextInput
            value={userName}
            placeholder="Email / Username"
            keyboardType={'email-address'}
            onChangeText={text => setUserName(text)}
          />
          <TextInput placeholder="Password" secureTextEntry={true}
            value={userPassword}
            onChangeText={text => setUserPassword(text)}
          />
          <View
            style={{ alignItems: 'flex-end', width: '65%', paddingRight: 6, marginBottom: 200 }}>
            {/* <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text> */}
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => {

            console.log(`http://192.168.36.225/DicomFinalApi/api/DicomF/login?username=${userName}&passwrd=${userPassword}`);
            fetch(`http://192.168.36.225/DicomFinalApi/api/DicomF/login?username=${userName}&passwrd=${userPassword}`)
              //.then((resp) => resp.json())
              .then((resp) => {
                //correct.
                if (resp.status === 200) {
                  resp.json().then((data) => {
                    console.log('User Data:', data);

                    // Add this line to check the user type received in the data
                    console.log('User Type:', data.Type);

                    if (data.Type === 'doctor') {
                      // Make sure the navigation name matches your actual screen name for doctors
                      props.navigation.navigate('DoctorSide');
                    } else if (data.Type === 'patient') {
                      props.navigation.navigate('PatientSide');
                    } else {
                      console.log('Unknown user type:', data.type);
                    }
                  });

                  //navigate to next screen.
                  // props.navigation.navigate('PatientSide');
                } else {
                  // Invalid username or password, show an alert message
                  Alert.alert('Invalid Credentials', 'Please check your username and password.');
                }
              })
              .catch((error) => {
                //incorrect.
                console.log(error);
              });
            //.finally(() => setLoading(false));



          }
          } />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: darkGreen }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;