import {
  Button,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    addDoc(collection(db, "matchedUsers", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      message: input,
      displayName: user.displayName,
    });
    setInput("");
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matchedUsers", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );
  return (
    <SafeAreaView style={styles.messageContainer}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user).displayName}
        callEnabled
        photoURL={getMatchedUserInfo(matchDetails.users, user).photoURL}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          style={{ marginBottom: 80 }}
          data={messages}
          inverted={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.userId === user.uid ? (
              <SenderMessage key={item.id} message={item.message} />
            ) : (
              <RecieverMessage key={item.id} message={item.message} />
            )
          }
        />
      </TouchableWithoutFeedback>
      {/* <View>
        {messages.map((message) =>
          message.userId === user.uid ? (
            <SenderMessage key={message.id} message={message.message} />
          ) : (
            <RecieverMessage key={message.id} message={message.message} />
          )
        )}
      </View> */}
      <View style={styles.sendMessageContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Send Message ..."
        />
        <Button onPress={sendMessage} title="send" color="#ff5864" />
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    backgroundColor: "#eee",
    flex: 1,
  },
  sendMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    // width: 300,
    flex: 1,
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
  },
});
