import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
        }}
        resizeMode="cover"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      ></ImageBackground>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signin")}
        style={styles.signIn}
      >
        <Text style={styles.texts}>Sign In </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.signUp}
      >
        <Text style={styles.texts}>Sign Up & Get Swiping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  signIn: {
    position: "absolute",
    bottom: 200,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 80,
    width: 250,
  },
  signUp: {
    position: "absolute",
    bottom: 150,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    width: 250,
    marginHorizontal: 80,
  },
  texts: {
    fontWeight: "700",
    textAlign: "center",
  },
});
