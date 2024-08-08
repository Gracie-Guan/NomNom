import React from 'react';
import { View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons'
import ReviewBlock from './ReviewBlockk'

const tags = ['Fresh', 'BBQ', 'Date', 'Family', 'Spicy', 'Vibe']

const ReviewCard = () => {
  return (
    <View style={styles.reviewSection}>
        <View style={styles.reviewTop}>
            <View style={styles.reviewTopLeft}>
                <Feather name='message-circle' color={'#E65100'} size={25}/>
                <Text style={styles.leftText}>Reivews</Text>
            </View>
            <View style={styles.reviewTopRight}>
                <Text style={styles.rightText}>View All</Text>
                <Feather name='arrow-right' color={'#9E9E9E'} size={18}/>
            </View>
        </View>
        <View style={styles.reviewTag}>
            {tags.map((item,index)=> (
                <View  key={index} style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item}</Text>
                </View>
            ))}
        </View>
        <View Style={styles.reviewsContainer}>
            <ReviewBlock filterId='1'/>
        </View>
        <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.buttonText}>Leave a Review</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    reviewSection: {
        marginHorizontal: 5,
        marginVertical: 10
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewTopLeft: {
        flexDirection: 'row'
    },
       reviewTopRight: {
        flexDirection: 'row'
    },
    leftText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
        marginTop: 2
    },
    rightText: {
        color: '#9E9E9E',
        fontsize: 12,
    },
    reviewTag:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 15,
        marginHorizontal: 10,
    
    },
    tagContainer: {
        backgroundColor:'white',
        marginRight: 10,
        marginBottom: 10,
        paddingHorizontal: 18,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9E9E9E',
    },
    tagText:{
        color: '#9E9E9E'
    },
    leaveButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor:'#FFB300',
        alignItems: 'center',
        width: 350,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center'
      },
      buttonText: {
        fontSize: 16,
        color: '#FFB300',
        fontWeight: '500',
      },
});

export default ReviewCard;