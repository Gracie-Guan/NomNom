import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { useEffect, useState} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PointsCard from "./PointsCard";
import Badges from "./Badges";
import BadgesTwo from "./BadgesTwo";
import Coupon from "./Coupon";

const Achievements = () => {
    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_400Regular,
        Ubuntu_500Medium,
        Ubuntu_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const userName = '';

    return (
        <View style={styles.container}>
            <PointsCard />
            {userName === 'Moru' ? <BadgesTwo /> : <Badges />}
            {userName !== 'Moru' && <Coupon />}
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

})

export default Achievements