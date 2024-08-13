import { View, Text , StyleSheet, ActivityIndicator} from 'react-native';
import RatingCard from '../../Components/RatingCard';
import ReviewBlock from '../../Components/ReviewBlockk';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';


const Reviews=({restaurantId}) => {

  const [ratings, setRatings] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);

      setTimeout(async () => {

      try {
        console.log("Reviews - restaurantId: ", restaurantId);
        
        const first_response = await axios.get(`http://localhost:6868/reviews/restaurantId/${restaurantId}`);

        // response.data is an array of menus
        console.log("Reviews - first response: ", first_response.data[0]);

        // const ratingsresponse = first_response.data;

        // Access the restaurant_id of the first (and only) menu
        // const menuId = menus[0].menu_id;
        // const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`)

        // console.log(second_response.data);
        setRatings(first_response.data[0]);
        setReviews(first_response.data);
        // console.log("Reviews - is rating empty?: ", ratingsresponse);
      } catch (error) {
        setError('Error fetching review data');
        console.error('Error fetching review:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
}

useEffect(()=> {
  fetchRatings();
  }, [restaurantId]);

  // console.log(menuItems);

  // if (menuItems == "[]") {
  //   return (
  //     <View>
  //       <Text style={styles.uploadText}>
  //         Be the first to upload a menu!
  //       </Text>
  //     </View>
  //   ); 
  // } 

  if (loading) {
    return (
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
        <ActivityIndicator size="large" color="#FFC93C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <RatingCard rating_info={ratings} />
            <View style={styles.reviewTitle}>
                <Text style={styles.reviewTextLeft}>Reviews</Text>
                <Text style={styles.reviewTextRight}>Latest</Text>
            </View>
            <View style={styles.commentContainer}>
                <ReviewBlock review_info={reviews} restaurant_info={restaurantId}/>
            </View>
        </ScrollView>
        <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
scrollContent: {
    paddingTop: 12,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
reviewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
reviewTextLeft: {
    fontSize: 16,
    fontWeight: '700'
  },
commentContainer: {
    flex: 1,
    marginTop: 10,
},
leaveButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFB300',
    marginBottom: 40,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
},
buttonText:{
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700'
}
})
export default Reviews;