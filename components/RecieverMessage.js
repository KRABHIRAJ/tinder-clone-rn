import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const RecieverMessage = ({ message }) => {
  return (
    <View style={styles.recieverContainer}>
      <View>
        <Text style={styles.recieverTextContainer}>{message}</Text>
      </View>
    </View>
  );
};

export default RecieverMessage;

const styles = StyleSheet.create({
  recieverTextContainer: {
    padding: 10,
    backgroundColor: "rgb(255, 224, 224)",
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    flex: 1,
  },
  recieverContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 10,
  },
});
