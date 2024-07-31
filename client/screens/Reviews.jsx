import { View, Text ,StyleSheet} from 'react-native'
import RatingCard from '../Components/RatingCard'
import ReviewBlock from '../Components/ReviewBlockk'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Reviews() {
  return (
    <View style={styles.reviewContainer}>
        <RatingCard />
        <View style={styles.reviewTitle}>
                <Text style={styles.reviewTexLeft}>Reviews</Text>
                <Text style={styles.reviewTextRight}>Latest</Text>
        </View>
        <View style={styles.commentContainer}>
            <ReviewBlock />
            <TouchableOpacity style={styles.leaveButton}>
                <Text style={styles.buttonText}>Leave a Review</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  reviewContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
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
  },
commentContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40
},
leaveButton: {
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