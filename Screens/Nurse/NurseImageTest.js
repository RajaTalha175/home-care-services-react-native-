import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

const App = ({ navigation }) => {
  const UserID = 1095;
  const [nurseProfile, setNurseProfile] = useState(null);

  useEffect(() => {
    const fetchNurseProfile = async () => {
      try {
        const response = await fetch(`http://192.168.64.21/HomeCareServices/api/Nurse/NurseDetail?UserID=${UserID}`);

        if (response.ok) {
          const data = await response.json();
          setNurseProfile(data);
        } else {
          console.error('Failed to fetch nurse details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching nurse details:', error.message);
      }
    };

    fetchNurseProfile();
  }, [UserID]);

  return (
    <View style={styles.container}>
      {nurseProfile && nurseProfile.ImageType && nurseProfile.ImageBase64 && (
        <Image
          source={{ uri: `data:${nurseProfile.ImageType};base64,${nurseProfile.ImageBase64}` }}
          style={styles.nurseImage}
        />
      )}

      {/* Rest of your UI components */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nurseImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  // Add other styles as needed
});

export default App;
