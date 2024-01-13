import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const [latMessage, setLastMessage] = useState("");
  const [currMatchedUserInfo, setCurrMatchedUserInfo] = useState();
  const { user } = useAuth();
  useEffect(() => {
    setCurrMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user));
  }, [user]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matchedUsers", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot?.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message", { matchDetails })}
      style={styles.chatRowContainer}
    >
      <Image
        source={{ uri: currMatchedUserInfo?.photoURL }}
        style={styles.chatImage}
      />
      <View style={styles.userDetailContainer}>
        <Text style={styles.displayNameText}>
          {currMatchedUserInfo?.displayName}
        </Text>
        <Text>{latMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  chatImage: {
    height: 50,
    width: 50,
    borderRadius: 99,
  },
  displayNameText: {
    fontSize: 20,
    fontWeight: "600",
  },
  chatRowContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  userDetailContainer: {
    marginLeft: 20,
    marginRight: 10,
  },
});
