import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserLocation } from '../Context/UserLocation';
import { Flex } from '@ant-design/react-native';

export default function GoogleMapsView() {
  const [mapRegion, setMapRegion] = useState(null);
  const { location } = useContext(UserLocation);
  
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      
        <MapView 
          style={styles.map} 
          showsUserLocation={true}
          region={mapRegion}
        ></MapView>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    padding: 10,

  }
});