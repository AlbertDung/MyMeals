import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen/Screen";
import AppHeader from "../components/AppHeader/AppHeader";
import { paymentMethod } from "../data/paymentMethods";
import PaymentMethod from "../components/PaymentMethod/PaymentMethod";
import Button from "../components/Button/Button";
import { useNavigation } from '@react-navigation/native';
const AddPayment = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handlMasterCard = () => {
    navigation.navigate("Payment");
  };
  return (
    <Screen>
      <AppHeader
        onBackPress={handleGoBack}
        title="Add Payment Method"
        customTitleStyles={styles.headerTitleStyle}
      />
      {paymentMethod.map((paymentMethod) => (
        <PaymentMethod
          key={paymentMethod.title}
          paymentMethod={paymentMethod}
          onCheckOutPress={handlMasterCard}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button label={"Next"} customStyles={styles.button} />
      </View>
    </Screen>
  );
};

export default AddPayment;

const styles = StyleSheet.create({
  headerTitleStyle: {
    marginLeft: "20%",
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    paddingVertical: 20,
  },
});
