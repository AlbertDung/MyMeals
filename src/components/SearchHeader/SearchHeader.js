import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import React from "react";

import Input from "../Input/Input";
import { colors } from "../../theme/colors";

const ICON_SIZE = 25;

const SearchHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <Input
          LeftIconComponent={
            <Feather name="search" color={colors.dark} size={ICON_SIZE} />
          }
          placeholder="Search"
          RightIconComponent={
            <SimpleLineIcons
              name="microphone"
              color={colors.dark}
              size={ICON_SIZE}
            />
          }
        />
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.notifications}>
        <Ionicons
          name="notifications-outline"
          color={colors.primary}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  notifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
