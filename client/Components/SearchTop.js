import React from 'react';
import { View, StyleSheet , TextInput,TouchableOpacity, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchTop = ({ search, onChangeText, onVoicePress, onPress}) => {
    const navigation = useNavigation();
    const handleSearch = () => {
        navigation.navigate('SearchList', {onChangeText});
    };

    return (
    <View style={styles.Container}>
        <View style={styles.search}>
            <TouchableOpacity onPress={onVoicePress} style={styles.voiceContainer}>
                <Feather name="mic" size={24} color="#FFCDB2" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search for 'Main course under €10'"
                placeholderTextColor={'#808080'}
                value={search}
                onChangeText={onChangeText}
            />
        </View>
            <TouchableOpacity onPress={handleSearch}>
                <Feather name='search' size={24} color="#FFCDB2" style={styles.searchIcon}/>
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
        marginRight: 5

    },
    input: {
        marginLeft: 5,
    },
    voiceContainer: {
        marginLeft: 5,
    }

});

export default SearchTop;
