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
import RestaurantOverview from '../screens/RestaurantOverview';

// const menuItemsData = [
//   {
//     "_id": {"$oid": "668ee8afc88d544d82f31748"},
//     "name": "Nem Rán",
//     "description": "Pork & Prawn Spring Rolls",
//     "price": {"$numberDouble": 6.9},
//   },
//   {"_id":{"$oid":"668ee8afc88d544d82f31749"},"menu_id":{"$oid":"668ee8afc88d544d82f31747"},"name":"Gỏi Cuốn Tôm","description":"Prawn Summer Roll","category":"Starters","price":{"$numberDouble":"6.9"},"note":""}
// ];

const uniquerestaurantId = "668ee8afc88d544d82f31746";

const photosData = [
  { id: '1', url: 'https://feelgoodfoodie.net/wp-content/uploads/2023/04/Pasta-Bolognese-TIMG.jpg' },
  { id: '2', url: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/01/Fried-bread-408ec8e.jpg?quality=90&resize=556,505' },
  { id: '3', url: 'https://food-images.files.bbci.co.uk/food/recipes/chicken_and_seafood_62744_16x9.jpg' },
  { id: '4', url: 'https://www.allrecipes.com/thmb/ympIQl1YNYWFMvwKLMLx8EnG-to=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-DDMFS-4x3-b79a6ea27e0344399257ca1df67ca1cd.jpg' },
  { id: '5', url: 'https://www.noracooks.com/wp-content/uploads/2023/03/ChickpeaCurry-2189-2.jpg' },
  { id: '6', url: 'https://static.toiimg.com/photo/88489342.cms' },
  { id: '7', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-3wl39eAmxReyrbQrXo4pRW9YgFDOFNGCg&s'},
  { id: '8', url: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/05/Korean-Food-Cover.jpg' },
  { id: '9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVp2r878UcchwHQAWMliwWB9u0ugrX7jjkQ&s' },
  { id: '10', url: 'https://media.cnn.com/api/v1/images/stellar/prod/181115105819-korean-food149201306006k-gimbap.jpg?q=w_1600,h_900,x_0,y_0,c_fill' },
  { id: '11', url: 'https://media.timeout.com/images/106018241/750/562/image.jpg' },
  { id: '12', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwyQDzcROno1-o6dfOWGC05CAMAXE2UlnFw&s' },
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
        return <RestaurantOverview  key={tab.key} restaurantId={uniquerestaurantId}/>;
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
      <Tabs tabs={tabs} tabBarTextStyle={styles.tabBarTextStyle}         tabBarActiveTextColor="#000000"
      tabBarInactiveTextColor="#9E9E9E">
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
    tabBarTextStyle: {
      fontSize: 14,
      fontWeight: '500'
    }
});

export default TopTabs;