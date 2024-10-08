import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../components/AppText/AppText';
import Screen from '../components/Screen/Screen';
import Button from '../components/Button/Button';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const PaymentScreens = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddCard = () => {
    // Implement card addition logic
    navigation.goBack();
  };

  return (
    <Screen customStyles={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <AppText text="My Cards" customStyles={styles.title} />
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <AppText text="Current Balance" customStyles={styles.cardHeaderText} />
          <AppText text="$12,432.32" customStyles={styles.cardBalance} />
        </View>
        <View style={styles.cardFooter}>
          <AppText text="**** **** **** 1505" customStyles={styles.cardNumber} />
          <View style={styles.cardInfo}>
            <AppText text="Lutei Bailey" customStyles={styles.cardName} />
            <AppText text="05/20" customStyles={styles.cardExpiry} />
          </View>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <AppText text="CARDHOLDER NAME" customStyles={styles.label} />
          <TextInput
            style={styles.input}
            value={cardholderName}
            onChangeText={setCardholderName}
            placeholder="Ahmed Mohamed"
          />
        </View>

        <View style={styles.inputGroup}>
          <AppText text="CARD NUMBER" customStyles={styles.label} />
          <View style={styles.cardNumberInputContainer}>
            <TextInput
              style={styles.cardNumberInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="4566 4585 4757 4895"
              keyboardType="numeric"
            />
            <Ionicons name="card-outline" size={24} color={colors.medium} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <AppText text="EXPIRATION DATE" customStyles={styles.label} />
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="07/22"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <AppText text="CVV/CVC" customStyles={styles.label} />
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              placeholder="344"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveCredentials}>
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          <AppText text="Add Face ID" customStyles={styles.saveCredentialsText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveCredentials}>
          <Ionicons name="checkbox-outline" size={24} color={colors.primary} />
          <AppText text="Save my credentials" customStyles={styles.saveCredentialsText} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button label="Add Card" customStyles={styles.button} onPress={handleAddCard} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    marginBottom: 30,
  },
  cardHeaderText: {
    color: colors.white,
    fontSize: 14,
  },
  cardBalance: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    color: colors.white,
    fontSize: 18,
  },
  cardInfo: {
    alignItems: 'flex-end',
  },
  cardName: {
    color: colors.white,
    fontSize: 14,
  },
  cardExpiry: {
    color: colors.white,
    fontSize: 12,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
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
  cardNumberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 10,
  },
  cardNumberInput: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveCredentials: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  saveCredentialsText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.primary,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
  },
});

export default PaymentScreens;