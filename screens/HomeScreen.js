import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const { user, logOut } = useAuth();
  const swipeRef = useRef();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("ModalScreen");
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const currentLoggedInUser = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      setLoggedInUser(currentLoggedInUser);

      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const matched = await getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes?.length > 0 ? passes : ["test"];
      const matchedUserIds = matched?.length > 0 ? matched : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...matchedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((profile) => profile.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You Swiped Left on ${userSwiped.displayName}`);
    console.log("current user in left swipe >>", loggedInUser);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log("current user in right swipe >>", loggedInUser);

    getDoc(doc(db, "users", userSwiped.id, "matches", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`Hoorah You matched with ${userSwiped.displayName}`);
          const matchId = generateId(user.uid, userSwiped.id);

          setDoc(doc(db, "matchedUsers", matchId), {
            users: { [user.uid]: loggedInUser, [userSwiped.id]: userSwiped },
            userMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("MatchScreen", {
            loggedInUser,
            userSwiped,
          });
        } else {
          console.log(`You Swiped Right on ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  console.log("user >>", user);
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => logOut()}>
          <Image style={styles.profileImg} source={{ uri: user.photoURL }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.profileImg}
            source={{
              uri: "https://imgs.search.brave.com/25gH9ovtYG8kzi257XyjW1HyF1ofqeGnbItArbTEqIU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90b3Bw/bmcuY29tL3VwbG9h/ZHMvcHJldmlldy90/aW5kZXItbG9nby10/cmFuc3BhcmVudC10/aW5kZXItbG9nby0x/MTU2MzI0MzMwMXpp/dmMxc3g4NGMucG5n",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            style={styles.profileImg}
            name="chatbubbles-sharp"
            size={40}
            color="#FF5864"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardViewContainer}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          verticalSwipe={false}
          animateCardOpacity
          stackSize={5}
          cardIndex={0}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  color: "red",
                  textAlign: "right",
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.cardView}>
                <Image
                  source={{ uri: card.photoURL }}
                  style={styles.cardImage}
                />
                <View style={styles.cardDetailsContainer}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 700 }}>
                      {card.displayName}
                    </Text>
                    <Text
                      style={{ fontSize: 18, fontWeight: 700, color: "gray" }}
                    >
                      {card.job}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 22, fontWeight: 700 }}>
                      {card.age}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.cardView, styles.noCardsContainer]}>
                <Text style={styles.noMoreText}>No more profiles.</Text>
                <Image
                  height={70}
                  width={70}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={styles.crossBtn}
        >
          <Entypo name="cross" size={26} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={styles.heartBtn}
        >
          <AntDesign name="heart" size={26} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 99,
  },
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
  },
  cardViewContainer: {
    height: "100%",
    borderRadius: 30,
  },
  cardView: {
    height: "80%",
    borderRadius: 30,
    backgroundColor: "white",
  },
  cardImage: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: 0,
    flex: 1,
  },
  cardDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardFooter: {
    position: "absolute",
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
    bottom: 20,
  },
  crossBtn: {
    backgroundColor: "rgb(255, 224, 224)",
    borderRadius: 30,
    padding: 12,
  },
  heartBtn: {
    backgroundColor: "rgb(158, 245, 158)",
    borderRadius: 30,
    padding: 12,
  },
  noCardsContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  noMoreText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});
