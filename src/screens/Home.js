import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Screen from "../components/Screen/Screen";
import PromotionCard from "../components/PromotionCard/PromotionCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import TabView from "../components/TabView/TabView";
import SearchHeader from "../components/SearchHeader/SearchHeader";

const Home = () => {
  return (
    <Screen>
      <SearchHeader />
      <View>
        {/* <PromotionCard
          backgroundImage={require("../../assets/images/promotion.jpg")}
          promotionText="Super Offer Every Weekend from 9AM to 8PM"
          buttonText="Order Now"
          contact="035788687"
          website="www.fullstapp.com"
          discount={20}
        /> */}
        <View style={styles.categories}>
          <SectionTitle  title="Categories"/>
          <TabView />
        </View>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  categories: {
    height: 700,
  },
});
