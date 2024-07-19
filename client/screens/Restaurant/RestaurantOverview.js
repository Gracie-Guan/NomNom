import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import TopTabs from '../../Components/TopTabs';
import { NavigationContainer } from '@react-navigation/native';

const RestaurantOverview = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Restaurant</Text>
        <Text>4.8 (156 reviews)</Text>
        <Text>Location of the Restaurant, exactly where</Text>
        <Text>2.4 km away | €40-€60 for two</Text>
        <Text>French Cuisine</Text>
        <Text>Open | 9am - 6pm</Text>
      </View>
      
      <NavigationContainer>
      <View style={styles.buttonGroup}>
          <TopTabs />
      </View>
      </NavigationContainer>

      <View style={styles.card}>
        <Text style={styles.title}>Menu</Text>
        <Text>Popular Dishes</Text>
        {/* Add image placeholders here */}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Photos</Text>
        {/* Add image placeholders here */}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Reviews</Text>
        {/* Add review content here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default RestaurantOverview;