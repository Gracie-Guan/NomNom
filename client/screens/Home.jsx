import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import FilterBar from "../Components/FilterBar";
import CuisineBar from "../Components/CuisineBar";
import VibeCard from "../Components/VibeCard";
import ToggleButton from "../Components/ToggleButton";
import SearchTop from "../Components/SearchTop";
import DishCard from "../Components/DishCards";
import RestaurantCard from "../Components/RestroCards";
import { SearchContext } from "../Context/SearchContext";
import { RestaurantContext } from "../Context/RestaurantContext";
import { SingleRestaurantContext } from "../Context/SingleRestaurantContext";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
    // const [search, setSearch] = useState('');
    const { restaurant, dishData, topDishes, menuRestroMap } = useContext(RestaurantContext);

    console.log("Home - topDishes: ", topDishes[0])
    console.log("Home - dishData: ", dishData[0])
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const [showRestaurant, setShowRestaurant] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleToggle = (isRestro) => {
        setShowRestaurant(isRestro);
        console.log(isRestro ? 'Showing Restaurants' : 'Showing Dishes');
        // console.log("Home - handleToggle - showRestaurant: ", showRestaurant);
    };

    // console.log("Home - topDishes - Home:", topDishes);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topSection}>
                    <View style={styles.topRow}>
                        <View style={styles.location}>
                            <View style={styles.pinIcon}>
                                <Feather name="map-pin" size={20} color="#E65100" />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 5 }}>City Center</Text>
                                <Feather name="chevron-down" size={20} color="#6E6E6E" />
                            </View>
                            <Text style={{ marginLeft: 25 }}>Dublin</Text>
                        </View>
                        <ToggleButton style="icon-based" onToggle={handleToggle} />
                    </View>
                    <View style={styles.searchContainer}>
                        <SearchTop search={searchQuery} onChangeText={setSearchQuery} fullData={showRestaurant ? restaurant : dishData} type={showRestaurant ? 'restro' : 'dish'} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FilterBar />
                    </ScrollView>
                </View>

                <View style={styles.middleSectionOne}>
                    <View style={styles.RatedTitle}>
                        <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Medium', paddingHorizontal: 16 }}>
                            {showRestaurant ? 'TOP RATED RESTAURANTS' : 'TOP RATED DISHES'}
                        </Text>
                    </View>
                    <View style={styles.RatedCard}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {showRestaurant ?
                                restaurant.map((restaurant) => (
                                    <View key={restaurant._id}>
                                        <RestaurantCard key={restaurant._id} layout="default" restaurant={restaurant} />
                                    </View>
                                ))
                                :
                                topDishes.map((dish) => (
                                    <View key={dish._id}>
                                        <DishCard
                                            key={dish._id}
                                            layout="default"
                                            dish={dish}
                                            restaurant={dish.restaurant}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.middleSectionTwo}>
                    <View style={styles.cuisineTitle}>
                        <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Medium', paddingHorizontal: 16 }}>
                            DISCOVER BY CUISINE
                        </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <CuisineBar navigation={navigation} />
                    </ScrollView>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.vibeTitle}>
                        <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Medium', paddingHorizontal: 16 }}>
                            NAME, WHAT'S ON YOUR MIND?
                        </Text>
                    </View>
                    <VibeCard navigation={navigation} />
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
        paddingHorizontal: 16
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pinIcon: {
        flexDirection: 'row',
    },

    middleSectionOne: {
        marginBottom: 10,
    },

    scrollViewContent: {
        flexDirection: 'row',
        gap: 10,

    },

    searchContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    RatedTitle: {
        paddingVertical: 15
    },
    RatedCard: {
        paddingLeft: 16,
        marginTop: 0,
        marginBottom: 0,
    },
    cuisineTitle: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 15
    },
    vibeTitle: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15
    },
});

export default Home;