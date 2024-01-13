import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let unsub = onSnapshot(
      query(
        collection(db, "matchedUsers"),
        where("userMatched", "array-contains", user.uid)
      ),
      (snapshot) =>
        setMatchedUsers(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
    return unsub;
  }, [user]);
  return matchedUsers.length > 0 ? (
    <FlatList
      data={matchedUsers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={styles.noMatchContainer}>
      <Text style={{ alignSelf: "center", fontSize: 17, fontWeight: 600 }}>
        No Matches Yet... Keep Swiping!
      </Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  noMatchContainer: {
    position: "absolute",
    top: 70,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
