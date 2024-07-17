import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const PopDishes = () => {
  // Sample data for popular dishes
  const popularDishes = [
    { id: 1, name: 'Spaghetti Carbonara', image: 'https://via.placeholder.com/150?text=Carbonara' },
    { id: 2, name: 'Margherita Pizza', image: 'https://via.placeholder.com/150?text=Pizza' },
    { id: 3, name: 'Caesar Salad', image: 'https://via.placeholder.com/150?text=Salad' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Rated Dishes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popularDishes.map((dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <Image source={{ uri: dish.image }} style={styles.image} />
            <Text style={styles.dishName}>{dish.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dishContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  dishName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default PopDishes;