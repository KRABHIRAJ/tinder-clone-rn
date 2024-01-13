import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { signInWithEmailAndPass } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          resizeMode: "contain",
          height: 160,
          width: 160,
          marginVertical: 50,
          marginTop: 150,
          borderRadius: 999,
          marginHorizontal: 115,
        }}
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
      />

      <TextInput
        placeholder="Enter Your Email"
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      <TouchableOpacity
        onPress={() => signInWithEmailAndPass(email, password)}
        style={styles.signUpBtn}
      >
        <Text style={styles.signUpBtnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.signUpBtn}
      >
        <Text style={styles.signUpBtnText}>Sign Up & Explore</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    flex: 1,
    backgroundColor: "#FF5F61",
  },
  textInput: {
    height: 40,
    margin: 12,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  signUpBtn: {
    backgroundColor: "#EE4A77",
    paddingHorizontal: 40,
    paddingVertical: 12,
    width: 240,
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: "20%",
  },
  signUpBtnText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 17,
    color: "white",
  },
});
