import React from 'react';
import { View, Image, Text } from 'react-native';

const TestComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Image should appear below:</Text>
      <Image
  source={{ uri: 'https://via.placeholder.com/800.png?text=RestaurantPic'}}
  style={{ width: 100, height: 100 }}
/>
    </View>
  );
};

export default TestComponent;