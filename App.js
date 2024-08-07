import React from 'react'
import AppNavigator from './pages/AppNavigator';
import LoginScreen from './pages/Login';
import SignUpScreen from './pages/Signup';
import Home from './screens/Home';
import TabNav from './Navigation/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Navigator" component={AppNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
