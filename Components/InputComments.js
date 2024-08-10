import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from "@expo-google-fonts/ubuntu";
import { useFonts } from 'expo-font';
const InputComments = () => {
    const [text, setText] = useState('');

    const [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
        Ubuntu_500Medium,
        Ubuntu_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Leave a detailed review</Text>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="'Write about food and service of the restarurant'"
                placeholderTextColor="#8F8F8F"
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 25

    },
    inputTitle:{
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        borderColor: '#FFB300',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 12,
        fontFamily: 'Ubuntu_500Medium',
        paddingBottom: 100,
        paddingTop: 15,
    },
});

export default InputComments
