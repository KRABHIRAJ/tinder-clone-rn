import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled, photoURL }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        {photoURL && (
          <Image
            width={40}
            height={40}
            style={{ borderRadius: 50, marginLeft: 10 }}
            source={{
              uri:
                photoURL ||
                "https://imgs.search.brave.com/OjW_61FzCTHA2B4GNwckZfTsYw7m-sqvxg0TtOirayE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk4yUTNNVGcz/T0RRdE5UUmxaUzAw/WXpSa0xUbGtOR1F0/Wm1NM01qZzBOelV3/TWpNNVhrRXlYa0Zx/Y0dkZVFYVnlOREF6/TkRrME1UUUAuanBn",
            }}
          />
        )}
        <Text style={styles.headerTitleText}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity style={styles.telephoneContainer}>
          <Foundation name="telephone" size={30} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleText: {
    fontWeight: "600",
    fontSize: 22,
    marginLeft: 10,
    marginTop: -3,
  },
  telephoneContainer: {
    backgroundColor: "rgb(255, 224, 224)",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 30,
    marginRight: 15,
  },
});
