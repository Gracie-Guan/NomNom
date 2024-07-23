import { View } from '@ant-design/react-native';
import React from 'react';
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
export default function CreateMenu({ imagePath }) {
  // Helper function to safely get the price

  console.log("imagePath: ", imagePath);

  const fetchImageFromServer = async (imageUri) => {
    // Extract the filename from the URI
    // const [imageFromServer, setImageFromServer] = useState(null);

    const filename = imageUri.split('/').pop();

    console.log("image uri", imageUri);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/fetch-image`, {
        params: {
          bucket_name: 'nom.bucket',
          image_key: "menus/" + filename
        },
        // responseType: 'blob'
        // public_uri: imageUri
      }); 
      console.log("response: ", response.data)
    //   const imageBlob = response.data;
    //   console.log("imageBlob: ", imageBlob);
    //   const imageObjectURL = URL.createObjectURL(imageBlob);
    //   setImageFromServer(imageObjectURL);
    } catch (error) {
      console.error("Error fetching image from server:", error);
    }
  };

//   const result = fetchImageFromServer();

//   console.log("what: ", result)


//   const getPrice = (priceObj) => {
//     // console.log(priceObj)
//     if (Object.prototype.toString.call(priceObj) === "[object Number]") {
//       // console.log(priceObj);  
//       return parseFloat(priceObj).toFixed(2);
//     }

//     // if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
//     if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
//       return parseFloat(priceObj.$numberDouble).toFixed(2);
//     }
//     return '-.--'; // Default value if price is not in expected format
//   };

//   const categoryMap = {};
//   menuItems.forEach(dish => {
//     // console.log(dish);
//     if (!categoryMap[dish.category]) {
//       categoryMap[dish.category] = [];
//     }
//     categoryMap[dish.category].push(dish);
//   });

  // console.log(categoryMap);

//   return (
//     <ScrollView
//       style={styles.container}
//       automaticallyAdjustContentInsets={false}
//       showsHorizontalScrollIndicator={false}
//       showsVerticalScrollIndicator={false}>
//       {menuItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>Be the first to upload a menu image!</Text>
//           <ImageUpload />
//         </View>
//       ) : (
//         Object.keys(categoryMap).map((category) => (
//           <View key={category}>
//             <Text style={styles.categoryTitle}>{category}</Text>
//             {categoryMap[category].map((item) => (
//               <List.Item
//                 key={item._id}
//                 title={item.name}
//                 description={item.description}
//                 right={() => <Text style={styles.price}>€{getPrice(item.price)}</Text>}
//               />
//             ))}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
    return (
        <Text>
            This is a test.
        </Text>
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