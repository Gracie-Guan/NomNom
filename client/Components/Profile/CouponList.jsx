import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';


const CouponList = () => {
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
            <View style={styles.couponContainer}>
                <Text style={styles.couponTitle}>Redeem Your Coupons</Text>
                <View style={styles.coupon}>
                    <View style={styles.eachCoupon}>
                        <View style={styles.left}>
                            <Text style={styles.one}>Puty Kitchen</Text>
                            <Text style={styles.two}>Free meal tasting event</Text>
                            <Text style={styles.three}></Text>
                            <Text style={styles.four}>Entrance ticket of free meal tasting event for one person</Text>
                            <View style={styles.timeContainer}>
                                <Feather name="clock" color={'#9E9E9E'} size={15}/>
                                <Text style={styles.five}>49d 20h 29m</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.six}>points</Text>
                            <Text style={styles.seven}>1000</Text>
                        </View>
                    </View>
                    <View style={styles.eachCoupon}>
                        <View style={styles.left}>
                            <Text style={styles.one}>Bear Market</Text>
                            <Text style={styles.two}>10% off on all coffee</Text>
                            <Text style={styles.three}></Text>
                            <Text style={styles.four}>Order any coffe you like with 10% off, pastry doesn't applied</Text>
                            <View style={styles.timeContainer}>
                                <Feather name="clock" color={'#9E9E9E'} size={15}/>
                                <Text style={styles.five}>10d 20h 29m</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.six}>points</Text>
                            <Text style={styles.seven}>200</Text>
                        </View>
                    </View>
                </View>
            </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    couponTitle: {
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 25
    },
    eachCoupon: {
        flexDirection: 'row',
        flex: 1,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3, 
        marginBottom: 15
    },
    left:{
        flex: 3, 
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 20,
        paddingLeft: 20
    },
    one:{
        fontSize: 20,
        fontFamily: 'Ubuntu_400Regular'
    },
    two: {
        color: '#E65100',
        fontSize: 14,
        fontFamily: 'Ubuntu_400Regular',
        marginTop: 5
    },
    three:{
        height: 1.5,
        width: 230,
        backgroundColor: '#FFCDB2',
        marginTop: 10
    },
    four:{
        fontSize: 12,
        fontFamily: 'Ubuntu_400Regular',
        color: '#9E9E9E',
        marginTop: 10,
        width: 200,
    },
    timeContainer:{
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        justifyContent: 'space-around',
        width: 100,
        borderRadius: 5,
        marginTop: 10
    },
    five:{
        fontSize: 12,
        fontFamily: 'Ubuntu_400Regular',
        color: '#9E9E9E',
    },
    right:{
        flex: 1,
        backgroundColor: '#FFB300',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    six: {
        fontSize: 11,
        fontFamily: 'Ubuntu_700Bold',
        color: 'white'
    },
    seven: {
        fontSize: 24,
        fontFamily: 'Ubuntu_700Bold',
        color: 'white',
    }

})

export default CouponList