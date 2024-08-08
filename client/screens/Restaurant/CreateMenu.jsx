import { View } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Modal } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import ImageUpload from '../../Components/UploadImage';
import axios from 'axios';

const sampleData = {
  restaurants: [
    {
      name: "Test Restaurant",
      cuisine: "Greek",
      tags: [
        "casual",
        "family-friendly"
      ],
      menu: {
        categories: []
      }
    }
  ]
};
export default function CreateMenu({ imagePath, restaurantId }) {
  // Helper function to safely get the price

  const [imageFromServer, setImageFromServer] = useState(null);
  const [menu_info, setRestaurantInfo] = useState(null);

  // useEffect(() => {
  // console.log("imagePath: ", imagePath);

  // const uploadNewMenu = async (menu_info, imageFromServer) => {

  // }

  const addItem = async (data, menuId) => {
    // Insert dishes and update their menu_id references
    console.log("data:", data);
    // console.log("addItem function ---- data: ", JSON.stringify(JSON.parse(data)));

    json_data = JSON.parse(JSON.stringify(JSON.parse(data)));

    // console.log("json_data.restaurants: ", json_data.restaurants[0].menu.categories);

    const dishPromises = json_data.restaurants[0].menu.categories.flatMap(category => {
      return category.dishes.map(dish => ({
        menu_id: menuId,
        name: dish.name,
        description: dish.description,
        category: category.name,
        price: dish.price,
        note: dish.note
      }));
    });

    console.log("dishes", dishPromises)

    try {
      const response = await axios.post('http://localhost:6868/dishes/add-menu', dishPromises
      // { 
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
    );
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const fetchRestaurantInfo = async (restaurantId) => {
    try {
      // const restaurant_info = await axios.get(`http://localhost:6868/restaurants/${restaurantId}`);

      // const restaurantsData = JSON.parse(restaurant_info).restaurants;

      // console.log("restaurantsData: ", restaurant_info.data)

      const menu_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);

      const menus = menu_response.data;

      // Access the restaurant_id of the first (and only) menu
      const menuId = menus[0].menu_id;

      console.log("menuId: ", menuId)
      console.log("Menu ID available!");
      setRestaurantInfo(menuId);
    } catch (error) {
      console.error("Error fetching restaurant data from server:", error);
    }
  }

  // fetchRestaurantInfo(restaurantId);
  // fetchImageFromServer(imagePath);
  // updateExistingItem(restaurantId);
  // addItem(imageFromServer, menu_info);
  // }, [imagePath, restaurantId]);

  const fetchImageFromServer = async (imageUri) => {
    // Extract the filename from the URI
    console.log("image uri", imageUri);

    const filename = imageUri.split('/').pop();

    try {
      console.log("Reaching (skipping) Flask...");
      const response = await axios.get(`http://127.0.0.1:5000/fetch-image`, {
        params: {
          bucket_name: 'nom.bucket',
          image_key: "menus/" + filename
        },
        // responseType: 'blob' // old code - don't use
        // public_uri: imageUri // old code - don't use
      });
      console.log("Flask request done!");

      console.log("Setting image from server...");
      // setImageFromServer(response.data);
      fetchRestaurantInfo(restaurantId);
      console.log("Setting done!");
      // console.log("response: ", response.request._response)
      // const testData = [{ category: "SASHIMI 刺身", description: "(Lean bluefin tuna)", menu_id: "1A", name: "Akami - 4 pieces", note: "", price: 19.95 }, { category: "SASHIMI 刺身", description: "(Bluefin tuna belly)", menu_id: "2B", name: "Otoro - 3 pieces", note: "", price: 14.5 }]
      // const menuId = menuResult.insertedId;
      const oneDish = { category: "SASHIMI 刺身", description: "(Lean bluefin tuna)", menu_id: menu_info, name: "Akami - 4 pieces", note: "", price: 19.95 };
      addItem(response.request._response, menu_info);
      // addItem(oneDish);
      //   const imageBlob = response.data;
      //   console.log("imageBlob: ", imageBlob);
      //   const imageObjectURL = URL.createObjectURL(imageBlob);
      //   setImageFromServer(imageObjectURL);
    } catch (error) {
      console.error("Error fetching image from server:", error);
    }
  };

  // console.log("imagefromserver: ", imageFromServer)

  return (
    <View>
      <Button mode='outlined' onPress={() => { fetchImageFromServer(imagePath) }} style={{ width: '90%' }}>Fetch menu</Button>
      {/* <Button mode='outlined' onPress={() => { }} style={{ width: '90%' }}>Show menu</Button> */}
    </View>
  )
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  }
});

export const title = 'Menu';
export const description = 'Menu Details';