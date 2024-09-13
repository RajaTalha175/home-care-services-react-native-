import React from "react";
import {
    View,
    Text,
    button,
    Image, StyleSheet
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


const AdminDrawer = () => {
    return (
      <Drawer.Navigator  initialRouteName="Home" 
        screenOptions={{
         // headerShown:false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 250,
          },
          headerStyle: {
            backgroundColor: '#f45511e',
          },
          //headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            color: '#111',
          },
        }}
        drawerContent={(props) => {
          return (
            <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#f4f4f4',
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={require('../Assets/homeicon.png')}
                resizeMode='contain'
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                  //backgroundColor:'black'
                }}
              />
              <Text style={{ fontSize: 16, marginVertical: 6, fontWeight: 'bold', color: '#111' }}>RAJA</Text>
              <Text style={{ fontSize: 16, color: '#111' }}>Application Admin</Text>
            </View>
            <DrawerItemList {...props}/>
            </SafeAreaView>
          );
        }
      }
           >
        <Drawer.Screen
          name="adminhome"
          component={HomePage}
          options={{
            drawerLabel: 'Admin Home',
            drawerIcon: () => (
              <Image
                source={require('../Assets/homeicon.png')}
                style={{
                  height: 24,
                  width: 24,
                  //tintColor: '#808080',
                }}
              />
           ),
          }}
        />
        <Drawer.Screen
          name="addservices"
          component={editservices}
          options={{
            drawerLabel: 'Add Services',
            drawerIcon: () => (
              <Image
                source={require('../Assets/addservicesicon.png')}
                resizeMode='contain'
                style={{
                  height: 24,
                  width: 24,
                  //tintColor: '#808080',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="addhealthagency"
          component={addhealthagency}
          options={{
            drawerLabel: 'Add Health Agency',
            drawerIcon: () => (
              <Image
                source={require('../Assets/addhealthagencyicon.png')}
                resizeMode='contain'
                style={{
                  height: 24,
                  width: 24,
                  //tintColor: '#808080',
                }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };