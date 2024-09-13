import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App1() {
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App1;
function Feed(){
    return <Text>Feed</Text>
}
function Article(){
    return <Text>Article</Text>
}