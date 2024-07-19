import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InfoCard = ({ restaurant }) => {
  const renderRating = (rating) => {
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

  const totalReviews = Object.values(restaurant.review_rating_count)
    .reduce((sum, count) => sum + parseInt(count), 0);

  const handleNavigation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    Linking.openURL(url);
  };

  const handleContact = () => {
    Linking.openURL(`tel:${restaurant.phone}`);
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://via.placeholder.com/800x400?text=Restaurant+Image' }} />
      <Card.Content>
        <Title style={styles.title}>{restaurant.name}</Title>
        <Paragraph>{restaurant.address_obj.address_string}</Paragraph>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderRating(parseFloat(restaurant.rating))}</View>
        </View>
        <Paragraph>{restaurant.price_level}</Paragraph>
        <View style={styles.cuisineContainer}>
          {restaurant.cuisine.map((cuisine, index) => (
            <Chip key={index} style={styles.chip}>{cuisine.localized_name}</Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="navigation" onPress={handleNavigation} style={{fontFamily: 'Ubuntu-Regular'}}>Navigation</Button>
        <Button icon="phone" onPress={handleContact} style={{fontFamily: 'Ubuntu-Regular'}}>Contact</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    fontFamily: 'Ubuntu-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    fontFamily: 'Ubuntu-Regular',
  },
  chip: {
    margin: 2,
  },

  title: {
    fontFamily: 'Ubuntu-Bold',
  },

  regularText:{
    fontFamily: 'Ubuntu-Regular',
  }
});

export default InfoCard;