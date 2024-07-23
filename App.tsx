import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  VirtualizedList,
  Alert,
} from 'react-native';


import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/home/HomeScreen';
import LatestComplaints from './screens/complains/LatestComplaints';
import ComplaintDetails from './screens/complains/ComplaintDetails';
import SignUp from './screens/login/SignUp';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';

import {ThemeColor} from './ThemeColor';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import OtpScreen from './screens/login/OtpScreen';
import { GlobalContextProvider } from './GlobalContextProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OtpScreen"
          component={OtpScreen}
        />
      </Stack.Navigator>
    );
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        options={{headerShown: false}}
        screenOptions={{
          tabBarStyle: {height: 65, paddingBottom: 10, paddingTop: 10},
          headerStyle: {
            // backgroundColor: ThemeColor.purple,
          },
        }}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: ({}) => {
              return null;
            },
            tabBarLabel: ({focused, position}) => (
              <Text
                style={{
                  color: focused ? '#000' : 'grey',
                  fontSize: 13,
                  opacity: 0.7,
                  marginLeft: position === 'beside-icon' ? 20 : 0,
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({color, size, focused, tintColor}) => (
              <AntDesign
                name="home"
                size={25}
                style={{opacity: 0.7}}
                color={focused ? '#000' : 'grey'}
              />
            ),
          }}
          name="HomeStack"
          component={HomeStack}
        />

        <Tab.Screen
          options={{
            // title: 'Latest Complaints',
            // headerTitleStyle: { color: 'white' },
            headerShown: false,
            tabBarLabel: ({}) => {
              return null;
            },
            tabBarLabel: ({focused, position}) => (
              <Text
                style={{
                  color: focused ? '#000' : 'grey',
                  fontSize: 13,
                  opacity: 0.7,
                  marginLeft: position === 'beside-icon' ? 20 : 0,
                }}>
                Complaints
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <SimpleLineIcons
                name="notebook"
                size={25}
                style={{opacity: 0.7}}
                color={focused ? '#000' : 'grey'}
              />
            ),
          }}
          name="ComplaintStack"
          component={ComplaintStack}
        />
      </Tab.Navigator>
    );
  };

  const ComplaintStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LatestComplaints"
          component={LatestComplaints}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ComplaintDetails"
          component={ComplaintDetails}
        />
      </Stack.Navigator>
    );
  };

  const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OtpScreen"
          component={OtpScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeStack">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="HomeStack"
            component={HomeStack}
          />
          {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="LoginStack"
            component={LoginStack}
          /> */}
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ComplaintDetails"
            component={ComplaintDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
