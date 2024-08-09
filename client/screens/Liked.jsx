import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import ToggleButton from '../Components/ToggleButton';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import Feather from '@expo/vector-icons/Feather';


const Liked = ({ navigation }) => {
  const [showRestaurants, setShowRestaurants] = useState(true);

  const handleToggle = (isRestro) => {
    setShowRestaurants(isRestro);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#6e6e6e" />
          <Text style={styles.normalText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Your Favs</Text>
      </View>

      <View style={styles.toggleContainer}>
        <ToggleButton style="pill" onToggle={handleToggle} />
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {showRestaurants ? (
          <View>
            <RestaurantCard layout="default" />
            {/* <RestaurantCard layout='list'/> */}
          </View>

        ) : (
          <DishCard layout="default" />
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    color: '#6e6e6e',
    marginLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu-Bold',
  },
  toggleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Liked;