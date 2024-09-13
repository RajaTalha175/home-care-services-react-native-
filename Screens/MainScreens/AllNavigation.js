import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './HomeScreen.js';
import Login from './Login.js';
import Register from './RegisterAccount.js';
import Confirm from './ConfirmationScreen.js';
import PatientSignup from './PatientSigup.js';
import NurseSignup from './NurseSignup.js';
import NurseSignup1 from './NurseSignup1.js';
import NurseSignup2 from './NurseSignup2.js';


import patientHome from '../Patient/HomeScreen.js';
import patientSearch from '../Patient/SearchScreen.js';
import patientSchedule from '../Patient/ScheduleScreen.js';
import patientHistory from '../Patient/HistoryScreen.js';
import patientNotification from '../Patient/Notification.js';
import patientProfile from '../Patient/ProfileScreen.js';
import genralrating1 from '../Patient/GeneralRating.js';
import patientsearchlist from '../Patient/SearchList.js';
import patientsearchprofile from '../Patient/SearchNurseProfile.js';
import LeaveSearchNursesList from '../Patient/LeaveDaysForNurseSearching.js';
import leavenurseprofile from '../Patient/Leavesearchnurseprofile.js';
import individualrating from '../Patient/IndiviualRating.js'


import nurseHome from '../Nurse/HomeScreen.js';
import nurseSchedule from '../Nurse/ScheduleScreen.js';
import nurseHistory from '../Nurse/HistoryScreen.js';
import nurseNotification from '../Nurse/Notification.js';
import nurseProfile from '../Nurse/ProfileScreen.js';
import genralrating from '../Nurse/GeneralRating.js';
import nsreport from '../Nurse/ScheduleReport.js';
import NurseServices from '../Nurse/UpdateServices.js';
import NurseLeaveApply from '../Nurse/NurseLeaveApply.js';
import HandoverList from '../Nurse/LeaveDaysForNurseSearching.js';
import HandoverProfile from '../Nurse/Leavesearchnurseprofile.js';



import HomePage from '../Admin/HomePage.js';
import editservices from '../Admin/EditServices.js';
import admindetails from '../Admin/NursesDetails.js';
import addhealthagency from '../Admin/AddHealthAgency.js';
import verify from '../Admin/VerifyNurses.js';






