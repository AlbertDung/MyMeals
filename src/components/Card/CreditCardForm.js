import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../AppText/AppText';
import { colors } from '../../theme/colors';
import { useTheme } from '../Context/ThemeContext';
const CreditCardForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { isDark, colors } = useTheme();
  const handleSubmit = () => {
    onSubmit({
      type: 'credit',
      cardNumber,
      cardholderName,
      expiryDate,
      cvv
    });
  };

  return (
    <View style={[styles.form,{backgroundColor: colors.same2}]}>
      <View style={styles.inputGroup}>
        <AppText text="CARD NUMBER" customStyles={styles.label} />
        <TextInput
          style={[styles.input,{color: colors.text}]}
          value={cardNumber}
          onChangeText={(text) => {
            setCardNumber(text);
            handleSubmit();
          }}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText text="CARDHOLDER NAME" customStyles={styles.label} />
        <TextInput
          style={[styles.input,{color: colors.text}]}
          value={cardholderName}
          onChangeText={(text) => {
            setCardholderName(text);
            handleSubmit();
          }}
          placeholder="John Doe"
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <AppText text="EXPIRY DATE" customStyles={styles.label} />
          <TextInput
            style={[styles.input,{color: colors.text}]}
            value={expiryDate}
            onChangeText={(text) => {
              setExpiryDate(text);
              handleSubmit();
            }}
            placeholder="MM/YY"
          />
        </View>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <AppText text="CVV" customStyles={styles.label} />
          <TextInput
            style={[styles.input,{color: colors.text}]}
            value={cvv}
            onChangeText={(text) => {
              setCvv(text);
              handleSubmit();
            }}
            placeholder="123"
            keyboardType="numeric"
          />
        </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
});

export default CreditCardForm;