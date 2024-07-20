import React, { createContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from './Components/TopTabs';
import axios from 'axios';

const Stack = createStackNavigator();

const RestaurantContext = createContext();

const uniquerestaurantId = "668f19c057dcfe28be26ddd1";

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

// const uniquerestaurantId = "668f19c057dcfe28be26ddd1";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabs />
    </SafeAreaView>
  );
}

export default function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen 
  //         name="Home" 
  //         component={HomeScreen} 
  //         options={{ title: 'Restaurant Name' }} 
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    <RestaurantProvider>
      <RestaurantContext.Consumer>
        {({ restaurant, loading, error }) => (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: restaurant ? restaurant.name : 'Loading...' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
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

export { RestaurantContext };