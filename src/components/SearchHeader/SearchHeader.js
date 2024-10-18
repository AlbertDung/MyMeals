import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Modal, Text } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Context/ThemeContext";
import Voice from '@react-native-voice/voice';
import { colors } from '../../theme/colors';
const ICON_SIZE = 25;

const SearchHeader = ({ onPress, onSearch }) => {
  const { isDark, colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setSearchText(e.value[0]);
    setModalVisible(false);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
      setModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      setModalVisible(false);
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
          placeholder="Find you meals or Enter an URL"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity onPress={startListening}>
          <SimpleLineIcons
            name="microphone"
            color={colors.same}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Google</Text>
            <TouchableOpacity 
              style={styles.micButton}
              onPress={isListening ? stopListening : startListening}
            >
              <SimpleLineIcons
                name="microphone"
                color={isListening ? colors.input : 'white'}
                size={40}
              />
            </TouchableOpacity>
            <Text style={styles.modalSubtitle}>Say something (English)</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'white',
  },
});

export default SearchHeader;