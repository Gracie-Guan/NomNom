// Highlight start
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ReviewBlock from '../ReviewBlockk';

const ReviewsList = () => {

  const reviews = [
    {
      id: 1,
      restaurant: 'Shaku Maku',
      rating: '4',
      days: '7',
      category: 'Dessert',
      content: 'In love with the dessert for the first bite! This is the 2nd or the 3rd times I had middle eastern food, but I like it.',
      images: [
        'https://plus.unsplash.com/premium_photo-1673809798703-6082a015f931?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      likes: '7'
    },
    // Add more reviews here
  ];

  return (
    <ReviewBlock  />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daysAgo: {
    marginLeft: 10,
    color: '#888',
    fontSize: 12,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  category: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  reviewContent: {
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  likes: {
    color: '#888',
  },
});

export default ReviewsList;
// Highlight end