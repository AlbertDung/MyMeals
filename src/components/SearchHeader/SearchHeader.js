import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Voice from '@react-native-voice/voice';

const ICON_SIZE = 25;

const SearchHeader = ({ onPress, onSearch }) => {
  const { isDark, colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setSearchText(e.value[0]);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <Feather name="search" color={colors.same} size={ICON_SIZE} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.same }]}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity onPress={isListening ? stopListening : startListening}>
          <SimpleLineIcons
            name={isListening ? "microphone" : "microphone"}
            color={isListening ? colors.primary : colors.same}
            size={ICON_SIZE}
          />
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  notifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});