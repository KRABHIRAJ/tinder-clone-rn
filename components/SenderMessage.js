import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.senderContainer}>
      <Text>{message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({
  senderContainer: {
    padding: 10,
    backgroundColor: "#DEF5D9",
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 10,
    borderTopRightRadius: 0,
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    flex: 1,
  },
});
