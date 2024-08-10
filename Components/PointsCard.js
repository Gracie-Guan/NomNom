import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { useEffect, useState} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PointsCard = () => {
    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_400Regular,
        Ubuntu_500Medium,
        Ubuntu_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
            <View style={styles.collectedContainer}>
                <View style={styles.collection}>
                    <FontAwesome6 name='droplet' color="#FFB300" size={18}/>
                    <Text style={styles.pointText}>Points</Text>
                    <Text style={styles.numberText}>900</Text>
                </View>
                <View style={styles.collection}>
                    <FontAwesome name="thumbs-up" size={20} color="#FFB300" />
                    <Text style={styles.pointText}>Points</Text>
                    <Text style={styles.numberText}>68</Text>
                </View>
                <View style={styles.collection}>
                    <MaterialIcons name='message' color="#FFB300" size={18}/>
                    <Text style={styles.pointText}>Points</Text>
                    <Text style={styles.numberText}>22</Text>
                </View>
                <View style={styles.collection}>
                    <MaterialIcons name='star' color="#FFB300" size={20}/>
                    <Text style={styles.pointText}>Points</Text>
                    <Text style={styles.numberText}>47</Text>
                </View>
            </View>       
    )
}

const styles = StyleSheet.create({
    collectedContainer:{
        flexDirection: 'row'
    },
    collection:{
        width: 78,
        height: 95,
        borderRadius: 10,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'rgb(200,200,200)',
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3
    },
    pointText:{
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 12,
        marginTop: 3
    },
    numberText: {
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 20,
        marginTop: 10
    }
})

export default PointsCard