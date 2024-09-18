import React from 'react';
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native';
import { useFavorites } from '../components/Context/FavoritesContext';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';
import Screen from '../components/Screen/Screen';
import AppHeader from '../components/AppHeader/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Favorites = () => {
  const { favorites, removeFavorite, updateFavoriteQuantity } = useFavorites();
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate('Details', { item });
  };

  const handleDelete = (item) => {
    removeFavorite(item.id);
    // Thêm thông báo xác nhận hoặc hoàn tác ở đây nếu cần
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateFavoriteQuantity(item.id, newQuantity);
    } else {
      removeFavorite(item.id);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="heart-outline" size={80} color="#CCC" />
      <Text style={styles.emptyText}>Your favorites list is empty</Text>
      <Text style={styles.emptySubText}>Explore our menu and tap the heart to add items you love!</Text>
    </View>
  );

  return (
    <Screen style={styles.screen}>
      <AppHeader title="My Favorites" customTitleStyles={styles.headerTitle} />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            onPress={() => handleCardPress(item)}
            onFavoritePress={() => handleDelete(item)}
            onQuantityChange={(newQuantity) => handleQuantityChange(item, newQuantity)}
            onDelete={() => handleDelete(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Favorites;