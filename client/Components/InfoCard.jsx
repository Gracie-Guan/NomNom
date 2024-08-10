import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {MaterialIcons, Feather} from '@expo/vector-icons'
import axios from 'axios';
import { RestaurantContext } from '../Context/RestaurantContext';

const InfoCard = ({ restaurantId }) => {

  const { restaurant, loading, error } = useContext(RestaurantContext);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text>No data available</Text>
      </View>
    );
  }

  const { street1, city, state, country, postalcode } = restaurant.address_obj;

  return(
<View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.topImage} />
        <TouchableOpacity style={styles.heartContainer}>
          <Feather name="heart" size={20} color="#fff" style={styles.heartIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadContainer}>
          <Feather name="upload" size={20} color="#fff" style={styles.uploadIcon} />
        </TouchableOpacity>
      </View>

<View style={styles.detailsContainer}>
  <Text style={styles.detailsText}>{restaurant.name}</Text>
  <View style={styles.ratingContainer}>
  <View style={styles.rating}>
    <MaterialIcons name='star' color={'#FFA900'} size={20} />
    <Text style={styles.ratingText}>{restaurant.rating}</Text>
  </View>
  <View style={styles.reviewNumber}>
    <Text style={styles.reviewNumberText}>
    {Object.values(restaurant.review_rating_count).reduce((sum, count) => sum + parseInt(count, 10), 0)}
  </Text>
    <Text style={styles.reviewNumberText}>reviews</Text>
  </View>
</View>
<View style={styles.addressContainer}>
  <View style={styles.address}>
     <Text style={styles.addressText}>{`${street1}, ${city}, ${state}, ${country} ${postalcode}`}</Text>
  </View>
  <View style={styles.distance}>
    {/* <Text style={styles.distanceText}>{restaurant.distance}km away | </Text> */}
    <Text style={styles.distanceText}>2.4km away|</Text> 
    <Text style={styles.priceText}>{restaurant.price_level}</Text>
  </View>
  <View style={styles.type}>
      <Text style={styles.typeText}> {restaurant.cuisine && restaurant.cuisine.length > 0 ? restaurant.cuisine[0].localized_name : 'Cuisine not available'}</Text>
    <View style={styles.openButton}>
      <Text style={styles.openType}>open</Text>
    </View>
  </View>
  <View style={styles.twoButton}>
    <TouchableOpacity style={styles.map} onPress={() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    Linking.openURL(url);
  }}>
      <Feather name='compass' color={'#FFA900'} size={20} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.phone} onPress={() => {
    Linking.openURL(`tel:${restaurant.phone}`);
  }}>
      <Feather name='phone-call' color={'#FFA900'} size={20} />
    </TouchableOpacity>
  </View>
</View>
</View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green"
  },
  imageContainer: {
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: 260,
  },
  heartContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  uploadContainer: {
    position: 'absolute',
    top: 15,
    right: 50,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  
  detailsContainer: {
    position:'absolute',
    top: 230,
    left:0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  detailsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer:{
    position:'absolute',
    top: -50,
    right: 10,
    margin: 10,
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 20
  },
  rating: {
   height: 40,
   backgroundColor: 'white',
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
   flexDirection: 'row',
   justifyContent:'center',
   alignItems: 'center',
   paddingTop: 10,
   paddingRight: 5
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewNumber: {
    height: 40,
    backgroundColor: '#FFA900',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom: 5
   },
   reviewNumberText:{
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
   },
   addressContainer: {
    marginTop: 20,
    backgroundColor: 'white'
   },
   addressText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   distance: {
    flexDirection: 'row',
    marginTop: 5
   },
   distanceText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   priceText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#000'
   },
   type: {
     flexDirection: 'row',
     marginTop: 5
   },
   typeText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   openType: {
    fontSize: 14,
    fontWeight: '500',
    color:'#000'
   },
   openButton: {
    marginLeft: 10,
    backgroundColor: '#7DEF37',
    paddingHorizontal: 10,
    borderRadius: 10
   },
   twoButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
   },
   map: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
   },
   phone: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
   },
});

export default InfoCard