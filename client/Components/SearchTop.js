import React from 'react';
import { View, StyleSheet , TextInput,TouchableOpacity, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchTop = ({ search, onChangeText, onVoicePress}) => {
    return (
    <View style={styles.Container}>
        <View style={styles.search}>
            <Feather name='search' size={24} color="#FFCDB2" style={styles.searchIcon}/>
            <TextInput
                style={styles.input}
                placeholder="Search for 'Main course under €10'"
                placeholderTextColor={'#808080'}
                value={search}
                onChangeText={onChangeText}
            />
        </View>
        <TouchableOpacity onPress={onVoicePress} style={styles.voiceContainer}>
            <Feather name="mic" size={24} color="#FFCDB2" />
        </TouchableOpacity>
    </View>
    
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFC5A5',
        padding: 5,
        borderRadius: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        
    },
    search: {
        flexDirection: 'row'
    },
    searchIcon: {
        marginLeft: 5
    },
    input: {
        marginLeft: 5,
    },
    voiceContainer: {
        marginRight: 5
    }

});

export default SearchTop;
