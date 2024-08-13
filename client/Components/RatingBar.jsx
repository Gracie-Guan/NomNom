import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RatingBar = ({ rating, category, fillColor }) => {
  const fillWidth = (rating / 5) * 100;

  return (
    <View style={styles.container}>
        <View style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
            <Text style={styles.ratingText}>
                {/* {rating.toFixed(1)} */}{rating}
            </Text>
        </View>
        <View style={styles.barContainer}>
            <View style={[styles.filledBar, { width: `${fillWidth}%`, backgroundColor: fillColor }]} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontFamily:'Ubuntu-Regular'
  },
  rating: {
    fontSize: 14,
    fontFamily:'Ubuntu-Regular'
  },
  barContainer: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  filledBar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  emptyBar: {
    flex: 1,
  },
});

export default RatingBar;