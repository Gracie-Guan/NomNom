import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Linking, ActivityIndicator, Text, Switch, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import SearchBar from '../screens/Restaurant/SearchBar';
import ImageUpload from './UploadImage';

const MenuInfo = ({ restaurantId }) => {
  const [menuItems, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  // const [showComponent, setShowComponent] = useState(true);
  // const [showAction, setShowAction] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const toggleAction = () => {
  //   setShowAction(!showAction);
  // };

  // const reloadComponent = () => {
  //   setShowComponent(false); // Unmount the component
  //   setTimeout(() => {
  //     setShowComponent(true); // Remount the component after a brief delay
  //   }, 0);
  // };

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

  //   fetchMenu();
  // }, [restaurantId]);

  useEffect(() => {
    fetchMenu();},
    [restaurantId]);

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

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

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
      <View style={styles.container}>
        <Text>{isEnabled ? 'Search ' : 'Menu '}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      
      {isEnabled ?
        (<SearchBar restaurantId={restaurantId} />) : (<MenuDetails menuItems={menuItems} restaurant_id={restaurantId} />)
      }

      {/* <View style={styles.floatingButton}>
        {(showAction && <TouchableOpacity activeOpacity={0.5} style={styles.UploadButtonContainer}>
          <Text style={styles.UploadButtonText}>Upload menu</Text>
        </TouchableOpacity>)}

        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={toggleAction}>
          <Image source={{ uri: 'http://lh3.googleusercontent.com/TI8o079rVoxaQ5ZeDcLfQRlS7MQrwNbpGh4-WdOYC2lYIZk1jAhABtABLU_kl2aReCSl=w300' }}
            style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
      </View> */}
      <ImageUpload restaurantId={restaurantId} onPress={fetchMenu}/>
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
    // width: "fitContent",
    width: 100,
    height: 50,
  },

  TouchableOpacityStyle: {
    // flex: 1,
    // flexDirection: "row",
    // position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    // right: 30,
    // bottom: 30
    // borderRadius: 100,
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
  container: {
    flex: 0,
    // position: "absolute",
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: "3%", // Optional padding
  },
  floatingButton: {
    flex: 1,
    position: "absolute",
    // flexDirection: 'row', // Arrange children horizontally
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: "4%",
    marginRight: "-3%",
    // padding: "3%", // Optional padding
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