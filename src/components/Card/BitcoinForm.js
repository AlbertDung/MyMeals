import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../AppText/AppText';
import { colors } from '../../theme/colors';
import { useTheme } from '../Context/ThemeContext';
const BitcoinForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { isDark, colors } = useTheme();
  const handleSubmit = () => {
    onSubmit({
      type: 'bitcoin',
      address,
      amount
    });
  };

  return (
    <View style={[styles.form,{backgroundColor: colors.same2}]}>
      <View style={styles.inputGroup}>
        <AppText text="BITCOIN ADDRESS" customStyles={styles.label} />
        <TextInput
          style={[styles.input,{color: colors.text}]}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            handleSubmit();
          }}
          placeholder="Enter your Bitcoin wallet address"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.inputGroup,{color: colors.text}]}>
        <AppText text="AMOUNT (BTC)" customStyles={styles.label} />
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
            handleSubmit();
          }}
          placeholder="0.001"
          keyboardType="decimal-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "Lato-Bold",
    fontSize: 12,
    color: colors.medium,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
  },
});

export default BitcoinForm;