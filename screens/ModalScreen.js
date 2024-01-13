import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user, updateProfilePhoto } = useAuth();
  const [profilePicUri, setProfilePicUri] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const navigation = useNavigation();

  const incompleteForm = !profilePicUri || !occupation || !age || !gender;

  const updateProfileData = () => {
    console.log("Update Profile Data");
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: profilePicUri,
      job: occupation,
      age: age,
      gender: gender,
      timestamp: serverTimestamp(),
    })
      .then(async () => {
        await updateProfilePhoto(profilePicUri);
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert("Error :", err);
      });
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View>
        <Image
          style={{ width: "100%", height: 80, marginBottom: 20 }}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/2pf" }}
        />
        <Text style={styles.welcomeText}>
          Welcome <Text style={{ fontWeight: "600" }}>{user.displayName}</Text>
        </Text>
        <Text style={styles.profilePicText}>Step 1: The Profile Pic</Text>
        <TextInput
          value={profilePicUri}
          onChangeText={setProfilePicUri}
          style={styles.profilePicTextInput}
          placeholder="Enter profile pic URL"
        />

        <Text style={styles.profilePicText}>Step 2: The Job</Text>
        <TextInput
          value={occupation}
          onChangeText={setOccupation}
          style={styles.profilePicTextInput}
          placeholder="Enter your occupation"
        />

        <Text style={styles.profilePicText}>Step 3: The Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={styles.profilePicTextInput}
          placeholder="Enter your age"
          keyboardType="numeric"
        />

        <Text style={styles.profilePicText}>Step 4: The Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.profilePicTextInput}
          placeholder="Enter male/female"
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => updateProfileData()}
          disabled={incompleteForm}
          style={incompleteForm ? styles.updateBtnDisabled : styles.updateBtn}
        >
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  homeContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    flex: 1,
    justifyContent: "space-between",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 22,
  },
  profilePicTextInput: {
    fontSize: 19,
    textAlign: "center",
    marginTop: 15,
  },
  profilePicText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#FF4270",
    marginTop: 15,
  },
  updateBtn: {
    backgroundColor: "#FF4270",
    width: 200,
    padding: 10,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 40,
  },
  updateText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  updateBtnDisabled: {
    backgroundColor: "rgb(195, 195, 195)",
    width: 200,
    padding: 10,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 40,
  },
});
