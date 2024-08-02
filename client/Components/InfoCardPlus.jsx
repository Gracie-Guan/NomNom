import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InfoCardPlus = ({ restaurant }) => {
  // Assuming restaurant prop is passed with the data from MongoDB

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={16}
          color={i <= Math.floor(rating) ? '#FFD700' : '#C0C0C0'}
        />
      );
    }
    return stars;
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://via.placeholder.com/800.png?text=RestaurantPic' }} />
      <Card.Content>
        <Text variant="titleLarge">{restaurant.name}</Text>
        <Text variant="bodyMedium">{restaurant.address_obj.address_string}</Text>
        <View style={styles.ratingContainer}>
          <Text variant="bodyMedium">{restaurant.rating}</Text>
          <View style={styles.starsContainer}>{renderRating(parseFloat(restaurant.rating))}</View>
          <Text variant="bodySmall">({Object.values(restaurant.review_rating_count).reduce((a, b) => parseInt(a) + parseInt(b), 0)} reviews)</Text>
        </View>
        <Text variant="bodyMedium">{restaurant.price_level}</Text>
        <View style={styles.cuisineContainer}>
          {restaurant.cuisine.map((cuisine, index) => (
            <Chip key={index} style={styles.cuisineChip}>{cuisine.localized_name}</Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="navigation" mode="contained" onPress={() => {}}>Navigation</Button>
        <Button icon="phone" mode="contained" onPress={() => {}}>Contact</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  cuisineChip: {
    marginRight: 5,
    marginBottom: 5,
  },
});

export default InfoCardPlus;