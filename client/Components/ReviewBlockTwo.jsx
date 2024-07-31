import { View, Text ,StyleSheet,Image,  ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Feather, MaterialIcons} from '@expo/vector-icons'

function ReviewBlockTwo(){
    const reviewData = [
        {
            id: '1',
            userName: 'Brian K',
            userDate: '21 days ago',
            rating: 4,
            avatar: 'https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar01-512.png',
            comment: 'The Irish stel reminds me of my mom cooking, cannot have it enough.',
            like: 13
        },
    ]
    return(
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
    {reviewData.map((review)=>(
           <View key={review.id} style={styles.reviewCard}>
           <View style={styles.avatar}>
               <Image source={{uri:review.avatar}} style={styles.avatarImage} />
               <View style={styles.nameDate}>
                   <Text style={styles.userName}> {review.userName}</Text>
                   <Text style={styles.userDate}> {review.userDate}</Text>
               </View>
               <View style={styles.commentStar}>
                   {Array.from({ length: 5 }, (_, index) => (
                       <MaterialIcons
                           key={index}
                           name="star"
                           size={15}
                           color={index < review.rating ? "#FFB300" : "#EEEEEE"}
                           style={styles.starIcon}
                       />
                   ))}
               </View>
           </View>
           <View style={styles.comment}>
               <Text style={styles.commentText}>
                   {review.comment}
               </Text>
           </View>
           <View style={styles.like}>
               <Feather name = "thumbs-up" size={20}/>
               <Text style={styles.likeNumber}>{review.like}</Text>
           </View>
       </View>
    ))}
    </ScrollView>
    )
}


const styles = StyleSheet.create({
  reviewCard: {
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
      marginBottom: 10
  },
  avatar:{
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 15
  },
  avatarImage: {
      width: 50,
      height: 50,
      borderRadius: 50
  },
  nameDate: {
      paddingLeft: 10,
      paddingTop: 5
  },
  userName:{
      fontWeight: '700',
      fontSize: 16
  },
  userDate: {
      color: '#9E9E9E',
      fontWeight:'500'
  },
  commentStar: {
      flexDirection: 'row',
      paddingLeft: 60,
      paddingTop: 8
  },
  starIcon: {
      paddingRight: 4
  },
  tagBar: {
      flexDirection: 'row',
      paddingVertical: 5,
      paddingLeft: 15,
    },
  tag: {
      backgroundColor: 'white',
      fontSize: 9,
      borderWidth: 1,
      borderColor: '#FFB300',
      paddingVertical: 4,
      paddingHorizontal: 15,
      borderRadius: 15,
      marginRight: 5,
    },
    tagText: {
      fontSize: 12,
    },
  comment: {
      paddingHorizontal: 18,
      paddingVertical: 10
  },
  commentText: {
      fontSize: 14,
      color: '#6E6E6E',
      fontWeight: '500'
  },
  photo: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 2,
      justifyContent: 'center'
  },
  photoImage: {
      width: 105,
      height: 100,
      borderRadius: 10,
      marginRight: 5
  },
  like: {
      flexDirection: 'row',
      paddingLeft: 310,
      paddingBottom: 15,
      paddingTop: 10
  },
  likeNumber: {
      paddingLeft: 5,
      paddingTop: 2
  }
  
  })

export default ReviewBlockTwo