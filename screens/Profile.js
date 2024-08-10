import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView} from "react-native"
import { useEffect, useState} from "react";
import { Feather } from "@expo/vector-icons"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import * as SplashScreen from 'expo-splash-screen';
import ProfileCard from "../Components/ProfileCard";
import Achievements from "../Components/Achievements";
import Reviews from "../Components/Reviews"

const tabs = [
    {key: 'achievements', title: 'Achievements'},
    {key:'reviews', title: 'Reviews'}
]

const Profile = () => {

    const [activeTab, setActiveTab] = useState(tabs[0].key); 

    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_400Regular,
        Ubuntu_500Medium,
        Ubuntu_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    }

    const renderTabContent = (tabKey) => {
        switch (tabKey) {
            case 'achievements':
                return <Achievements />;
            case 'reviews':
                return <Reviews />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileCard />
            <View style={styles.tabsContainer}>
                {tabs.map((tab)=>(
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.contentContainer}>
                {renderTabContent(activeTab)}
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    tab: {
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#FFB300',
    },
    tabText: {
        fontSize: 16,
        fontFamily: 'Ubuntu_500Medium',
        color: '#9E9E9E',
    },
    activeTabText: {
        fontSize: 16,
        fontFamily: 'Ubuntu_500Medium',
        color: 'black'
    },
    contentContainer: {
        padding: 20,
    },
})

export default Profile;