import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, Linking } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocation } from '../Context/UserLocation';
import RestaurantCard from '../Components/RestroCards';
import Ionicons from '@expo/vector-icons/Ionicons';

const restaurants = [
// should be all the database restaurants, let's use fake data first

  { id: 1, name: "Joe's Diner", latitude: 53.349805, longitude: -6.260310 },
  { id: 2, name: "Pizza Place", latitude: 53.348005, longitude: -6.263320 },
  
];

export default function GoogleMapsView() {
  const [mapRegion, setMapRegion] = useState(null);
  const { location } = useContext(UserLocation);
  const [selectedRestro, setSelectedRestro] = useState(null);
  const mapRef = useRef(null);
  
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

  const handleMarkerPress = (restaurant) => {
    setSelectedRestro(restaurant);
  };

  const toUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
    }
  };

  const navToRestaurant = () => {
    if (selectedRestro && location) {
      const scheme = Platform.select({ios: 'maps:0,0?q=', android:'geo:0,0?q='});
      const latLng = `${selectedRestro.latitude},${selectedRestro.longitude}`;
      const label = selectedRestro.name;
      const url = Platform.select({
        ios:`${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });

      Linking.openURL(url).catch((err)=>console.log('An erro occurred', err));
    }
  };

  return (
    <View style={styles.container}>
      
        <MapView 
          style={styles.map} 
          showsUserLocation={true}
          region={mapRegion}
        >
       {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{latitude: restaurant.latitude, longitude: restaurant.longitude}}
            onPress={() => handleMarkerPress(restaurant)}
          >
            <Callout>
              <Text>{restaurant.name}</Text>
            </Callout>
          </Marker>
        ))}
        </MapView>
        
        <TouchableOpacity style={styles.goToUser} onPress={toUserLocation}>
           <Ionicons name="locate" size={24} color="#9e9e9e" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navToRestro} onPress={navToRestaurant}>
           <Ionicons name="navigate-outline" size={24} color="#9e9e9e" />
        </TouchableOpacity>

        {selectedRestro && (
          <View style={styles.card}>
            <RestaurantCard layout='list' restaurant={selectedRestro} />
          </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card:{
    position:'absolute',
    bottom:20,
    left:16,
    right:16,
  },

  cardTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:5,
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    padding: 10,
  },

  goToUser:{
    position:'absolute',
    right:16,
    top:'60%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },

  navToRestro:{
    position:'absolute',
    right:16,
    top:'68%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },
});