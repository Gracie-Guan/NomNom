import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-paper'
import {Feather, MaterialIcons} from '@expo/vector-icons'

const DishItem = ({name, price, description, rate = "4.8"}) => {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };
    return (
    <TouchableOpacity onPress={toggleDescription}>
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
        <View style={styles.dishBottom}>
            <View style={styles.descriptionContainer}>
                {isDescriptionVisible && (
                    <Text style={styles.descriptionText}>{description}</Text>
                )}
            </View>
            <View style={styles.dishRate}>
                <MaterialIcons name="star" size={15} color="#FFB300" />
                <Text style={styles.dishRateText}>{rate}</Text>
                <Feather name="chevron-right" size={15} color="#FFB300" />
            </View>
        </View>
    </View>
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
        paddingVertical: 5
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
      dishBottom: {
       flexDirection: 'row',
       justifyContent:'space-between',
       paddingTop: 3
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
      descriptionContainer: {
        flexDirection: 'column',
    },
    descriptionText: {
        fontSize: 14,
        color: 'grey',
    },
})

export default DishItem