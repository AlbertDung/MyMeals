import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../components/AppText/AppText';
import Screen from '../components/Screen/Screen';
import Button from '../components/Button/Button';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodItem = ({ method, onSelect, isSelected }) => (
  <TouchableOpacity 
    style={[styles.paymentMethod, isSelected && styles.selectedPaymentMethod]} 
    onPress={() => onSelect(method.id)}
  >
    {method.icon}
    <View style={styles.paymentInfo}>
      <AppText text={method.title} customStyles={styles.paymentTitle} />
      <AppText text={method.description} customStyles={styles.paymentDescription} />
    </View>
    {isSelected && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
  </TouchableOpacity>
);

const AddPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();

  const paymentMethods = [
    { id: 'paypal', title: 'PayPal', description: 'Faster & safer way to send money', icon: <Ionicons name="logo-paypal" size={24} color="#0070BA" /> },
    { id: 'card', title: 'Credit Card', description: 'Visa, MasterCard, Visa or AMEX', icon: <Ionicons name="card-outline" size={24} color="#2C3E50" /> },
    { id: 'bitcoin', title: 'Bitcoin Wallet', description: 'Send the amount to your Bitcoin wallet', icon: <Ionicons name="logo-bitcoin" size={24} color="#F7931A" /> },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedMethod) {
      navigation.navigate("Payment", { method: selectedMethod });
    }
  };

  const handle = () => {
    navigation.navigate('Payment');
  };

  return (
    <Screen customStyles={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <AppText text="Add A Payment Method" customStyles={styles.title} />
        <View style={styles.placeholder} />
      </View>
      
      <AppText text="Choose payment method to add" customStyles={styles.subtitle} />
      
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => (
          <PaymentMethodItem
            method={item}
            onSelect={() => setSelectedMethod(item.id)}
            isSelected={selectedMethod === item.id}
            
          />
        )}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          label="Next" 
          customStyles={[styles.button, !selectedMethod && styles.disabledButton]} 
          onPress={handleNext}
          disabled={!selectedMethod}
        />
        {/* <Button 
          label="Next" 
          // customStyles={[styles.button, !selectedMethod && styles.disabledButton]} 
          onPress={handle}
          /> */}
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
  placeholder: {
    width: 24,
  },
  subtitle: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.medium,
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  paymentTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: colors.dark,
  },
  paymentDescription: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.medium,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default AddPayment;