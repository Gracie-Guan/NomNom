import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Linking, ActivityIndicator, Text } from 'react-native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import { RestaurantContext } from '../Context/RestaurantContext';

const MenuInfo = ({ restaurantId }) => {
  const [menuItems, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);

      setTimeout(async () => {

      try {
        
        const first_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);

        // response.data is an array of menus
        const menus = first_response.data;

        // Access the restaurant_id of the first (and only) menu
        const menuId = menus[0].menu_id;
        const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`)

        // console.log(second_response.data);
        setMenu(second_response.data);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
}

useEffect(()=> {
    fetchMenu();
  }, [restaurantId]);

  // console.log(menuItems);

  // if (menuItems == "[]") {
  //   return (
  //     <View>
  //       <Text style={styles.uploadText}>
  //         Be the first to upload a menu!
  //       </Text>
  //     </View>
  //   ); 
  // } 

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

  return <MenuDetails menuItems={menuItems} />;

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