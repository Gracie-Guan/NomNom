import { View, Text ,StyleSheet, Alert, ScrollView, TouchableOpacity} from 'react-native';
import RatingCard from '../../Components/RatingCard';
import ReviewBlock from '../../Components/ReviewBlockk';

function Reviews() {
  const handlePress = () => {
    Alert.alert('Link to leave review screen');
  };

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
      <TouchableOpacity style={styles.leaveButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Leave a Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  scrollContent: {
    flexGrow:1,
    paddingTop: 12,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
reviewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
  },
reviewTextLeft: {
    fontSize: 16,
    fontFamily:'Ubuntu-Medium',
  },
commentContainer: {
    flex: 1,
    marginTop: 10,
},
leaveButton: {
    position: 'absolute',
    zIndex:1,
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