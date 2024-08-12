import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const user = {
  name: "Cara",
  level: "25",
  tag: ["Brunch", "Cheese", "Dating"],
  bio: "Shrimp Dumpling Expert",
  avatar:'https://images.unsplash.com/photo-1630463640302-2f92b4e771aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}


const UserHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.level}>
        <Text>Food Critic Level {user.level} </Text>
        
        </View>
      <View style={styles.tagContainer}>
        <Text>{user.tag}</Text>
      </View>
      <Text style={styles.subtitle}>{user.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  level: {
    fontSize: 18,
    color: '#888',
    marginTop: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default UserHeader;