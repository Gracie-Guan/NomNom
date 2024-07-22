import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Home Page
            </Text>
            <TouchableOpacity style={styles.navigation} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.navText}>
                    Login page
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigation} onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.navText}>
                    Signup page
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 500,
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        fontSize: 30,
        fontWeight:'bold'
    },
    navigation:{
        padding: 10,
        backgroundColor:'grey',
        marginTop: 20
    },
    navText:{
        color: 'white',
        fontWeight:'bold'
    }
})
export default HomeScreen;