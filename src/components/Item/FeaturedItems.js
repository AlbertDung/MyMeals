import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FeaturedItem = ({ title, image, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.itemTitle}>{title}</Text>
  </TouchableOpacity>
);

const FeaturedItems = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Items</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <FeaturedItem
            key={index}
            title={item.title}
            image={item.image}
            onPress={() => {/* Navigate to item details */}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
  },
  itemContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default FeaturedItems;