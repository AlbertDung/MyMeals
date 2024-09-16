import { StyleSheet, View } from "react-native";
import React, { isValidElement, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Screen from "../components/Screen/Screen";
import AppHeader from "../components/AppHeader/AppHeader";
import CreditCard from "../components/CreditCard/CreditCard";
import AppText from "../components/AppText/AppText";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { colors } from "../theme/colors";

const PaymentScreen = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Screen customStyles={styles.container}>
      <AppHeader
        title={"Payment Screen"}
        customTitleStyles={{ marginLeft: "25%" }}
      />
      <CreditCard />
      <View style={styles.form}>
        <View style={styles.formItem}>
          <AppText text="Card Holder" customStyles={styles.formLabel} />
          <Input
            placeholder={"Christian Bale"}
            customStyles={styles.formInput}
          />
        </View>
        <View style={styles.formItem}>
          <AppText text="Card " customStyles={styles.formLabel} />
          <Input
            placeholder={"5444 4444 5555 5555"}
            customStyles={styles.formInput}
          />
        </View>
        <View style={styles.formItem}>
          <AppText text="Expiry Date" customStyles={styles.formLabel} />
          <Input placeholder={"12/25"} customStyles={styles.formInput} />
        </View>
        <BouncyCheckbox
          size={25}
          fillColor={colors.primary}
          unfillColor={colors.white}
          text="Secury Save Card Details"
          iconStyle={{ borderColor: colors.primary }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "Lato-Bold", fontSize: 15 }}
          onPress={(isChecked) => {
            setChecked(!isChecked);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button label={"Pay"} customStyles={styles.button} />
      </View>
    </Screen>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  form: {
    height: 350,
    marginHorizontal: 20,
    justifyContent: "space-around",
  },
  formItem: {},
  formLabel: { marginBottom: 25, fontFamily: "Lato-Bold" },
  formInput: {
    marginTop: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 20,
    width: "91%",
  },
});
