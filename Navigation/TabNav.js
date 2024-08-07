import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Profile from '../screens/Profile.js';
import Likes from '../screens/Likes.js';
import Home from '../screens/Home.js';
import Map from '../screens/Map.js';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator screenOptions={
      {headerShown:false}
    }>
      <Tab.Screen name="Home" component={Home}
      options={{
        tabBarLabel:"Home",
        tabBarIcon : ({color, size}) => (
          <Feather name="home" size={24} color="black" />
        )
      }} />
      <Tab.Screen name="Map" component={Map} 
            options={{
              tabBarLabel:"Map",
              tabBarIcon : ({color, size}) => (
                <Feather name="map-pin" size={24} color="black" />
              )
            }} />
      <Tab.Screen name="Likes" component={Likes}
            options={{
              tabBarLabel:"like",
              tabBarIcon : ({color, size}) => (
                <Feather name="heart" size={24} color="black" />
              )
            }} />
      <Tab.Screen name="Profile" component={Profile} 
            options={{
              tabBarLabel:"Profile",
              tabBarIcon : ({color, size}) => (
                <Feather name="user" size={24} color="black" />
              )
            }} />
    </Tab.Navigator>)
}

export default TabNav;