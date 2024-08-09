import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

// const dishesData= [
//   {
//       id: 1,
//       dishPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQW26PAs2xhRm4OD9NopajG-Dwu032ADabTw&s',
//       dishName: 'Tiramisu'
//   },
//   {
//       id: 2,
//       dishPhoto: 'https://bmppnorthridgeca.com/wp-content/uploads/2023/10/Lasagna-1024x536-1.png',
//       dishName: 'Pizza'
//   },
//   {
//       id: 3,
//       dishPhoto: 'https://images.squarespace-cdn.com/content/v1/5e484ab628c78d6f7e602d73/c0adbacb-2928-4a48-ad5e-65b6524e15e9/What+to+eat+in+Rome%2C+Italy-Caccio+e+Pepe-min.png',
//       dishName: 'Pasta'
//   },
//   {
//       id: 4,
//       dishPhoto: 'https://www.weaversorchard.com/wp-content/uploads/2019/06/Frutti-Di-Bosco-Gelato-1000.jpg',
//       dishName: 'Ice cream'
//   },
// ]


const PopDishes = ({ restaurantId }) => {
    const [dishesData, setDishesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDishes = async () => {
        try {
          console.log("restaurantId: ", restaurantId);

          const menuResponse = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);
          const menus = menuResponse.data;
          
          if (menus.length === 0) {
            throw new Error('No menus found for the specified restaurant ID.');
          }
          
          const menuId = menus[0].menu_id;
  
          console.log("menuId: ", menuId);
          // Fetch the dishes using the menuId
          const dishesResponse = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
          console.log("menuId: ", menuId);

          const dishes = dishesResponse.data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 4);
          setDishesData(dishes);
        } catch (err) {
          setError('Error fetching dishes');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDishes();
    }, [restaurantId]);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#FF9400" />;
    }
  
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

  return (
    <View style={styles.popularDishes}>
    <View style={styles.dishTop}>
        <Feather name='award' color={'#E65100'} size={25}/>
        <Text style={styles.popularTitle}>Popular Dishes</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dishMiddle}>
        {dishesData.map((dish,index)=> (
            <View key={dish._id || index} style={styles.dishesContainer}>
                <Image source={{uri: dish.image|| 'https://via.placeholder.com/110x82'}} style={styles.dishesImage}/>
                <Text style={styles.dishesName}>{dish.name}</Text>
            </View>
        ))}
        </View>
    </ScrollView>
    <View style={styles.dishbottom}>
        <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.buttonText}>Explore Full Menu</Text>
        </TouchableOpacity>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
  popularDishes: {
    marginTop: 50
   },
   dishTop: {
    flexDirection: 'row',
    // backgroundColor: "pink"
   },
   popularTitle: {
    color: '#221C19',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
    marginTop: 2
   },
   dishMiddle:{
    marginVertical: 15,
    marginHorizontal: 5,
    flexDirection: 'row',

   },
   dishesContainer: {
    width: 110,
    marginRight: 8
   },
   dishesImage: {
    width: 110,
    height: 82,
    borderRadius: 10
   },
   dishesName:{
    color: '#636363',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
    paddingTop: 5
   },
   dishbottom: {
    justifyContent: 'center',
    alignItems: 'center'
   },
   menuButton: {
    width: 350,
    height: 30,
    backgroundColor: '#FF9400',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
   },
   buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
   },
});

export default PopDishes;