import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import ToggleButton from '../Components/ToggleButton';
import Feather from '@expo/vector-icons/Feather';

const Surprise = ({navigation}) => {
  const [showRestaurant, setShowRestaurant] = useState(true);

  const handleToggle = (isRestro) => {
    setShowRestaurant(isRestro);
    console.log(isRestro ? 'Showing Restaurants' : 'Showing Dishes');
  };
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#221C19" />
            <Text style={styles.normalText}>Back</Text>
          </TouchableOpacity>
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
    flexDirection:'row',
    width: '100%',
    alignItems:'center',
    justifyContent:'space-between',
  },
  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },

  cardContainer: {
    flex:1,
    justifyContent:'center',
    width: '100%',
    alignItems: 'center',
  },

  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#221C19',
    marginLeft: 5,
  },
});


export default Surprise;