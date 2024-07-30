import React, {useContext} from 'react';
import { Tabs } from '@ant-design/react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import InfoCard from './InfoCard';
import PopDishes from './PopDishes';
import PhotoCard from './PhotoCard';
import ReviewCard from './ReviewCard';
import MenuDetails from '../screens/MenuDetails';
import MenuDetailsContainer from './MenuDetailsContainer';
import MenuInfo from './MenuInfo';
import Photos from '../screens/Photos';
import SearchBar from '../screens/SearchBar';
import Reviews from '../screens/Reviews';

const menuItemsData = [
  {
    "_id": {"$oid": "668ee8afc88d544d82f31748"},
    "name": "Nem Rán",
    "description": "Pork & Prawn Spring Rolls",
    "price": {"$numberDouble": 6.9},
  },
  {"_id":{"$oid":"668ee8afc88d544d82f31749"},"menu_id":{"$oid":"668ee8afc88d544d82f31747"},"name":"Gỏi Cuốn Tôm","description":"Prawn Summer Roll","category":"Starters","price":{"$numberDouble":"6.9"},"note":""}
];

const uniquerestaurantId = "668ee8afc88d544d82f31746";

const photosData = [
  { id: '1', url: 'https://via.placeholder.com/300x300.png?text=Pic+1' },
  { id: '2', url: 'https://via.placeholder.com/300x300.png?text=Pic+2' },
  { id: '3', url: 'https://via.placeholder.com/300x300.png?text=Pic+3' },
  { id: '4', url: 'https://via.placeholder.com/300x300.png?text=Pic+4' },
  //...
];


const TopTabs = () => {
  const tabs = [    
    { key:'overview', title: 'Overview' },
    { key:'menu',title: 'Menu' },
    { key:'photos',title: 'Photo' },
    { key:'review', title: 'Review' },
  ];

  const renderTabContent = (tab) => {
    switch(tab.key) {
      case 'overview':
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
        return <Reviews key={tab.key} restaurantId={uniquerestaurantId}/>;
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
    },
    sectionContainer: {
      flexGrow: 1,
      marginVertical: 10,
    },
});

export default TopTabs;