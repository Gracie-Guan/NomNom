import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import InfoCard from '../../Components/InfoCard';
import PopDishes from '../../Components/PopDishes';
import PhotoCard from '../../Components/PhotoCard';
import ReviewCard from '../../Components/ReviewCard';
import { RestaurantContext } from '../../Context/RestaurantContext';

const RestaurantOverview = () => {
  const { restaurant, loading, error } = useContext(RestaurantContext);

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
        <PopDishes restaurant={restaurant} />
        <PhotoCard restaurant={restaurant} />
        <ReviewCard restaurant={restaurant} />
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


});

export default RestaurantOverview;