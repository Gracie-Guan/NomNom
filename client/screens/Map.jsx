import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, Linking, SafeAreaView } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocation } from '../Context/UserLocation';
import RestaurantCard from '../Components/RestroCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calculateDistance, addDistanceToRestaurants } from '../utils/distance';
import SearchTop from '../Components/SearchTop';
import FilterBar from '../Components/FilterBar';

export default function GoogleMapsView() {
  const [mapRegion, setMapRegion] = useState(null);
  const { location } = useContext(UserLocation);
  const [selectedRestro, setSelectedRestro] = useState(null);
  const mapRef = useRef(null);
  const [restaurants,setRestaurants] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }, [location]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:6868/restaurants');
        const restaurantsWithDistance = addDistanceToRestaurants(response.data, location);
        // console.log('Fetched restaurants:', response.data);
        setRestaurants(restaurantsWithDistance);

        const processedRestaurants = response.data.map(restaurant => {
          // console.log('Processing restaurant:', restaurant.name);
          // console.log('Latitude:',restaurant.latitude, 'Longitude', restaurant.longitude);
          return {
            ...restaurant,
            latitude: restaurant.latitude || 53.3498,
            longitude: restaurant.longitude || -6.2603,
          }
        })
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [location]);

  const handleMarkerPress = (restaurant) => {
    // console.log('Selected restaurant rating:', restaurant.name, restaurant.rating);
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

  if (loading){
    return <View style={styles.container}><Text>Loading Restaurants...</Text></View>
  }

  const navToRestaurant = () => {
    if (selectedRestro) {
      const scheme = Platform.select({ios: 'maps:0,0?q=', android:'geo:0,0?q='});
      const latLng = `${selectedRestro.latitude},${selectedRestro.longitude}`;
      const label = selectedRestro.name;
      const url = Platform.select({
        ios:`${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
  
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchBlock}>        
          <SearchTop  />
          <FilterBar  />
        </View>
      
        <MapView 
          style={styles.map} 
          showsUserLocation={true}
          region={mapRegion}
        >

        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude
            }}
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
            <RestaurantCard 
              layout='list' 
              restaurant={selectedRestro} />
          </View>
        )}

    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height:windowHeight,
    backgroundColor:'#fff',
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
    width: windowWidth,
    height: windowHeight,
    padding: 10,
  },

  searchBlock:{
    paddingHorizontal:16,
    marginTop:15,
    marginBottom:6,
    gap:6,
  },

  goToUser:{
    position:'absolute',
    right:16,
    bottom:'35%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },

  navToRestro:{
    position:'absolute',
    right:16,
    bottom:'27%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },
});