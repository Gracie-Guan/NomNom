import React,  { useContext }from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import InfoCard from '../Components/InfoCard';
import PopDishes from '../Components/PopDishes';
import PhotoCard from '../Components/PhotoCard';
import ReviewCard from '../Components/ReviewCard';
import { RestaurantContext } from '../App';

const RestaurantOverview = ({ }) => {
  const { restaurant, loading, error } = useContext(RestaurantContext);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading restaurant data: {error}</Text>;
  }

  return (
    // <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    //     <View style={styles.imageContainer}>
    //         <Image source={{uri:'https://www.telegraph.co.uk/multimedia/archive/02999/restaurant_2999753b.jpg'}} style={styles.topImage}/>
    //         <TouchableOpacity style={styles.heartContainer}>
    //             <Feather name="heart" size={20} color="#fff" style={styles.heartIcon} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.uploadContainer}>
    //             <Feather name="upload" size={20} color="#fff" style={styles.uploadIcon} />
    //         </TouchableOpacity>
    //         <InfoCard />
    //     </View>
    //     <View style={styles.threeSection}>
    //         <PopDishes />
    //         <PhotoCard />
    //         <ReviewCard />
    //     </View>
    // </ScrollView>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InfoCard restaurantId={restaurant._id}/>
    <View style={styles.threeSection}>
      <PopDishes restaurantId={restaurant._id}/>
      <PhotoCard />
      <ReviewCard />
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // topImage: {
  //   width: '100%',
  //   height: 260
  // },
  // imageContainer: {
  //   position: 'relative'
  // },
  // heartContainer : {
  //   position: 'absolute',
  //   top: 15,
  //   right: 10,
  //   backgroundColor: 'black',
  //   borderRadius: 15,
  //   padding: 5
  // },
  // uploadContainer:{
  //   position: 'absolute',
  //   top: 15,
  //   right: 50,
  //   backgroundColor: 'black',
  //   borderRadius: 15,
  //   padding: 5
  // },
  threeSection: {
    marginTop: 140,
    marginBottom: 60,
    marginHorizontal: 12,
  },

});

export default RestaurantOverview;