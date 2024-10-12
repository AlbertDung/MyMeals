import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "../Context/ThemeContext";
import Input from "../Input/Input";
// import { colors } from "../../theme/colors";

const ICON_SIZE = 25;

const SearchHeader = ({onPress}) => {
  const { isDark, colors } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <Input
          LeftIconComponent={
            <Feather name="search" color={colors.same} size={ICON_SIZE} />
          }
          placeholder="Search"
          RightIconComponent={
            <SimpleLineIcons
              name="microphone"
              color={colors.same}
              size={ICON_SIZE}
            />
          }
        />
      </View>
      <TouchableOpacity onPress={onPress} style={styles.notifications}>
        <Ionicons
          name="options-outline"
          color={colors.same}
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
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 20,
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
