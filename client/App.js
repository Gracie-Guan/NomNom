import React, { createContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from './Components/TopTabs';
import axios from 'axios';
import * as Location from 'expo-location';
import TabNav from './Navigations/TabNav';
import { UserLocation } from './Context/UserLocation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// const Stack = createStackNavigator();

// const RestaurantContext = createContext();

// const uniquerestaurantId = "668ee8afc88d544d82f31746";

// const RestaurantProvider = ({ children }) => {
//   const [restaurant, setRestaurant] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const response = await axios.get(`http://localhost:6868/restaurants/${uniquerestaurantId}`);
//         setRestaurant(response.data);
//       } catch (error) {
//         setError('Error fetching restaurant data');
//         console.error('Error fetching restaurant:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurant();
//   }, []);

//   return (
//     <RestaurantContext.Provider value={{ restaurant, loading, error }}>
//       {children}
//     </RestaurantContext.Provider>
//   );
// };

// const uniquerestaurantId = "668f19c057dcfe28be26ddd1";

// function HomeScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <TopTabs />
//     </SafeAreaView>
//   );
// }

export default function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen 
  //         name="Home" 
  //         component={HomeScreen} 
  //         options={{ title: 'Restaurant Name' }} 
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loaded, error] = useFonts({
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
  });

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <UserLocation.Provider 
      value={{location, setLocation}}>
        <NavigationContainer>
          <TabNav />  
        </NavigationContainer>        
      </UserLocation.Provider>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Ubuntu',
  },
})

// export { RestaurantContext };