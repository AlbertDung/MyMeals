import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    if (!favorites.some(fav => fav.id === item.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };
  
  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== itemId));
  };
  
  const isFavorite = (itemId) => {
    return favorites.some(item => item.id === itemId);
  };
  

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
