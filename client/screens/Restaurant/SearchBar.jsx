import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import filter from 'lodash.filter';

function SearchBar({ restaurantId }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideResultNumber, setResultNumber] = useState(true);

  const [error, setError] = useState(null);
  // const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const renderHeader = () => {
    const [query, setQuery] = useState('');
    const [length, setLength] = useState('');

    const handleSearch = () => {
      const formattedQuery = query.toLowerCase();
      console.log(formattedQuery);
      const filteredData = filter(fullData, (dish) => {
        return contains(dish, formattedQuery);
      });
      setData(filteredData);
      setLength(filteredData.length);
    };

    return (
      <View style={styles.searchContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => setQuery(queryText)}
          onEndEditing={queryText => setQuery(queryText)}
          // value={query}
          placeholder="Search"
          style={styles.searchInput}
          onFocus={handleFocus}
        // onBlur={handleBlur}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    )
  };

  const contains = (dishInfo, query) => {

    if (dishInfo.name.toLowerCase().includes(query) || dishInfo.description.toLowerCase().includes(query) || dishInfo.category.toLowerCase().includes(query)) {
      console.log("search result: ", dishInfo.name);
      if (query === "") {
        setResultNumber(true);
      } else {
        setResultNumber(false);
      }
      
      return true;
    }
    // setResultNumber(false);
    return false;
  };

  useEffect(() => {

    console.log('Component mounted');

    const fetchDishName = async () => {
      try {
        setIsLoading(true);
        console.log("AAA - restaurant ID: ", restaurantId);
        const first_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);
        const menus = first_response.data;

        if (menus.length === 0) {
          throw new Error('No menus found for the specified restaurant ID.');
        }

        const menuId = menus[0].menu_id;
        console.log("BBB - menu ID: ", menuId);
        const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
        // console.log("second_response.data: ", second_response.data);

        setData(second_response.data);
        setFullData(second_response.data);
        console.log("data.length: ", data.length, second_response.data)
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishName();

    return () => {
      console.log('Component will unmount');
    };

  }, [restaurantId]);

  const handleFocus = () => {
    console.log('TextInput is focused');
  };

  const handleBlur = () => {
    console.log('TextInput lost focus');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  console.log("hide result number: ", hideResultNumber);

  return (
    <View style={styles.resultContainer}>
      {/* <Text style={styles.searchTitle}>Dish Search</Text> */}
      <FlatList
        ListHeaderComponent={() => (
          // <View>
          //   {renderHeader()}
          //   {
          //     <Text style={{textAlign: "end"}}>{data.length} results</Text>
          //   }
          // </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            {renderHeader()}
            { hideResultNumber === true ? (
            <Text style={{ alignSelf: "flex-end", marginRight: "3%" }}>All dishes</Text>
            ) : ( <Text style={{ alignSelf: "flex-end", marginRight: "3%" }}>{data.length} results</Text>
            )
            }
          </View>
        )} data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  noData: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#666',
    textAlign: "center"
  },

  textContainer: {
    flex: 1, // Take up remaining space
    flexDirection: 'column', // Column layout for the text within the item
    justifyContent: 'center',
  },

  description: {
    fontSize: 14,
    color: '#888',
  },

  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  // text: {
  //   fontSize: 20,
  //   color: '#101010',
  //   marginTop: 60,
  //   fontWeight: '700',
  // },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  resultContainer: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    marginBottom: 30
  },

  name: {
    fontSize: 18,
    width: '70%', // Adjust this width as needed
  },
  price: {
    fontSize: 18,
    width: '30%', // Adjust this width as needed
    textAlign: 'right', // Aligns the text to the right
  },

  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15
  },
});

export default SearchBar;
