import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import { RestaurantContext } from '../Context/RestaurantContext';

const MenuInfo = () => {
  const route = useRoute();
  const { restaurantId } = route.params;
  const { restaurant, loading: restaurantLoading, error: restaurantError, fetchRestaurant } = useContext(RestaurantContext);
  
  const [menuItems, setMenu] = useState(null);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    if (restaurantId && !restaurant) {
      fetchRestaurant(restaurantId);
    }
  }, [restaurantId, fetchRestaurant, restaurant]);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!restaurant || !restaurant._id) return;
      
      try {
        setMenuLoading(true);
        const menus_response = await axios.get(`http://localhost:6868/menus/restaurant/${restaurant._id}`);
        const menus = menus_response.data;

        if (menus.length > 0) {
          const menuId = menus[0].menu_id;
          const dishes_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
          setMenu(dishes_response.data);
        } else {
          setMenu([]);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        if (error.response && error.response.status === 404) {
          setMenuError('No menu found for this restaurant');
        } else {
          setMenuError('Error fetching menu data');
        }
      } finally {
        setMenuLoading(false);
      }
    };

    if (restaurant && !menuItems && !menuError) {
      fetchMenu();
    }
  }, [restaurant, menuItems, menuError]);

  if (restaurantLoading || menuLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (restaurantError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading restaurant: {restaurantError}</Text>
      </View>
    );
  }

  if (menuError) {
    return (
      <View style={styles.errorContainer}>
        <Text>{menuError}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text>No restaurant data available</Text>
      </View>
    );
  }

  if (menuItems && menuItems.length === 0) {
    return (
      <View>
        <Text style={styles.uploadText}>
          No menu items available for this restaurant.
        </Text>
      </View>
    );
  }

  return menuItems ? <MenuDetails menuItems={menuItems} /> : null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  }
});

export default MenuInfo;