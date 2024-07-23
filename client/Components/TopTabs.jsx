import React, {useContext} from 'react';
import { Tabs } from '@ant-design/react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import InfoCard from './InfoCard';
import PopDishes from './PopDishes';
import PhotoCard from './PhotoCard';
import ReviewCard from './ReviewCard';
// import MenuDetails from '../screens/Restaurant/MenuDetails';
// import MenuDetailsContainer from './MenuDetailsContainer';
import MenuInfo from './MenuInfo';
import Photos from '../screens/Restaurant/Photos';
// import Reviews from '../screens/Reviews';
// import { RestaurantContext } from '../App';
import SearchBar from '../screens/Restaurant/SearchBar';
import ImageUpload from './UploadImage';

const menuItemsData = [
  {
    "_id": {"$oid": "668ee8afc88d544d82f31748"},
    "name": "Nem Rán",
    "description": "Pork & Prawn Spring Rolls",
    "price": {"$numberDouble": 6.9},
  },
  {"_id":{"$oid":"668ee8afc88d544d82f31749"},"menu_id":{"$oid":"668ee8afc88d544d82f31747"},"name":"Gỏi Cuốn Tôm","description":"Prawn Summer Roll","category":"Starters","price":{"$numberDouble":"6.9"},"note":""}
];

// const uniquerestaurantId = "6691307ca764a2b064e517f5"
const uniquerestaurantId = "668ee8afc88d544d82f31746";
// const restaurantId="668ee8afc88d544d82f31746";

const photosData = [
  { id: '1', url: 'https://via.placeholder.com/300x300.png?text=Pic+1' },
  { id: '2', url: 'https://via.placeholder.com/300x300.png?text=Pic+2' },
  { id: '3', url: 'https://via.placeholder.com/300x300.png?text=Pic+3' },
  { id: '4', url: 'https://via.placeholder.com/300x300.png?text=Pic+4' },
  //...
];

// const restaurantData = {
//   "_id": {"$oid":"668ee8afc88d544d82f31746"},
//   "name": "Hanoi Hanoi Restaurant",
//   "address_obj": {
//     "address_string": "101 Capel Street Dublin 1, Dublin D01 H2X5 Ireland"
//   },
//   "latitude": "53.345966",
//   "longitude": "-6.25341",
//   "phone": "+353 1 538 8418",
//   "website": "http://hanoihanoi.restaurant",
//   "rating": "4.0",
//   "review_rating_count": {"1":"6","2":"2","3":"1","4":"1","5":"19"},
//   "price_level": "€€ - €€€",
//   "cuisine": [
//     {"name":"vietnamese","localized_name":"Vietnamese"},
//     {"name":"bar","localized_name":"Bar"},
//     {"name":"seafood","localized_name":"Seafood"},
//     {"name":"barbecue","localized_name":"Barbecue"},
//     {"name":"asian","localized_name":"Asian"},
//     {"name":"pub","localized_name":"Pub"}
//   ]
// };

const TopTabs = () => {

  // const { restaurant } = useContext(RestaurantContext);

  // console.log("restaurant info: ", restaurant);

  // const uniquerestaurantId = restaurant._id;

  const tabs = [    
    { key:'info', title: 'Info' },
    { key:'menu',title: 'Menu' },
    { key:'photos',title: 'Photos' },
    // { key:'reviews', title: 'Reviews' },
    { key:'search', title: 'Search' },
  ];

  const renderTabContent = (tab) => {
    switch(tab.key) {
      case 'info':
        return (
          <ScrollView key={tab.key} style={styles.ScrollView}>
            <InfoCard restaurantId={uniquerestaurantId}/>
            <PopDishes />
            <ImageUpload />
            <PhotoCard />
            <ReviewCard />
          </ScrollView>
        );
      case 'menu':
        // return <MenuDetails key={tab.key} menuItems={menuItemsData}/>;
        // return <MenuDetails key={tab.key} menuItems={menuItemsData} restaurantId="668ee8afc88d544d82f31746"/>;
        return <MenuInfo key={tab.key} restaurantId={uniquerestaurantId} />;

      case 'photos':
        return <Photos key={tab.key} photos={photosData}/>;
      case 'search':
        return <SearchBar key={tab.key} restaurantId={uniquerestaurantId}/>;
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