import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    marginHorizontal: 20
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  barContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  filledBar: {
    height: '100%',
    borderRadius: 5,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryText:{
    fontWeight: '500'
  }
});

export default RatingBar;
