import { useState } from 'react';
import { Button, Image, View, StyleSheet, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AWS from "aws-sdk";
import CreateMenu from '../screens/Restaurant/CreateMenu';

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

  const bucketName = "nom.bucket";
  const folderName = "menus";

  const fileName = "test.jpg"
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

  return (
    <View style={styles.container}>
      <Button mode='outlined' onPress={pickImage} style={{width: '90%'}}>Upload Menu</Button>
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
      <CreateMenu imagePath={imagePath}/>
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
