import React from 'react';
import {Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/User/Profile';
import Liked from '../screens/Liked';
import Home from '../screens/Home';
import Map from '../screens/Map';
import Surprise from '../screens/Surprise';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          elevation: 8,  
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#FF9400',  
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          let iconName;
          let iconSize = 24;

          if (route.name === 'Home') {
            IconComponent = Octicons;
            iconName = 'home';
          } else if (route.name === 'Map') {
            IconComponent = Ionicons;
            iconName = focused ? 'compass' : 'compass-outline';
            iconSize = 26;
          } else if (route.name === 'Surprise') {
            IconComponent = Ionicons;
            iconName = focused ? 'dice' : 'dice-outline';
            iconSize = 26;
          } else if (route.name === 'Liked') {
            IconComponent = Octicons;
            iconName = focused ? 'heart-fill':'heart'; 
          } else if (route.name === 'Profile') {
            IconComponent = FontAwesome;
            iconName = focused ? 'user-circle' : 'user-circle-o';
          }

          return <IconComponent name={iconName} size={iconSize} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text style={{
              color: focused? '#221C19':'#9e9e9e',
              fontSize: 10,
              fontWeight: focused ? 'bold' : 'normal',
              textTransform: 'uppercase',
            }}>
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Surprise" component={Surprise} />
      <Tab.Screen name="Liked" component={Liked} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNav;