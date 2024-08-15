import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { View, StyleSheet, Linking, ActivityIndicator, Text } from 'react-native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import { RestaurantContext } from '../Context/RestaurantContext';
import ImageUpload from './UploadImage';

const MenuInfo = ({ }) => {
  const [menuItems, setMenuItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);

  const { restaurant } = useContext(RestaurantContext);

  // useEffect(() => {
    const fetchMenu = async () => {
      if (!restaurant || !restaurant._id) {
        setError('Invalid restaurant ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { _id: restaurantId } = restaurant;
        setRestaurantId(restaurantId);
        console.log("restaurantId: ", restaurantId);

        const { data: menus } = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);

        if (!menus.length) {
          throw new Error('No menus found for this restaurant.');
        }

        const { menu_id: menuId } = menus[0];
        const { data: dishes } = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);

        setMenuItems(dishes);
      } catch (error) {
        setError(error.message || 'Error fetching menu data');
        console.error('Error fetching restaurant menu:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMenu();
  }, [restaurant]);

  if (loading) {
    return (
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
        <ActivityIndicator size="large" color="#FFC93C" />
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

  return (
  <View style={{flex: 1}}>
  <MenuDetails menuItems={menuItems} />
  <ImageUpload restaurantId={restaurantId} onPress={fetchMenu}/>
  </View>
  );

};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    margin: 2,
  },
  website: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  }
});

export default MenuInfo;