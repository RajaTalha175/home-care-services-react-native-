import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.iconContainer}>
          <Icon name="home" size={80} color="#777" />
          <Text style={styles.label}>Home</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="calendar" size={80} color="#777" />
          <Text style={styles.label}>Calendar</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="history" size={80} color="#777" />
          <Text style={styles.label}>History</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
