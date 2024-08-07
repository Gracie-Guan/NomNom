import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import {SearchBar} from 'react-native-elements'
import FilterBar from "../Components/FilterBar";
import RestaurantCard from "../Components/RestaurantCard";
import CuisineBar from "../Components/CuisineBar";
import VibeCard from "../Components/VibeCard";
import Dishsection from '../Components/DishSection'
import ToggleButton from "../Components/ToggleButton";
import SearchTop from "../Components/SearchTop";

const Stack = createStackNavigator();

const Home = () => {
    const [search, setSearch] = useState('');
    const onChangeText = (searchText) => {
      setSearch(searchText);
    };

    const [showRestaurant, setShowRestaurant] = useState(true);

    const handleToggle = (isRestro) => {
        setShowRestaurant(isRestro);
        console.log(isRestro ? 'Showing Restaurants' : 'Showing Dishes');
      };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.topSection}>
                <View style={styles.topRow}>
                    <View style={styles.location}>
                        <View style={styles.pinIcon}>
                            <Feather name="map-pin" size={20} color="#E65100"/>
                            <Text style={{fontWeight:'bold', fontSize: 15, marginLeft:5}}>City Center</Text>
                            <Feather name="chevron-down" size={20} color="#6E6E6E"/>
                        </View>
                        <Text style={{marginLeft: 25}}>Dublin</Text>
                    </View>
                    <ToggleButton style="icon-based" onToggle={handleToggle} />
                </View>
                <View style={styles.searchContainer}>
                    <SearchTop search={search} onChangeText={onChangeText}/>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>         
                    <FilterBar />
                </ScrollView>
            </View>
            <View style={styles.middleSectionOne}>
                <View style={styles.RatedTitle}>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 15 }}>
                        {showRestaurant ? 'TOP RATED RESTAURANTS' : 'TOP RATED DISHES'}
                    </Text>
                </View>
                <View style={styles.RatedCard}>
                    {showRestaurant? <RestaurantCard /> : <Dishsection></Dishsection>}
                </View>
            </View>
            <View style={styles.middleSectionTwo}>
                <View style={styles.cuisineTitle}>
                        <Text style={{fontSize: 16, fontWeight:'500', paddingHorizontal: 15}}>
                            DISCOVER BY CUISINE
                        </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <CuisineBar />
                </ScrollView>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.vibeTitle}>
                    <Text style={{fontSize: 16, fontWeight:'500', paddingHorizontal: 15}}>
                        NAME, WHAT'S ON YOUR MIND?
                    </Text>
                </View>
                <VibeCard />
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    scrollContainer: {
        flexGrow: 1,
    },
    topSection: {
        paddingTop: 20,
        paddingHorizontal: 15
    },
    topRow:{
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    pinIcon:{
        flexDirection:'row'
    },
    avatar:{
        width: 40,
        height: 40,
        borderRadius: 20
    },
    searchContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    RatedTitle:{
        flexDirection: 'row',
        paddingVertical: 15
    },
    RatedCard: {
        paddingLeft: 15
    },
    cuisineTitle:{
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 15
    },
    vibeTitle:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15
    },
  });

export default Home;