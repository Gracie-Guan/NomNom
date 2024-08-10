import React from 'react'
import AppNavigator from './pages/AppNavigator';
import LoginScreen from './pages/Login';
import SignUpScreen from './pages/Signup';
import Home from './screens/Home';
import TabNav from './Navigation/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/Profile';
import CommentsPage from './screens/CommentsPage';
import EndComments from './screens/EndComments';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, MaterialIcons } from "@expo/vector-icons"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Navigator" component={AppNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      <Stack.Screen name="CommentsPage" component={CommentsPage} options={{ headerShown: false }}/>
      <Stack.Screen name="EndComments" component={EndComments}
        options={({ navigation }) => ({
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <MaterialIcons name="close" size={30} color="black" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: 'white',
        },
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
