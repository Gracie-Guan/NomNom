import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import {Feather, MaterialIcons} from '@expo/vector-icons'
import RatingCard from '../Components/RatingCard'

function Reviews() {
  return (
    <View style={styles.reviewContainer}>
        <RatingCard />
        <View style={styles.commentContainer}>
            <View style={styles.reviewTitle}>
                <Text style={styles.reviewTexLeft}>Reviews</Text>
                <Text style={styles.reviewTextRight}>Latest</Text>
            </View>
            <View style={styles.comments}>
                
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  reviewContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA'
  },
  reviewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  reviewTexLeft: {
    fontSize: 16,
    fontWeight: '700'
  }

})
export default Reviews;