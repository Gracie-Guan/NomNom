import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, ActivityIndicator, Text, Switch } from 'react-native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import SearchBar from './SearchBar02';
import ImageUpload from './UploadImage';

const MenuInfo = ({ restaurantId }) => {
  const [menuItems, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true); // Set loading to true at the start

      setTimeout(async () => {

      try {
        const first_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}?timestamp=${new Date().getTime()}`);

        // response.data is an array of menus
        const menus = first_response.data;

        // Access the restaurant_id of the first (and only) menu
        const menuId = menus[0].menu_id;
        const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}?timestamp=${new Date().getTime()}`)

        // console.log(second_response.data);
        setMenu(second_response.data);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    }, 500); // Delay of 1 second
  };

  useEffect(() => {
    fetchMenu();},
    [restaurantId]);

  if (loading) {
    console.log("--- loading data... #2");
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
    <View style={{ flex: 1 }}>
      {/* <View style={styles.container}>
        <Text>{isEnabled ? 'Search ' : 'Menu '}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}

      {/* {isEnabled ?
        (<SearchBar restaurantId={restaurantId} />) : (<MenuDetails menuItems={menuItems} restaurant_id={restaurantId} />)
      } */}
      <MenuDetails menuItems={menuItems} restaurant_id={restaurantId} />
      <View style={StyleSheet.container}>
      <SearchBar restaurantId={restaurantId} />
      <ImageUpload restaurantId={restaurantId} onPress={fetchMenu}/>

      </View>
    </View>);

};

const styles = StyleSheet.create({
  UploadButtonContainer: {
    backgroundColor: "#FFC93C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  UploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  UploadButtonStyle: {
    color: "white",
    // flex: 0,
    backgroundColor: "#FFC93C",
    // resizeMode: 'contain',
    width: 100,
    height: 50,
  },

  TouchableOpacityStyle: {
    // flex: 1,
    // flexDirection: "row",
    // position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
  },
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
  },
  // container: {
  //   flex: 0,
  //   // position: "absolute",
  //   flexDirection: 'row', // Arrange children horizontally
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   padding: "3%", // Optional padding
  // },
  floatingButton: {
    flex: 1,
    position: "absolute",
    // flexDirection: 'row', // Arrange children horizontally
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: "4%",
    marginRight: "-3%",
    right: 30,
    bottom: 30
  },
  container: {
    // flex: 1,
    backgroundColor: "#FFC93C",
    flexDirection: "row",
    justifyContent: 'flex-end', // Align children to the right
    alignItems: 'center', // Center items vertically
    padding: 16, // Optional padding
  }
});

export default MenuInfo;