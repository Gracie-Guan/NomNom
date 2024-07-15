import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReviewCard = () => {
  const rating = 4.8;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={20}
          color={i <= Math.floor(rating) ? '#FFD700' : '#C0C0C0'}
        />
      );
    }
    return stars;
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Reviews</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>{rating}</Text>
          <View style={styles.starsContainer}>{renderStars(rating)}</View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.userInfo}>
            <Avatar.Image size={40} source={{ uri: 'https://via.placeholder.com/40' }} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Cara Nara</Text>
              <Text style={styles.reviewDate}>7 days ago</Text>
            </View>
          </View>
          <View style={styles.tags}>
            <Chip style={styles.tag}>Vegan</Chip>
            <Chip style={styles.tag}>Live Music</Chip>
            <Chip style={styles.tag}>Ambience</Chip>
          </View>
          <Text style={styles.reviewText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#888',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    marginRight: 5,
    marginBottom: 5,
  },
  reviewText: {
    marginBottom: 10,
  },
});

export default ReviewCard;