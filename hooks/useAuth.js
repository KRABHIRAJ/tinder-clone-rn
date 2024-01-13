import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

// use useMemo

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const updateProfilePhoto = (photoURL) => {
    updateProfile(auth.currentUser, {
      photoURL: photoURL,
    })
      .then(() => {
        console.log("User Profile Pic Updated");
      })
      .catch((err) => {
        console.log("Error while updating profile pic >>", err);
        setError(err);
        alert("Error : " + err);
      });
  };

  const signUpWithEmailAndPass = (name, email, password, cnfPassword) => {
    console.log("In signUpWithEmailAndPass");
    if (password === cnfPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:
              "https://akm-img-a-in.tosshub.com/aajtak/images/photo_gallery/202112/disha-6.jpg",
          })
            .then(() => {
              console.log("In signUpWithEmailAndPass user updated");
            })
            .catch((err) => {
              console.log("In signUpWithEmailAndPass error >>", err);
              setError(err);
              alert("Error : " + err);
            });
        })
        .catch((err) => {
          console.log("In signUpWithEmailAndPass user errr >>", err);
          setError(err);
          alert("Error : " + err);
        });
    } else {
      alert("Password does not match.");
    }
  };

  const signInWithEmailAndPass = (email, password) => {
    console.log("In signInWithEmailAndPass");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // ...
      })
      .catch((err) => {
        setError(err);
        alert("Error : " + err);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("SignOut SuccessFully");
      })
      .catch((err) => {
        // An error happened.
        setError(err);
        alert("Error : " + err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        logOut,
        signInWithEmailAndPass,
        signUpWithEmailAndPass,
        updateProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
