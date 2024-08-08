import {  ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { List, Text} from 'react-native-paper';
import React, { useState } from 'react';
import DishItem from '../../Components/DishItems';

export default function MenuDetails({ menuItems }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const getPrice = (priceObj) => {
    if (Object.prototype.toString.call(priceObj) === "[object Number]") {  
      return parseFloat(priceObj).toFixed(2); 
    } 
      if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
        return parseFloat(priceObj.$numberDouble).toFixed(2);
    }
    return '-.--';
  };

  const categoryMap = {};
  menuItems.forEach(dish => {
    if (!categoryMap[dish.category]) {
      categoryMap[dish.category] = [];
    }
    categoryMap[dish.category].push(dish);
  });

  const categories = Object.keys(categoryMap);
  const filteredMenuItems = selectedCategory ? categoryMap[selectedCategory] : menuItems;

  return (
    <View style={styles.container}>
        <View style={styles.categoryTagsContainer}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
        >
            <TouchableOpacity onPress={() => setSelectedCategory(null)} style={[styles.categoryTag, selectedCategory === null && styles.selectedCategoryTag]}>
                <Text style={[styles.categoryTagText, selectedCategory === null && styles.selectedCategoryTagText]}>All</Text>
            </TouchableOpacity>
            {categories.map((category) => (
                <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={[styles.categoryTag, selectedCategory === category && styles.selectedCategoryTag]}>
                    <Text style={[styles.categoryTagText, selectedCategory === category && styles.selectedCategoryTagText]}>{category}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>

        <ScrollView
            style={styles.menuContainer}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {selectedCategory === null ? categories.map((category) => (
                <View key={category}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {categoryMap[category].map((item) => (
                        <DishItem
                            key={item._id}
                            name={item.name}
                            price={getPrice(item.price)}
                            description={item.description}
                            rate={item.rate}
                        />
                    ))}
                </View>
            ))
            : filteredMenuItems.map((item) => (
                <DishItem
                    key={item._id}
                    name={item.name}
                    price={getPrice(item.price)}
                    description={item.description}
                    rate={item.rate}
                />
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  categoryTagsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  categoryTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
  },
  selectedCategoryTag: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 1,
        height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  categoryTagText: {
    color: '#707070',
    fontSize: 12,
    fontWeight:'700'
  },
  selectedCategoryTagText: {
    color: '#000000',
  },
  menuContainer: {
    flex: 1,
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 15,
    color: '#000'
  },
});

export const title = 'Menu';
export const description = 'Menu Details';