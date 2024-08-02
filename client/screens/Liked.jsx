import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ToggleButton from '../Components/ToggleButton';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';

const Liked = () => {
  const [showRestaurants, setShowRestaurants] = useState(true);

  const handleToggle = (isRestro) => {
    setShowRestaurants(isRestro);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Favs</Text>
      <View style={styles.toggleContainer}>
        <ToggleButton style="pill" onToggle={handleToggle} />
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {showRestaurants ? (
          <View>
            <RestaurantCard layout="default" />
          </View>

        ) : (
          <View>
            <DishCard layout="default" />
          </View>

        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  toggleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Liked;