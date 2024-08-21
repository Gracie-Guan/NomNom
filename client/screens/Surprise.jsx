import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import ToggleButton from '../Components/ToggleButton';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';


const Surprise = ({navigation}) => {
  const { user, setUser } = useContext(AuthContext); 
  const [showRestaurant, setShowRestaurant] = useState(true);
  // const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchRandomRestaurant = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.get('http://localhost:6868/restaurants');
  //     const restaurants = response.data;
  //     if (restaurants.length > 0) {
  //       const randomIndex = Math.floor(Math.random() * restaurants.length);
  //       setRandomRestaurant(restaurants[randomIndex]);
  //     } else {
  //       setError('No restaurants available');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching restaurants:', error);
  //     setError('Error fetching restaurants');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchRandomRestaurant();
  // }, [fetchRandomRestaurant]);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:6868/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Error fetching restaurants');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleToggle = (isRestro) => {
    setShowRestaurant(isRestro);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // const handleRefresh = () => {
  //   fetchRandomRestaurant();
  // };

  const handleRefresh = () => {
    fetchRestaurants();
  };
  
  //added like button
  const handleLike = async (restaurant) => {
    if (!user || !restaurant) {
      console.warn('User not logged in or no restaurant available');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const response = await fetch(`http://localhost:6868/auth/user/${user.id}/favourites/restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, restaurantId: restaurant._id, action: 'add' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add to favourites: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const updatedUser = { ...user, favouriteRestaurant: data.favourite_restaurant };
      setUser(updatedUser);

      console.log(`Restaurant ${restaurant.name} added to favourites`);
      

    } catch (error) {
      console.error('Error adding to favourites:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#221C19" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#221C19" />
            <Text style={styles.normalText}>Back</Text>
          </TouchableOpacity>
          <ToggleButton style="icon-based" onToggle={handleToggle} />
        </View>

        <View style={styles.cardContainer}>
          {/* <Swiper>
            ref = {swiper => {
              this.swiper = swiper;
            }}

            onSwiped = {() => this.onSwiped('general')}
            onSwipedLeft = {() => this.onSwiped('left')}
            onSwipedRight = {() => this.onSwiped('right')}
            onTapCard = {this.swipedLeft}
            cards = {this.state.cards}
            cardIndex = {this.state.cardIndex}
            renderCard = {this.renderCard}
            onSwipedAll = {this.onSwipedAllCards}
            stackSize = {3}
            stackSeparation = {15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          </Swiper> */}

          {showRestaurant && restaurants.length > 0 ? (
          <Swiper
              cards={restaurants}
              renderCard={(restaurant) => (
                <RestaurantCard restaurant={restaurant} layout="surprise" />
              )}
              onSwipedRight={(cardIndex) => handleLike(restaurants[cardIndex])}
              onSwipedLeft={(cardIndex) => {
                if (cardIndex === restaurants.length - 1) {
                  handleRefresh();
                }
              }} 
              cardIndex={0}
              backgroundColor={'#FFB300'}
              stackSize={3}
              stackSeparation={15}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
              cardStyle={{ justifyContent: 'center', alignItems: 'center', left: 3, top: -80 }} 
            />
            // <View>
            //   {randomRestaurant && (
            //     <RestaurantCard restaurant={randomRestaurant} layout="surprise" />
            //   )}
            //     <View style={styles.stackcard1}></View>
            //     <View style={styles.stackcard2}></View>
            // </View>
          ) : (
            <View layout='cardStack'>
              <DishCard layout='surprise' />
              <View style={styles.stackcard1}></View>
              <View style={styles.stackcard2}></View>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.smallButton} >
           <Feather name="rotate-ccw" size={24} color="#9e9e9e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mehButton} onPress={handleRefresh}>
            <Feather name="meh" size={40} color="#FFEDD1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart" size={40} color="#FFEDD1" onPress={handleLike} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton}>
            <Ionicons name="navigate-outline" size={24} color="#FFB300" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFB300', 
  },

  cardStack:{
    width: windowWidth * 0.8,
    height: windowHeight * 0.55,
    justifyContent:'center',
    alignItems:'center',
  },

  stackcard1:{
    width: windowWidth * 0.75,
    height: windowHeight * 0.52,
    borderRadius:20,
    overflow:'hidden',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:30,
    left:10,
    zIndex:-1,
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
    }),
  },

  stackcard2:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.5,
    borderRadius:20,
    overflow:'hidden',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:20,
    left:20,
    zIndex:-2,
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
    }),
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  toggleContainer: {
    flexDirection:'row',
    width: '100%',
    alignItems:'center',
    justifyContent:'space-between',
    zIndex: 1,
  },

  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },

  cardContainer: {
    flex:1,
    justifyContent:'center',
    width: '100%',
    alignItems: 'center',
  },

  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#221C19',
    marginLeft: 5,
  },

  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width: '115%',
  },

  smallButton:{
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  mehButton: {
    width: 80,
    height:80,
    backgroundColor:'#536DFE',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  likeButton:{
    width: 80,
    height:80,
    backgroundColor:'#E65100',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  }
});

export default Surprise;
