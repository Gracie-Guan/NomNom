import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import InfoCard from '../../Components/InfoCard';
import PopDishes from '../../Components/PopDishes';
import PhotoCard from '../../Components/PhotoCard';
import ReviewCard from '../../Components/ReviewCard';
import { RestaurantContext } from '../../Context/RestaurantContext';

const RestaurantOverview = () => {
  const { restaurant, loading, error } = useContext(RestaurantContext);

  console.log("restaurant: ", restaurant);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading restaurant data: {error}</Text>;
  }

  if (!restaurant) {
    return <Text>No restaurant data available</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InfoCard restaurant={restaurant} />
      <View style={styles.threeSection}>
        <PopDishes restaurantId={restaurant._id}/>
        <PhotoCard restaurant={restaurant} />
        <ReviewCard restaurant={restaurant} />
        <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  threeSection: {
    marginTop: 140,
    marginBottom: 60,
    marginHorizontal: 12,
  },

  leaveButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor:'#FFB300',
    alignItems: 'center',
    width: 350,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFB300',
    fontWeight: '500',
  },
});

export default RestaurantOverview;
