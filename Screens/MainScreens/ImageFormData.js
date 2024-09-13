import React, { useState } from 'react';
import { View, TextInput, Button, Image, FlatList, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataList, setDataList] = useState([]);

  const handleChooseImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }

      setSelectedImage(response.assets[0]);
    });
  };

  const handleSave = async () => {
    try {
      if (!selectedImage) {
        alert('Please choose an image');
        return;
      }

      let formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('age', age);
      formData.append('hobbies', hobbies);
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName
    });
    

      const response = await fetch('http://192.168.158.21/MyProjects/api/Profile/Post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      let json = await response.json();
      console.log("response"+json); 
      if (response.ok) {
        console.log('Profile saved successfully');
      } else {
        console.log('Failed to save profile');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Failed to save profile');
    }
  };

  const handleShow = async () => {
    try {
      const response = await fetch('http://192.168.158.21/MyProjects/api/Profile/Get');
      if (response.ok) {
        const data = await response.json();
        setDataList(data);
      } else {
        console.log('Failed to fetch profiles');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Hobbies"
        value={hobbies}
        onChangeText={setHobbies}
        style={{ marginBottom: 10 }}
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {selectedImage ? (
        <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200, marginTop: 10 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Show" onPress={handleShow} />

      <FlatList
        data={dataList}
        keyExtractor={(item) => item.fullname}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{`Full Name: ${item.fullname}`}</Text>
            <Text>{`Age: ${item.age}`}</Text>
            <Text>{`Hobbies: ${item.hobbies}`}</Text>
            <Image source={{ uri: `data:${selectedImage.type};base64,${selectedImage.base64}` }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </View>
  );
};

export default App;
