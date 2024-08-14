import React from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const numColumns = 3; // Number of columns in the grid
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - (numColumns + 1) * 10) / numColumns; // Calculate item width based on screen size

const Photos = ({ photos }) => {
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
  },
});

export default Photos;