const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false, // Hide the header
          }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="message"
          component={Confirm}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="individualrating"
          component={individualrating}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nsignup"
          component={NurseSignup}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nservice"
          component={NurseSignup1}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nurseschedule"
          component={NurseSignup2}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="psignup"
          component={PatientSignup}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="phome"
          component={patientHome}
          options={{
            headerShown: false, // Hide the header
          }}
        />
         <Stack.Screen
          name="genralrating1"
          component={genralrating1}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="phistory"
          component={patientHistory}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="psearch"
          component={patientSearch}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="pschedule"
          component={patientSchedule}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="pprofile"
          component={patientProfile}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="pnotify"
          component={patientNotification}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nurseprofleleave"
          component={leavenurseprofile}
          options={{
            headerShown: false, // Hide the header
          }}
        />
         <Stack.Screen
          name="psearchlist"
          component={patientsearchlist}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nurselistforleave"
          component={LeaveSearchNursesList}
          options={{
            headerShown: false, // Hide the header
          }}
        />
         <Stack.Screen
          name="psearchlistprofile"
          component={patientsearchprofile}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nhome"
          component={nurseHome}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nnotify"
          component={nurseNotification}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="genralrating"
          component={genralrating}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nhistory"
          component={nurseHistory}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nservices"
          component={NurseServices}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="handoverlist"
          component={HandoverList}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="handoverprofile"
          component={HandoverProfile}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nschedule"
          component={nurseSchedule}
          options={{
            headerShown: false, // Hide the header
          }}
        />
         <Stack.Screen
          name="naleave"
          component={NurseLeaveApply}
          options={{
            headerShown: false, // Hide the header
          }}
        />
         <Stack.Screen
          name="Report"
          component={nsreport}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="nprofile"
          component={nurseProfile}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        <Stack.Screen
          name="adminhome"
          component={HomePage}
          options={{
            headerShown: false, // Hide the header
          }}
        />
        {/* <Stack.Screen
          name="admindrawer1"
          component={AdminDrawer}
          options={{
            headerShown: false, // Hide the header
          }}
        /> */}
        <Stack.Screen
          name="service"
          component={editservices}
          options={{
            headerShown: false, // Hide the header
          }}
        /><Stack.Screen
        name="admindetail"
        component={admindetails}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      <Stack.Screen
        name="addhealthagency"
        component={addhealthagency}
        options={{
          headerShown: false, // Hide the header
        }}
      />
       <Stack.Screen
        name="verfiynurse"
        component={verify}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function Patient() {
//   return (
//     <Tab.Navigator
//     screenOptions={{
//       tabBarShowLabel: false,
//       tabBarStyle: {
//         position: 'absolute',
//         bottom: 25,
//         left: 20,
//         right: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         height: 80,
//       },
//     }}
//     >
//       <Tab.Screen
//         name="patienthome"
//         component={patientHome}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/homeicon.png') : require('../Assets/homeicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Home</Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="patienthistory"
//         component={patientHistory}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/historyicon.png') : require('../Assets/historyicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>History</Text>
//             </View>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="patientsearch"
//         component={patientSearch}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', top: 10 }}>
//               <View
//                 style={{
//                   width: 40, // Adjust the size of the circle
//                   height: 40, // Adjust the size of the circle
//                   backgroundColor: 'white',
//                   borderRadius: 20, // Half of the width or height to make it a half circle
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: 3,
//                 }}
//               >
//                 <Image
//                   source={focused ? require('../Assets/searchicon.png') : require('../Assets/searchicon.png')}
//                   style={{ width: 25, height: 25 }} // Adjust width and height as needed
//                 />
//               </View>
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, marginBottom: 18 }}>
//                 Search
//               </Text>
//             </View>
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="patientschedule"
//         component={patientSchedule}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/scheduleicon.png') : require('../Assets/scheduleicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Schedule</Text>
//             </View>
//           ),
//         }}
//       />
//         <Tab.Screen
//         name="profile"
//         component={PatientDrawer}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/profileicon.png') : require('../Assets/profileicon.png')}
//                 style={{ width: 25, height: 25 }}
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Profile</Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

function PatientDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="profile" component={patientProfile} />
      {/* <Drawer.Screen name="Notifications" component={patientNotification} /> */}
    </Drawer.Navigator>
  );
}
{/* <Tab.Screen name="nursehome" component={nurseHome} />
<Tab.Screen name="nurseprofile" component={nurseProfile} />
<Tab.Screen name="nursehistory" component={nurseHistory} />
<Tab.Screen name="nursenotification" component={nurseNotification} />
<Tab.Screen name="nurseschedule" component={nurseSchedule} /> */}
// function Nurse() {
//   return (
//     <Tab.Navigator
//     screenOptions={{
//       tabBarShowLabel: false,
//       tabBarStyle: {
//         position: 'absolute',
//         bottom: 25,
//         left: 20,
//         right: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         height: 80,
//       },
//     }}
//     >
//       <Tab.Screen
//         name="nurseHome"
//         component={nurseHome}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/homeicon.png') : require('../Assets/homeicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Home</Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="nurseHistory"
//         component={nurseHistory}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/historyicon.png') : require('../Assets/historyicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>History</Text>
//             </View>
//           ),
//         }}
//       />

     

//       <Tab.Screen
//         name="nurseSchedule"
//         component={nurseSchedule}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/scheduleicon.png') : require('../Assets/scheduleicon.png')}
//                 style={{ width: 25, height: 25 }} // Adjust width and height as needed
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Schedule</Text>
//             </View>
//           ),
//         }}
//       />
//         <Tab.Screen
//         name="nurseProfile"
//         component={nurseProfile}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
//               <Image
//                 source={focused ? require('../Assets/profileicon.png') : require('../Assets/profileicon.png')}
//                 style={{ width: 25, height: 25 }}
//               />
//               <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Profile</Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
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


export default App;

