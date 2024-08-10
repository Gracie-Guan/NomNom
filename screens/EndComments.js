import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { useEffect, useState} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from "@expo-google-fonts/ubuntu";
import { useFonts } from 'expo-font';

const EndComments= () => {
    const [fontsLoaded] = useFonts({
      Ubuntu_400Regular,
      Ubuntu_500Medium,
      Ubuntu_700Bold,
    });
  
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/Heart with roses.jpg')} style={styles.heartImage}/>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Thank you for your valuable and honest review</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    heartImage:{
        width:276,
        height: 276,
        marginTop: 80
    },
    titleText:{
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 16,
        width: 220,
        textAlign: 'center',
        marginTop: 20
    }
})

export default EndComments