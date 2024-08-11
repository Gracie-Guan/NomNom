import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView} from "react-native"
import { useEffect, useState} from "react";

import ProfileCard from "../Components/ProfileCard";
import Achievements from "../Components/Achievements";
import UserReview from "../Components/UserReviews";
import ReviewBlock from "../Components/ReviewBlockk";




const tabs = [
    {key: 'achievements', title: 'Achievements'},
    {key:'reviews', title: 'Reviews'}
]

const ProfileScreen = () => {

    const [activeTab, setActiveTab] = useState(tabs[0].key); 

    const renderTabContent = (tabKey) => {
        switch (tabKey) {
            case 'achievements':
                return <Achievements />;
            case 'reviews':
                return <ReviewBlock filterName={'Cara'}/>;
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
        fontFamily:'Ubuntu-Medium',
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#FFB300',
    },
    tabText: {
        fontSize: 16,
        fontFamily:'Ubuntu-Medium',
        color: '#9E9E9E',
    },
    activeTabText: {
        fontSize: 16,
         fontFamily:'Ubuntu-Medium',
        color: 'black'
    },
    contentContainer: {
        padding: 20,
    },
})

export default ProfileScreen;