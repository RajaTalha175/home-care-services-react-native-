import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
const App = () => {

  const route = useRoute();
  const { welcomeMessage } = route.params || {};
  return (
    <View style={styles.container}>
      <Text>{welcomeMessage || 'Schedule!'}</Text>
      <Text>Schedule!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
