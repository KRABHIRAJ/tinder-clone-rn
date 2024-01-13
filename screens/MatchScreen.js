import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { loggedInUser, userSwiped } = params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.matchImage}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/mg9" }}
      />

      <Text style={styles.matchText}>
        You and {userSwiped.displayName} liked each other.
      </Text>

      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={{
            uri: loggedInUser.photoURL,
          }}
        />
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={{
            uri: userSwiped.photoURL,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.sendMsgBtn}
      >
        <Text style={styles.sendMsgBtnTxt}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF4270",
    opacity: 0.89,
    flex: 1,
  },
  matchImage: {
    height: 80,
    width: "100%",
    marginTop: 120,
  },
  matchText: {
    textAlign: "center",
    color: "white",
    marginTop: 40,
    fontSize: 19,
    fontWeight: "600",
  },
  profileImageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 99,
    marginTop: 50,
  },
  sendMsgBtn: {
    backgroundColor: "#fff",
    width: "75%",
    marginTop: 40,
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  sendMsgBtnTxt: {
    textAlign: "center",
    fontSize: 18,
  },
});
