import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import RatingBar from './RatingBar'
import { LinearGradient } from 'expo-linear-gradient';

function RatingCard(){
    const tasteRating = 4.2
    const authRating = 4.8
    const ambiRating = 3.8
    const rating = 4
    return(
        <View style={styles.ratingContainer}>
            <View style={styles.ratingTitle}>
                <Text style={styles.ratingText}>Ratings</Text>
            </View>
            <View style={styles.ratingNumber}>
                <View style={styles.numberLeft}>
                    <Text style={styles.leftText}>4.6</Text>
                </View>
                <View style={styles.numberRight}>
                    <View style={styles.star}>
                    {Array.from({ length: 5 }, (_, index) => (
                       <MaterialIcons
                           key={index}
                           name="star"
                           size={20}
                           color={index < rating ? "#FFB300" : "#EEEEEE"}
                           style={styles.starIcon}
                       />
                   ))}
                    </View>
                    <View style={{fontFamily:'Ubuntu-Regular'}}>
                        <Text style={styles.underStarText}>Based on 21 ratings</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ratingCategory}>
                <View style={styles.separator} />
                <View style={styles.rateBar}>
                    <View style={styles.bar}>
                        <RatingBar rating={tasteRating} category="Taste" 
                        startColor="#B9C4FF" 
                        endColor="#536DFE"/>
                    </View>
                    <View style={styles.bar}>
                        <RatingBar rating={authRating} category="Authenticity" 
                                      startColor="#FFEDD1" 
                                      endColor="#FFB300" />
                    </View>
                    <View style={styles.bar}>
                        <RatingBar rating={ambiRating} category="Ambience" 
                        startColor="#FFCDB1" 
                        endColor="#E65100"/>
                    </View>
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    ratingContainer: {
      height: 260,
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 4,
      marginVertical: 15,
    },
    ratingTitle: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 15,
      
    },
    ratingText:{
      fontSize: 16,
      fontFamily:'Ubuntu-Bold'
    },
    ratingNumber: {
      height: 55,
      paddingHorizontal:20,
      flexDirection: 'row',
    },
    numberLeft:{
      width: 65,
    },
    leftText: {
      fontSize: 40,
      fontFamily:'Ubuntu-Bold'
    },
    numberRight: {
      marginLeft: 25,
      marginTop: 5,
    },
    star:{
      flexDirection: 'row'
    },
    starIcon:{
      marginRight: 5
    },
    underStarText: {
      fontSize: 12,
      fontFamily:'Ubuntu-Regular',
      color: '#9E9E9E',
      paddingTop: 5,
      paddingLeft: 4
    },
    ratingCategory:{
      height: 150,
    },
    separator: {
      height: 1,   
      width: '90%', 
      backgroundColor: '#CED0CE', 
      alignSelf: 'center'
    },
    bar:{
      marginTop: 10,
      marginHorizontal:16,
    },


  })

export default RatingCard