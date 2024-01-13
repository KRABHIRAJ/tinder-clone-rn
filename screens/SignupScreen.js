import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const SignupScreen = () => {
  const { signUpWithEmailAndPass } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          resizeMode: "contain",
          height: 160,
          width: 160,
          marginVertical: 50,
          borderRadius: 999,
          marginHorizontal: 115,
        }}
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
      />
      <TextInput
        placeholder="Enter Your Name"
        style={styles.textInput}
        value={name}
        onChangeText={(text) => setName(text)}
      ></TextInput>
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
      <TextInput
        placeholder="Confirm Password"
        style={styles.textInput}
        secureTextEntry={true}
        value={cnfPassword}
        onChangeText={(text) => setCnfPassword(text)}
      ></TextInput>
      <TouchableOpacity
        onPress={() =>
          signUpWithEmailAndPass(name, email, password, cnfPassword)
        }
        style={styles.signUpBtn}
      >
        <Text style={styles.signUpBtnText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
    width: 190,
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: "25%",
  },
  signUpBtnText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 17,
    color: "white",
  },
});
