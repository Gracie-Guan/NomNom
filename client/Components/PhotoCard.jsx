import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const PhotoCard = () => {
  //n sample data
  const Images = [
    { url: 'https://via.placeholder.com/300x300.png?text=Food+1' },
    { url: 'https://via.placeholder.com/300x300.png?text=Food+2' },
    { url: 'https://via.placeholder.com/300x300.png?text=Food+3' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photos</Text>
      <View style={styles.imageContainer}>
        {Images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.url }}
            style={styles.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '32%', 
    aspectRatio: 1, 
    borderRadius: 8,
  },
});

export default PhotoCard;