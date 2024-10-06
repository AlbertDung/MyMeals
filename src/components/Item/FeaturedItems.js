import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const FeaturedItem = ({ id, title, image, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <SharedElement id={`item.${id}.image`}>
      <Image 
        source={image} 
        style={styles.image} 
        resizeMode="cover" 
      />
    </SharedElement>
    <Text style={styles.itemTitle}>{title}</Text>
  </TouchableOpacity>
);

const FeaturedItems = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore some thing new</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <FeaturedItem
            key={index}
            id={item.id}
            title={item.name}
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
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 15,
    color: '#333',
  },
  itemContainer: {
    marginRight: 15,
    alignItems: 'center',
    marginLeft: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
});

export default FeaturedItems;