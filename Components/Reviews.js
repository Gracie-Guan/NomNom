import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import ReviewBlock from "./ReviewBlockk";

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

    return (
        <View>
            <ReviewBlock filterName={'Cara'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default Achievements