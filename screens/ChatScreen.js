import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.chatContainer}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    backgroundColor: "#eee",
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
});
