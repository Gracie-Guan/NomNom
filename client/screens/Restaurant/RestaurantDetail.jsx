import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import TopTabs from '../../Components/TopTabs';
import { RestaurantContext } from '../../Context/RestaurantContext';
import { Feather } from '@expo/vector-icons';

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const { fetchRestaurant, restaurant, loading, error } = useContext(RestaurantContext);
  const handleBack = () => {
    navigation.goBack();
  };

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
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#221C19" />
            <Text style={styles.normalText}>Back</Text>
      </TouchableOpacity>
      <TopTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },
});

export default RestaurantDetails;