import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './Navigations/TabNav';
import { UserLocation } from './Context/UserLocation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
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