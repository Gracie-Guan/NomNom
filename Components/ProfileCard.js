import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useFonts, Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

const ProfileCard = () => {
    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_400Regular,
        Ubuntu_500Medium,
        Ubuntu_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const tagsData = [
    'Brunch', 'Cheese', 'Date'
    ]   

    return(
    <View style={styles.profileTopContainer}>
        <View style={styles.userName}>
            <Text style={styles.userNameText}>Cara</Text>
            <TouchableOpacity style={styles.settingIcon}>
                <Feather name="settings" size={15} color={'white'}/>
            </TouchableOpacity>
        </View>
        <View style={styles.profileBottomContainer}>
            <View>
                <Image source={{uri:'https://play-lh.googleusercontent.com/7oW_TFaC5yllHJK8nhxHLQRCvGDE8jYIAc2SWljYpR6hQlFTkbA6lNvER1ZK-doQnQ=w240-h480-rw'}} 
                style={styles.profileImage}/>
                <Image
                source={{ uri: 'https://cdn.countryflags.com/thumbs/ireland/flag-round-250.png' }}
                style={styles.flagImage}
            />
            </View>
            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>
                    Food Critic Level 25
                </Text>
                <Feather name="chevron-right" size={15} color={'#FFB300'}/>
            </View>
            <View style={styles.tags}>
            {tagsData.map((tag, index)=>(
                <View key={index} style={styles.tagsContainer}>
                    <Text style={styles.tagText}>
                        {tag}
                    </Text>
                </View>
            ))}
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>Shrimp Dumpling Eater</Text>
                <Feather name="edit-3" size={15} color={'#9E9E9E'}/>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    profileTopContainer:{
        height: 300,
        backgroundColor: 'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: 'rgb(200, 200, 200)',
        shadowOffset : {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    userName: {
        paddingHorizontal: 20,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userNameText: {
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 24,
        paddingRight: 125
    },
    settingIcon:{
        justifyContent: 'center',
        alignItems:'center',
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: '#221C19',
        marginTop: 2
    },
    profileBottomContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginTop: 5,
    },
    flagImage: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        bottom: 0,
        right: -5,
        borderColor: 'white',
        borderWidth: 2,
    },
    levelContainer: {
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'rgb(200,200,200)',
        shadowOffset:{
            width: 1,
            height: 3
        },
        shadowOpacity: 0.4,
        shadowRadius: 3
    },
    levelText: {
        fontFamily: 'Ubuntu_400Regular',
    },
    tags: {
        flexDirection: 'row'
    },
    tagsContainer: {
        marginTop: 20,
        width: 75,
        paddingVertical: 1,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10
    },
    tagText:{
        fontFamily: 'Ubuntu_500Medium',
        textAlign: 'center'
    },
    bioContainer:{
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 30
    },
    bioText: {
        fontFamily: 'Ubuntu_400Regular',
        marginRight: 15,
        color: '#9E9E9E'
    }
})

export default ProfileCard