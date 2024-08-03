import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Text, Platform } from 'react-native';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import ToggleButton from '../Components/ToggleButton';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const Surprise = ({navigation}) => {
  const [showRestaurant, setShowRestaurant] = useState(true);

  const handleToggle = (isRestro) => {
    setShowRestaurant(isRestro);
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
            <View>
              <RestaurantCard layout="surprise" />
            </View>

          ) : (
            <View>
              <DishCard layout='surprise' />
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.smallButton} onPress>
           <Feather name="rotate-ccw" size={24} color="#9e9e9e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mehButton} onPress>
            <Feather name="meh" size={40} color="#FFEDD1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeButton} onPress>
            <Ionicons name="heart" size={40} color="#FFEDD1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress>
            <Ionicons name="navigate-outline" size={24} color="#FFB300" />
          </TouchableOpacity>

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

  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width: '115%',
  },

  smallButton:{
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  mehButton: {
    width: 80,
    height:80,
    backgroundColor:'#536DFE',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  likeButton:{
    width: 80,
    height:80,
    backgroundColor:'#E65100',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  }
});

export default Surprise;