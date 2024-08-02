import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import ToggleButton from '../Components/ToggleButton';

const Surprise = () => {
  const [showRestaurant, setShowRestaurant] = useState(true);

  const handleToggle = (isRestro) => {
    setShowRestaurant(isRestro);
    console.log(isRestro ? 'Showing Restaurants' : 'Showing Dishes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <ToggleButton style="icon-based" onToggle={handleToggle} />
        </View>
        <View style={styles.cardContainer}>
          {showRestaurant ? (
            <RestaurantCard layout="surprise" />
          ) : (
            <DishCard layout='surprise' />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFB300', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  toggleContainer: {
    width: '100%',
    alignItems:'flex-end',
  },
  cardContainer: {
    flex:1,
    justifyContent:'center',
    width: '100%',
    alignItems: 'center',
  },
});

export default Surprise;