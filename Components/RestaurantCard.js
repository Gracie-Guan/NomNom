import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from "react-native"
import { useState } from "react"
import { Feather, MaterialIcons} from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const RestaurantCard = () => {
    const restaurantsData = [
        {
          id: '1',
          name: 'Restaurant A',
          country: 'China',
          price: '€20',
          openTime: '11am - 10pm',
          rated: '4.5',
          address: 'Dublin 6',
          distance: '1.2km',
          photo: 'https://www.sage.com/en-gb/blog/wp-content/uploads/sites/10/2021/06/sandra-seitamaa-OFJGlG3sKik-unsplash-1.jpg',
          isFavorite: false
        },
        {
          id: '2',
          name: 'Restaurant B',
          country: 'Singapore',
          price: '€30',
          openTime: '10am - 9pm',
          rated: '4.7',
          address: 'Dublin 2',
          distance: '0.8km',
          photo: 'https://www.rai.ie/wp-content/uploads/2023/03/rai_homepage-scaled.jpeg',
          isFavorite: false
        },
        {
          id: '3',
          name: 'Restaurant C',
          country: 'Italy',
          price: '€40',
          openTime: '12pm - 11pm',
          rated: '4.2',
          address: 'Dublin 8',
          distance: '2.5km',
          photo: 'https://i2-prod.corkbeo.ie/incoming/article28850499.ece/ALTERNATES/s615/37367099_10156707440590799_2826022089163538432_njpeg.jpg',
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
                        <MaterialIcons
                            name="star"
                            size={20}
                            color="#FFB300"
                        />
                        <Text style={styles.rateText}>{item.rated}</Text>
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
                            <Feather name="pocket" size={16} color="#fff" />
                            <Text style={{textAlign:'center', fontSize: 14, fontWeight: 'bold', color: 'white', paddingLeft: 4}}>
                                Menu
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
                        <Text style={{fontSize: 13, color:'#6E6E6E', fontWeight: '400',paddingRight: 5}}>Avg {item.price}</Text>
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
        top: 7,
        left: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    rateText: {
        paddingTop: 2,
        fontSize: 14,
        color: '#E65100'
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
        width: 75,
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