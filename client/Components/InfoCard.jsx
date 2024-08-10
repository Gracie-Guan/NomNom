import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Linking, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InfoCard = ({ restaurantId }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch restaurant info
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:6868/restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

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

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  if (loading) {
    // console.log("--- loading data... #2");
    return (
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
        <ActivityIndicator size="large" color="#FFC93C" />
      </View>
    );
  }  

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text>No data available</Text>
      </View>
    );
  }


  const totalReviews = Object.values(restaurant.review_rating_count)
    .reduce((sum, count) => sum + parseInt(count), 0);

  const handleNavigation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    Linking.openURL(url);
  };

  const handleContact = () => {
    Linking.openURL(`tel:${restaurant.phone}`);
  };

  // console.log("image: ", restaurant.image);

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: restaurant.image[0] }} />
      <Card.Content>
        <Title>{restaurant.name}</Title>
        <Paragraph>{restaurant.address_obj.address_string}</Paragraph>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderRating(parseFloat(restaurant.rating))}</View>
          <Text>{`(${totalReviews} reviews)`}</Text>
        </View>
        <Paragraph>{restaurant.price_level}</Paragraph>
        <View style={styles.cuisineContainer}>
          {restaurant.cuisine.map((cuisine, index) => (
            <Chip key={index} style={styles.chip}>{cuisine.localized_name}</Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="navigation" onPress={handleNavigation}>Navigation</Button>
        <Button icon="phone" onPress={handleContact}>Contact</Button>
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
  stars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    margin: 2,
  },
  website: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default InfoCard;