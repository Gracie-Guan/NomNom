import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

export default function MenuDetails({ menuItems }) {
  // Helper function to safely get the price
  const getPrice = (priceObj) => {
    if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
      return parseFloat(priceObj.$numberDouble).toFixed(2);
    }
    return '0.00'; // Default value if price is not in expected format
  };

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {menuItems.map((item) => (
        <List.Item
          key={item._id.$oid}
          title={item.name}
          description={item.description}
          style={{fontFamily: 'Ubuntu-Regular'}}
          right={() => <Text style={styles.price}>€{getPrice(item.price)}</Text>}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    alignSelf: 'center',
  },
});

export const title = 'Menu';
export const description = 'Menu Details';