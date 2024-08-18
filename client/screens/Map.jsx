import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, Linking, SafeAreaView, Animated } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocation } from '../Context/UserLocation';
import RestaurantCard from '../Components/RestroCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calculateDistance, addDistanceToRestaurants } from '../utils/distance';
import SearchTop from '../Components/SearchTop';
import FilterBar from '../Components/FilterBar';
import { calculateAveragePrice } from '../utils/AvgPrice';

export default function GoogleMapsView({ navigation, route }) {
  const [mapRegion, setMapRegion] = useState(null);
  const { location } = useContext(UserLocation);
  const [selectedRestro, setSelectedRestro] = useState(null);
  const mapRef = useRef(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonPosition] = useState(new Animated.Value(20)); 

  useEffect(() => {
    Animated.timing(buttonPosition, {
      toValue: selectedRestro ? 180 : 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedRestro]);

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
        
        const restaurantsWithPrices = await Promise.all(restaurantsWithDistance.map(async (restaurant) => {
          const averagePrice = await calculateAveragePrice(restaurant._id);
          return { ...restaurant, averagePrice };
        }));

        setRestaurants(restaurantsWithPrices);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [location]);

  const CustomMarker = ({ rating, averagePrice, isSelected }) => (
    <View style={[
      styles.markerContainer,
      isSelected ? styles.selectedMarker : null
    ]}>
      <Text style={styles.markerText}>€{averagePrice} ⭐️ {rating}</Text>
    </View>
  );

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
        ref={mapRef}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: parseFloat(restaurant.latitude),
              longitude: parseFloat(restaurant.longitude)
            }}
            onPress={() => handleMarkerPress(restaurant)}
          >
            <CustomMarker 
              rating={restaurant.rating} 
              averagePrice={restaurant.averagePrice || 'N/A'} 
              isSelected={selectedRestro && selectedRestro._id === restaurant._id}
            />
          </Marker>
        ))}
      </MapView>
      
      <Animated.View style={[styles.controlButtons, { bottom: buttonPosition }]}>
        <TouchableOpacity style={styles.controlButton} onPress={toUserLocation}>
          <Ionicons name="locate" size={24} color="#9e9e9e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={navToRestaurant}>
          <Ionicons name="navigate-outline" size={24} color="#9e9e9e" />
        </TouchableOpacity>
      </Animated.View>

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
    fontFamily:'Ubuntu-Bold',
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

  controlButtons: {
    position: 'absolute',
    right: 16,
    flexDirection: 'column',
  },
  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    // position:'absolute',
    right:16,
    bottom:'27%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },

  markerContainer: {
    backgroundColor: '#FFB300',
    borderRadius: 20,
    padding: 8,
    minWidth: 70,
    ...Platform.select({
      ios: {
        shadowColor: '#221C19',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    })
  },

  selectedMarker: {
    backgroundColor: '#FF9400',
  },

  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  calloutBox:{
    alignItems: 'center',
    justifyItems: 'center',
  }
});