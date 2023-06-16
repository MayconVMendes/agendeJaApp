import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./style";

const CardView = ({ name, price, description }) => {
  return (
    <SafeAreaView style={styles.cardDad}>
      <View style={styles.boxView}>
        <Text style={styles.textTitle}>Nome:</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.boxView}>
        <Text style={styles.textTitle}>Preço:</Text>
        <Text style={styles.text}>{price}</Text>
      </View>
      <View style={styles.boxView}>
        <Text style={styles.textTitle}>Descrição:</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CardView;
