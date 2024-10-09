import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../AppText/AppText';
import { colors } from '../../theme/colors';

const PayPalForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({
      type: 'paypal',
      email,
      // Note: In a real app, you wouldn't send the password to the parent component
      // This is just for demonstration purposes
      password: password ? '********' : ''
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <AppText text="EMAIL" customStyles={styles.label} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleSubmit();
          }}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText text="PASSWORD" customStyles={styles.label} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleSubmit();
          }}
          placeholder="Enter your PayPal password"
          secureTextEntry
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
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 10,
  },
});

export default PayPalForm;