import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RestaurantScroll from '../Scroll/RestaurantScroll';

const CategoryTabView = ({ restaurants }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'recent', title: 'Recent' },
    { key: 'favorites', title: 'Favorites' },
    { key: 'rating', title: 'Rating' },
    { key: 'popular', title: 'Popular' },
    { key: 'trending', title: 'Trending' },
  ]);

  const renderScene = SceneMap({
    recent: () => <RestaurantScroll title="Recent" restaurants={restaurants.slice(0, 5)} />,
    favorites: () => <RestaurantScroll title="Favorites" restaurants={restaurants.slice(5, 10)} />,
    rating: () => <RestaurantScroll title="Top Rated" restaurants={restaurants.slice(10, 15)} />,
    popular: () => <RestaurantScroll title="Popular" restaurants={restaurants.slice(15, 20)} />,
    trending: () => <RestaurantScroll title="Trending" restaurants={restaurants.slice(20, 25)} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.tabIndicator}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    color: 'black',
    fontSize: 12,
  },
  tabIndicator: {
    backgroundColor: 'blue',
  },
});

export default CategoryTabView;