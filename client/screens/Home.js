import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from '../Components/TopTabs';
import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

const Stack = createStackNavigator();

const RestaurantContext = createContext();

const uniquerestaurantId = "669eddceb619f1ad6b948dba";

const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/restaurants/${uniquerestaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurant, loading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};

function RestaurantDetails() {
  return (
    <View style={styles.container}>
      <TopTabs />
    </View>
  );
}

export default function Home() {
  return (
    <RestaurantProvider>
      <RestaurantContext.Consumer>
        {({ restaurant, loading, error }) => (
            <Stack.Navigator>
              <Stack.Screen
                name="RestaurantDetails"
                component={RestaurantDetails}
                options={{ title: restaurant ? restaurant.name : 'Loading...' }}
              />
            </Stack.Navigator>
        )}
      </RestaurantContext.Consumer>
    </RestaurantProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
});