import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from "react-native"
import { useState } from "react"
import { Feather, MaterialIcons} from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const RestaurantCard = () => {
    const restaurantsData = [
        {
          id: '1',
          name: 'Dish A',
          country: 'China',
          price: '€20',
          openTime: '11am - 10pm',
          rated: '4.5',
          address: 'Dublin 6',
          distance: '1.2km',
          photo: 'https://media.cnn.com/api/v1/images/stellar/prod/220926135112-01-body-chinese-foods-ziao-long-bao.jpg?q=w_1110,c_fill',
          isFavorite: false
        },
        {
          id: '2',
          name: 'Dish B',
          country: 'Singapore',
          price: '€30',
          openTime: '10am - 9pm',
          rated: '4.2',
          address: 'Dublin 2',
          distance: '0.8km',
          photo: 'https://www.celebritycruises.com/blog/content/uploads/2024/02/best-food-in-singapore-chili-crab-1024x683.jpg',
          isFavorite: false
        },
        {
          id: '3',
          name: 'Dish C',
          country: 'Italy',
          price: '€40',
          openTime: '12pm - 11pm',
          rated: '4.7',
          address: 'Dublin 8',
          distance: '2.5km',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr37ueBYahwtAE8qyRJ3bRBmZ9iT6uEE5ElQ&s',
          isFavorite: false
        },
      ];
      const [restaurants, setRestaurants] = useState(restaurantsData)

      const handleFavoriteToggle = (id) => {
        setRestaurants((prevRestaurants) =>
            prevRestaurants.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant
            )
        );
    };
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.map((item)=> {
            return(
            <TouchableOpacity
            key={item.id}
            style={styles.resCard}
            >
            <View style={styles.restaurantCard}>
                <View style={styles.restaurantImage}>
                    <Image source={{uri:item.photo}} style={styles.imageStyle}/>
                    <View  style={styles.rateTop}>
                        <Text style={styles.rateText}>{item.price}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.heartIconContainer}
                        onPress={() => handleFavoriteToggle(item.id)}
                    >
                        <Ionicons
                            name = {item.isFavorite ? "heart":"heart-outline"} 
                            size={18}
                            color={item.isFavorite ? "red" : "white"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.restaurantInfo}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingTop: 5}}>
                            {item.name}
                        </Text>
                        <TouchableOpacity style={styles.menuButton}>
                            <MaterialIcons
                                name="star"
                                size={18}
                                color="#FFB300"
                            />
                            <Text style={{textAlign:'center', fontSize: 14, fontWeight: '500', color: 'white', paddingLeft: 4}}>
                                {item.rated}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.address}>
                        <View style={styles.addressLeft}>
                            <Feather name="map-pin" size={16} color="#E65100" />
                            <Text style={{fontSize: 13, color:'#6E6E6E', fontWeight: '400', paddingLeft: 5}}>
                                {item.address}
                            </Text>
                        </View>
                        <Text style={{fontSize: 13, color:'#6E6E6E', fontWeight: '400', paddingRight: 5}}>
                            {item.distance}
                        </Text>
                    </View>
                    <View style={styles.country}>
                        <View style={styles.countryLeft}>
                            <FontAwesome5 name="concierge-bell" size={16} color="#E65100" />
                            <Text style={{fontSize: 13, color:'#6E6E6E', fontWeight: '400', paddingLeft: 5}}>{item.country}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        )
        })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    resCard:{
        marginRight: 10,
        marginBottom: 10,
        shadowColor: 'rgb(100, 100, 100)',
        shadowOffset : {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    restaurantImage:{
        width: 323,
        height: 144,
        backgroundColor: 'white'
    },
    imageStyle: {
        width: 323,
        height: 144,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    rateTop:{
        position: 'absolute',
        top: 8,
        left: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    rateText: {
        paddingTop: 2,
        fontSize: 18,
        color: '#E65100',
        fontWeight: '700',
    }, 
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 15,
        padding: 5,
    },
    restaurantInfo:{
        height: 85,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    menuButton : {
        backgroundColor: '#536DFE',
        width: 60,
        height: 25,
        borderRadius: 20,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    address: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    addressLeft: {
        flexDirection: 'row'
    },
    country: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryLeft: {
        flexDirection: 'row'
    }
})
export default RestaurantCard