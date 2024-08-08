import { useState } from 'react';
import {  Image, StyleSheet, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import { View } from '@ant-design/react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import AWS from "aws-sdk";
// import CreateMenu from '../screens/Restaurant/CreateMenu';

AWS.config.update({
  accessKeyId: "AKIA6ODU2WFB5LY5KCVI",
  secretAccessKey: "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",
  region: "eu-west-1",
});

const s3 = new AWS.S3();

const uploadFiletoS3 = (bucketName, fileKey, filePath) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: filePath
  };

  return s3.upload(params).promise();

}

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menu_info, setRestaurantInfo] = useState(null);

  const bucketName = "nom.bucket";
  const folderName = "menus";

  const fileName = "test_01.jpg"
  const fileKey = `${folderName}/${fileName}`; // This specifies the folder and file name

  const imagePath = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // selectionLimit: 5
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const filePath = result.assets[0].uri.replace("file://", "");

     // what is this snippet doing?

      try {
        const fileData = await fetch(filePath).then(response => 
          response.blob(),
        );
        await uploadFiletoS3(bucketName, fileKey, fileData);
        console.log("File upload:", fileKey);
        setModalVisible(true);
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        Alert.alert('Error', "File upload failed");
      }
    }
    // setModalVisible(true); // correct located?
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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

  return (
    <View style={styles.container}>
      <Button mode='outlined' onPress={pickImage} style={{width: '90%'}}>Upload Menu</Button>
      <Button mode='outlined' onPress={() => { fetchImageFromServer(imagePath) }} style={{ width: '90%' }}>Fetch menu</Button>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Thank you for your submission!</Text>
            <Text style={styles.modalMessage}>
              Your menu will be reviewed. This process will take up to 24 hours.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    fontFamily: 'Ubuntu-Medium',
  },
  image: {
    width: 200,
    height: 200,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#aaa',
  },
  modalTitle: {
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
