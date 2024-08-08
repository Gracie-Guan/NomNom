import React from 'react';
import { Tabs } from '@ant-design/react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import InfoCard from './InfoCard';
import PopDishes from './PopDishes';
import PhotoCard from './PhotoCard';
import ReviewCard from './ReviewCard';
import MenuInfo from './MenuInfo';
import Photos from '../screens/Restaurant/Photos';
import Reviews from '../screens/Restaurant/Reviews';

// const menuItemsData = [
//   {
//     "_id": {"$oid": "668ee8afc88d544d82f31748"},
//     "name": "Nem Rán",
//     "description": "Pork & Prawn Spring Rolls",
//     "price": {"$numberDouble": 6.9},
//   },
//   {"_id":{"$oid":"668ee8afc88d544d82f31749"},"menu_id":{"$oid":"668ee8afc88d544d82f31747"},"name":"Gỏi Cuốn Tôm","description":"Prawn Summer Roll","category":"Starters","price":{"$numberDouble":"6.9"},"note":""}
// ];

// const uniquerestaurantId = "6691307ca764a2b064e517f5"

const uniquerestaurantId = "669eddceb619f1ad6b948dba"; // yamamori

// const uniquerestaurantId = "6691378108abb998e1cc6038"; // shaku maku

// const uniquerestaurantId = "6691307ca764a2b064e517f5"; // Doppio

// const restaurantId="668ee8afc88d544d82f31746";

const bucketName = "nom.bucket";
const folderName = "menus";

const fileName = "test.jpg"
const fileKey = `${folderName}/${fileName}`; // This specifies the folder and file name

const imageUri = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;

const photosData = [
  { id: '1', url: 'https://via.placeholder.com/300x300.png?text=Pic+1' },
  { id: '2', url: 'https://via.placeholder.com/300x300.png?text=Pic+2' },
  { id: '3', url: 'https://via.placeholder.com/300x300.png?text=Pic+3' },
  { id: '4', url: 'https://via.placeholder.com/300x300.png?text=Pic+4' },
  //...
];

const TopTabs = () => {

  // const { restaurant } = useContext(RestaurantContext);

  // console.log("restaurant info: ", restaurant);

  // const uniquerestaurantId = restaurant._id;

  const tabs = [    
    { key:'info', title: 'Info' },
    { key:'menu',title: 'Menu' },
    { key:'photos',title: 'Photos' },
    { key:'review', title: 'Reviews' },
  ];

  const renderTabContent = (tab) => {
    switch(tab.key) {
      case 'info':
        return (
          <ScrollView key={tab.key} style={styles.ScrollView}>
            <InfoCard restaurantId={uniquerestaurantId}/>
            <PopDishes />
            <PhotoCard />
            <ReviewCard />
          </ScrollView>
        );
      case 'menu':
        return <MenuInfo key={tab.key} restaurantId={uniquerestaurantId} />;

      case 'photos':
        return <Photos key={tab.key} photos={photosData}/>;
      case 'review':
        return <Reviews key={tab.key} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs tabs={tabs}>
        {tabs.map(renderTabContent)}
      </Tabs>
    </View>
  );
};

const styles= StyleSheet.create({
    container: 
    {
    flexGrow: 1,
    backgroundColor: '#fff',
    },
    ScrollView: {
      flex: 1,
      marginBottom: 15
    },
    sectionContainer: {
      flexGrow: 1,
      marginVertical: 10,
    },
});

export default TopTabs;