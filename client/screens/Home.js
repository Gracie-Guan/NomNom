import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from '../Components/TopTabs';

const Stack = createStackNavigator();
import { SafeAreaView, StyleSheet } from 'react-native';

function RestaurantDetails() {
  return (
    <View style={styles.container}>
      <TopTabs />
    </View>
  );
}

export default function Home() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="RestaurantDetails" 
          component={RestaurantDetails} 
          options={{ title: 'Restaurant Name' }} 
        />
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
});