import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, ActivityIndicator, Text, Switch } from 'react-native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import SearchBar from './SearchBar02';
import FloatingSearchBar from './FloatingSearchBar';
import ImageUpload from './UploadImage';
import filter from 'lodash.filter';

const MenuInfo = ({ restaurantId }) => {
  const [menuItems, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // console.log('Search...');
  // console.log('query', query);
  // console.log('data', data);

  const handleSearch = () => {
    const formattedQuery = query.toLowerCase();
    console.log(formattedQuery);
    const filteredData = filter(fullData, (dish) => {
      return contains(dish, formattedQuery);
    });
    setData(filteredData);
    // setMenu(filteredData);
  };

  const contains = (dishInfo, query) => {
    if (dishInfo.name.toLowerCase().includes(query) || dishInfo.description.toLowerCase().includes(query) || dishInfo.category.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  const handleClear = () => {
    setQuery('');
    setData(fullData); // Reset data to fullData when cleared
  };

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
        // setMenu(second_response.data);
        // setData(second_response.data);

        setData(second_response.data);
        setFullData(second_response.data);
        
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
    // console.log("--- loading data... #2");
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
    <View style={{ flex: 1, flexDirection: 'column' }}>
            <FloatingSearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
      />
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
      <MenuDetails menuItems={data} restaurant_id={restaurantId} />
      {/* <View style={StyleSheet.container}> */}

      {/* <View style={styles.floatingContainer}> */}

      <ImageUpload restaurantId={restaurantId} onPress={fetchMenu}/>

      {/* </View> */}

      {/* </View> */}
    </View>);

};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20,  // Position it slightly above the bottom edge of the screen
    left: 20,    // Position it slightly away from the left edge of the screen
    right: 20,   // Position it slightly away from the right edge of the screen
    alignItems: 'center',  // Center the items horizontally
    justifyContent: 'flex-end', // Align items at the bottom of the container
    backgroundColor: '#fff',  // Optional: add a background color if needed
    padding: 10,
    borderRadius: 20,  // Round the corners of the container
    elevation: 5,      // Add some elevation for shadow (Android)
    shadowColor: '#000',  // Shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    zIndex: 1000, // Ensure it floats above other content
  },
  floatingSearchBar: {
    width: '100%',  // Make sure the search bar takes up full width of the container
    marginTop: 10,  // Add some space between the button and the search bar
  },
  imageUploadButton: {
    width: 50,  // Width of the round button
    height: 50, // Height of the round button
    borderRadius: 25,  // Make it round
  },
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