import { View } from '@ant-design/react-native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Text} from 'react-native-paper';

export default function MenuDetails({ menuItems }) {
  // Helper function to safely get the price
  const getPrice = (priceObj) => {
    // console.log(priceObj)
    if (Object.prototype.toString.call(priceObj) === "[object Number]") {
      // console.log(priceObj);  
      return parseFloat(priceObj).toFixed(2); 
    } 

    // if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
      if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
        return parseFloat(priceObj.$numberDouble).toFixed(2);
    }
    return '-.--'; // Default value if price is not in expected format
  };

  const categoryMap = {};
  menuItems.forEach(dish => {
    // console.log(dish);
    if (!categoryMap[dish.category]) {
      categoryMap[dish.category] = [];
    }
    categoryMap[dish.category].push(dish);
  });

  // console.log(categoryMap);

  return (
    // <ScrollView
    //   style={styles.container}
    //   automaticallyAdjustContentInsets={false}
    //   showsHorizontalScrollIndicator={false}
    //   showsVerticalScrollIndicator={false}
    // >
    //   {menuItems.map((item) => (
    //     <List.Item
    //       key={item._id}
    //       title={item.name}
    //       description={item.description}
    //       right={() => <Text style={styles.price}>€{getPrice(item.price)}</Text>}
    //     />
    //   ))}
    // </ScrollView>
    <ScrollView
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {Object.keys(categoryMap).map((category) => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {categoryMap[category].map((item) => (
            <List.Item
              key={item._id}
              title={item.name}
              description={item.description}
              right={() => <Text style={styles.price}>€{getPrice(item.price)}</Text>}
            /> 
          ))}
        </View>
      ))}
      
           </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    marginBottom: 30
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15
  },
});

export const title = 'Menu';
export const description = 'Menu Details';