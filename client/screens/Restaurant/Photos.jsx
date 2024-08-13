import React, { useContext, useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - (numColumns + 1) * 10) / numColumns;

const Photos = ({ restaurantId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  const restaurant_id = "6691378108abb998e1cc6038" // hard-coded

  const fetchPhotos = async () => {
    setLoading(true);

    setTimeout(async () => {

    try {
      console.log("Photos - restaurantId nimish is a dick: ", restaurant_id);
      
      const first_response = await axios.get(`http://localhost:6868/restaurants/${restaurant_id}`);

      // response.data is an array of menus
      console.log("Photos - first response: ", first_response.data.image);

      // const ratingsresponse = first_response.data;
      const sortedPhotos = first_response.data.image.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      // Access the restaurant_id of the first (and only) menu
      // const menuId = menus[0].menu_id;
      // const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`)

      // console.log(second_response.data);
      setPhotos(sortedPhotos);
      // console.log("Reviews - is rating empty?: ", ratingsresponse);
    } catch (error) {
      setError('Error fetching photos data');
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, 500);
}

useEffect(()=> {
  fetchPhotos();
}, [restaurantId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item.url)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const handlePhotoPress = (url) => {
    setSelectedPhoto(url);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.modalImage}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    padding: 5,
  },
  imageContainer: {
    position: 'relative',
    padding: 5,
  },
  image: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '40%',
    resizeMode: 'cover',
    borderRadius: 16, 
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Photos;
