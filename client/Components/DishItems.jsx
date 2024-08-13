import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';

const DishItem = ({name, price, description, rate}) => {
    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);

    const toggleRatingVisibility = () => {
        setRatingVisible(!ratingVisible);
    };

    const selectRating = (rating) => {
        setSelectedRating(rating);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => selectRating(i)}>
                    <MaterialIcons
                        name="star"
                        size={30}
                        color={i <= selectedRating ? "#FFB300" : "#9E9E9E"}
                    />
                </TouchableOpacity>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };
    return (
    <TouchableOpacity onPress={toggleRatingVisibility}>
    <View style={styles.dishContainer}>
        <View style={styles.dishTop}>
            <View style={styles.dishName}>
                <Text style={styles.dishNameText}>{name}</Text>
                <View style={styles.heartIcon}>
                    <Feather name="heart" size={15} color="grey" />
                </View>
            </View>
            <View style={styles.dishPrice}>
                <Text style={styles.dishPriceText}>€ {price}</Text>
            </View>
        </View>
        <View style={styles.dishMiddle}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </View>
        <View style={styles.dishBottom}>
            <View style={styles.dishRate}>
                <MaterialIcons name="star" size={15} color="#FFB300" />
                <Text style={styles.dishRateText}>{rate}</Text>
                <Feather name="chevron-right" size={15} color="#FFB300" />
            </View>
        </View>
    </View>
    {ratingVisible && renderStars()}
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dishContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        marginBottom: 10
    },
    dishTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dishName:{
        flexDirection: 'row',
    },
    dishNameText:{
        fontSize: 14,
        fontWeight: 'bold',
        paddingRight: 10
    },
    heartIcon:{
        paddingTop: 1
    },
    dishPriceText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingRight: 5
      },
    dishMiddle: {
        width: '80%'
      },
    descriptionText: {
        fontSize: 14,
        color: 'grey',
    },
    dishBottom: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
    },
    dishRate: {
        flexDirection: 'row'
    },
    dishRateText: {
        fontSize: 11,
        color:'#9E9E9E',
        fontWeight: 'bold',
        paddingLeft: 2,
        paddingRight: 3
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    }
})

export default DishItem