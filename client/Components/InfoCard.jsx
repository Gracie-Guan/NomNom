import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image, TouchableOpacity} from 'react-native';
import {MaterialIcons, Feather} from '@expo/vector-icons'
import PopDishes from './PopDishes';
import PhotoCard from './PhotoCard';

const InfoCard = () => {
  return(
<View style={styles.detailsContainer}>
    <Text style={styles.detailsText}>SOLE Seafood and Grill</Text>
    <View style={styles.ratingContainer}>
        <View style={styles.rating}>
            <MaterialIcons name='star' color={'#FFA900'} size={20}/>
            <Text style={styles.ratingText}>4.8</Text>
        </View>
        <View  style={styles.reviewNumber}>
            <Text style={styles.reviewNumberText}>156</Text>
            <Text style={styles.reviewNumberText}>reviews</Text>
        </View>
    </View>
    <View style={styles.addressContainer}>
        <View style={styles.address}>
            <Text style={styles.addressText}>28 Bridge St., Carlow, County Kerry</Text>
        </View>
        <View style={styles.distance}>
            <Text style={styles.distanceText}>2.4km away|</Text>
            <Text style={styles.priceText}>€50 avg</Text>
        </View>
        <View style={styles.type}>
            <Text style={styles.typeText}>Seafood</Text>
            <View style={styles.openButton}>
                <Text style={styles.openType}>open</Text>
            </View>
        </View>
        <View style={styles.twoButton}>
            <TouchableOpacity style={styles.map}>
                <Feather name='compass' color={'#FFA900'} size={20}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.phone}>
                <Feather name='phone-call' color={'#FFA900'} size={20}/>
            </TouchableOpacity>
        </View>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    position:'absolute',
    top: 230,
    left:0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  detailsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer:{
    position:'absolute',
    top: -50,
    right: 10,
    margin: 10,
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 20
  },
  rating: {
   height: 40,
   backgroundColor: 'white',
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
   flexDirection: 'row',
   justifyContent:'center',
   alignItems: 'center',
   paddingTop: 10,
   paddingRight: 5
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewNumber: {
    height: 40,
    backgroundColor: '#FFA900',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom: 5
   },
   reviewNumberText:{
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
   },
   addressContainer: {
    marginTop: 20,
    backgroundColor: 'white'
   },
   addressText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   distance: {
    flexDirection: 'row',
    marginTop: 5
   },
   distanceText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   priceText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#000'
   },
   type: {
     flexDirection: 'row',
     marginTop: 5
   },
   typeText: {
    fontSize: 14,
    fontWeight: '500',
    color:'#9E9E9E'
   },
   openType: {
    fontSize: 14,
    fontWeight: '500',
    color:'#000'
   },
   openButton: {
    marginLeft: 10,
    backgroundColor: '#7DEF37',
    paddingHorizontal: 10,
    borderRadius: 10
   },
   twoButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
   },
   map: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
   },
   phone: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
   },
});

export default InfoCard