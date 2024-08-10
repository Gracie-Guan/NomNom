import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent, ScrollView,KeyboardAvoidingView, Platform} from "react-native"
import { useEffect, useState} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import RatingThree from "../Components/RatingThree";
import TagsCard from "../Components/TagsCard";
import ImagePicker from "../Components/ImagePicker";
import InputComments from "../Components/InputComments";

const CommentsPage = () => {
    const navigation = useNavigation(); 
    const [selectedRating, setSelectedRating] = useState(null);
    const selectRating = (rating) => {
        setSelectedRating(rating);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => selectRating(i)}>
                    {i <= selectedRating ? 
                        <MaterialIcons                                 
                        name="star"
                        size={45}
                        color={"#FFB300" }/>
                    : <MaterialIcons
                        name="star-border" 
                        size={45} 
                        color={"#9E9E9E"}/>
                    }
                </TouchableOpacity>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const handleSubmit = () => {
        navigation.navigate("EndComments");
    };
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.inner} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={50}
            >
            <ScrollView>
            <View style={styles.TopRatingContianer}>
                <Text style={styles.TopRatingText}>Rate your overall experience</Text>
                {renderStars()}
            </View>
            <View style={styles.commentCardContainer}>
                <RatingThree />
                <TagsCard />
                <ImagePicker />
                <InputComments />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner:{
        flex: 1
    },
    TopRatingContianer:{
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopRatingText:{
        fontFamily: 'Ubuntu_Bold',
        fontSize: 16,
        paddingBottom: 5
    },
    starsContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    commentCardContainer:{
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity:'0.5',
        shadowRadius: 3,
    },
    submitButton:{
        marginTop: 15,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#FFB300',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    submitText:{
        fontSize: 14,
        fontFamily: 'Ubuntu_Bold'
    }
})

export default CommentsPage