import { View, Text ,StyleSheet} from 'react-native';
import RatingCard from '../../Components/RatingCard';
import ReviewBlock from '../../Components/ReviewBlockk';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

function Reviews() {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <RatingCard />
            <View style={styles.reviewTitle}>
                <Text style={styles.reviewTextLeft}>Reviews</Text>
                <Text style={styles.reviewTextRight}>Latest</Text>
            </View>
            <View style={styles.commentContainer}>
                <ReviewBlock />
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
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: '#FFB300',
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
},
buttonText:{
    fontSize: 16,
    color: '#FFFFFF',
     fontFamily:'Ubuntu-Bold'
}
})
export default Reviews;