// FloatingSearchBar.jsx
import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

export default function FloatingSearchBar({ query, setQuery, onSearch, onClear }) {
//   return (
//     <View style={styles.searchBarContainer}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search"
//         value={query}
//         onChangeText={text => setQuery(text)}
//       />
//       <Button title="Search" onPress={onSearch} />
//     </View>
//   );
const handleTextChange = (text) => {
    setQuery(text);
    if (text === '') {
      onClear(); // Call onClear when text is cleared
    }
  };
return (
<View style={styles.searchContainer}>
<TextInput
  autoCapitalize="none"
  autoCorrect={false}
  clearButtonMode="always"
  value={query}
//   onChangeText={queryText => setQuery(queryText)}
  onChangeText={handleTextChange}
  onEndEditing={queryText => setQuery(queryText)}
  placeholder="Search"
  style={styles.searchInput}
//   onFocus={handleFocus}
  // onBlur={handleBlur}
/>
<Button title="Search" onPress={onSearch} />
</View>
);
}

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff'
  }, 
//   searchContainer: {
//     flex: 1,
//     position: 'absolute',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 20,
//     marginBottom: 0
//   }
searchContainer: {
    // position: 'absolute',
    // bottom: 32, // Position at the bottom of the screen
    left: 0,   // Stretch the container to the left edge
    right: 0,  // Stretch the container to the right edge
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC93C',
    padding: 8,
    // marginBottom: 0,  // No margin at the bottom
    // borderRadius: 20,
    zIndex: 1000, // Ensure it appears on top of other content
    // paddingLeft: 10,
    // paddingRight: 10
  }
});
