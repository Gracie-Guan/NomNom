import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import RatingBar from './RatingBar'

function RatingCard({rating_info}){
    const tasteRating = rating_info.rating_details[0].taste;
    const authRating = rating_info.rating_details[0].authenticity;
    const ambiRating = rating_info.rating_details[0].ambience;
    

    console.log("Rating Card: rating_info", rating_info);

    console.log("Rating Card:", rating_info.rating_details[0].taste);
    return(
        <View style={styles.ratingContainer}>
            <View style={styles.ratingTitle}>
                <Text style={styles.ratingText}>Ratings</Text>
            </View>
            <View style={styles.ratingNumber}>
                <View style={styles.numberLeft}>
                    <Text style={styles.leftText}>{rating_info.rating}</Text>
                </View>
                <View style={styles.numberRight}>
                    <View style={styles.star}>
                    {Array.from({ length: 5 }, (_, index) => (
                       <MaterialIcons
                           key={index}
                           name="star"
                           size={20}
                           color={index < rating_info.rating ? "#FFB300" : "#EEEEEE"}
                           style={styles.starIcon}
                       />
                   ))}
                    </View>
                    <View style={styles.rightText}>
                        <Text style={styles.underStarText}>Based on 21 ratings</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ratingCategory}>
                <View style={styles.separator} />
                <View style={styles.rateBar}>
                    <View style={styles.bar}>
                        <RatingBar rating={tasteRating} category="Taste" fillColor="#536DFE"/>
                    </View>
                    <View style={styles.bar}>
                        <RatingBar rating={authRating} category="Authenticity" fillColor="#FFB300" />
                    </View>
                    <View style={styles.bar}>
                        <RatingBar rating={ambiRating} category="Ambience" fillColor="#E65100"/>
                    </View>
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    ratingContainer: {
      height: 250,
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
      marginBottom: 10
    },
    ratingTitle: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 15
    },
    ratingText:{
      fontSize: 16,
      fontWeight: 'bold'
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
      fontWeight: '700'
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
      fontWeight:'500',
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
      marginTop: 10
    }
  })

export default RatingCard