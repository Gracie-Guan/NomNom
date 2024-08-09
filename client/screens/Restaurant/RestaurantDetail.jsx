import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import TopTabs from '../../Components/TopTabs';
import { RestaurantContext } from '../../Context/RestaurantContext';

const RestaurantDetails = ({ route }) => {
  const { restaurantId } = route.params;
  const { fetchRestaurant, restaurant, loading, error } = useContext(RestaurantContext);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant(restaurantId);
    }
  }, [restaurantId, fetchRestaurant]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TopTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RestaurantDetails;