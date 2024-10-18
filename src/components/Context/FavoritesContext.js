import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    if (!favorites.some(fav => fav.id === item.id)) {
      
      setFavorites((prevFavorites) => [...prevFavorites, { ...item, type: item.type || (item.restaurantName ? 'restaurant' : 'dish') }]);
    }
  };
  
  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== itemId));
  };
  
  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };
  
  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        ...item,
        type: 'restaurant',
        // Ensure all necessary fields are included
        restaurantName: item.restaurantName,
        farAway: item.farAway,
        images: item.images,
        averageReview: item.averageReview,
        numberOfReview: item.numberOfReview,
        foodType: item.foodType,
        // Add any other fields you need for the RestaurantCard
      });
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite,clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};