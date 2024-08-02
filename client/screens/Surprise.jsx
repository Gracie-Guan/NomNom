import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import RestaurantCard from '../Components/RestroCards';

const Surprise = () => {
  return (
    <View style={styles.container}>
      <RestaurantCard layout="surprise" />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
  },
});

export default Surprise;