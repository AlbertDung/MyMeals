import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useFavorites } from '../components/Context/FavoritesContext';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';
import Screen from '../components/Screen/Screen';
import AppHeader from '../components/AppHeader/AppHeader';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Screen>
        <AppHeader title="Favorites" customTitleStyles={{ marginLeft: "35%" }} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite items yet.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader title="Favorites" customTitleStyles={{ marginLeft: "35%" }} />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Favorites;