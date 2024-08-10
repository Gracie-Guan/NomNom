import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { useEffect, useState} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from "@expo-google-fonts/ubuntu";
import { useFonts } from 'expo-font';

const TagsCard= () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const tagsData = ['Family-friendly', 'Fine-Dining', 'Date', 'Quick Bite', 'Buffet', 'BBQ', 'Brunch', 'Budget-fridendly', 'Thai', 'Spanish', 'Street food', 'Italian'];
    const toggleTag = (tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    };

    const [fontsLoaded] = useFonts({
      Ubuntu_400Regular,
      Ubuntu_500Medium,
      Ubuntu_700Bold,
    });
  
    if (!fontsLoaded) {
      return null;
    }
    return(
            <View style={styles.tagsCard}>
                <Text style={styles.tagsTitle}>How would you describe the place?</Text>
                <View style={styles.tagsContainer}>
                {tagsData.map((tag) => (
                    <TouchableOpacity
                    key={tag}
                    style={[
                        styles.tag,
                        selectedTags.includes(tag) && styles.selectedTag,
                    ]}
                    onPress={() => toggleTag(tag)}
                    >
                        <Text style={[
                            styles.tagText,
                            selectedTags.includes(tag) && styles.selectedTagText
                        ]}>
                            {tag}
                        </Text>
                    </TouchableOpacity>
                ))}

                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    tagsCard:{
        marginLeft: 25,
        marginVertical: 20,
    },
    tagsTitle:{
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15
      },
    tag: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 4,
        marginRight: 5,
        marginBottom: 10
      },
    selectedTag: {
        backgroundColor: '#FFB300',
        borderColor: 'white'
      },
    tagText: {
        fontFamily: 'Ubuntu_400Regular',
        color: 'black',
        fontSize: 13
      },
    selectedTagText: {
        color: 'black',
      },
})

export default TagsCard