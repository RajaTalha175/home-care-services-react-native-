import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TextInput } from 'react-native';

// Home stack screens
function Login({ navigation }) {
  const [username, setUsername] = useState('');
const handleLogin = () => {
  // Perform your login logic here
  
  // Navigate to the "Home" tab using the correct navigator and screen name
  navigation.navigate('tabs', {
    screen: 'Home', // The name of the screen inside the "tabs" navigator
    params: { username },
  });
};
  
  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}



// App tab screens
function Home({ route }) {
  const { params } = route || {};
  const { username } = params || {};

  return (
    <View>
      <Text>Welcome, {username || 'Guest'}!</Text>
    </View>
  );
}



function Feed() {
  return (
    <View>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Profile() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

function Messages() {
  return (
    <View>
      <Text>Messages Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen({ route }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Login"
        component={Login}
        initialParams={route.params} // Pass initial params to Login screen
      />
      <HomeStack.Screen
        name="tabs"
        component={App}
        initialParams={route.params} // Pass initial params to Login screen
      />
    </HomeStack.Navigator>
  );
}
function App() {

  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Messages" component={Messages} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeStackScreen;
