import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState } from "react";
import { NativeRouter, Link, Route, Routes } from "react-router-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  // for when we have navigation
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // navigate here
  //     } else {
  //       console.log("user not logged in");
  //     }
  //   }
  // }, [])

  // const handleSignup = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log("Registered with ", user.email);
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const handleLogin = () => {
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in with ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Text style={styles.registerText}>Not Registered? 

      <Link to="/register" >
            <Text style={styles.linkText} >  Click here</Text>
          </Link>
         </Text> 
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
     
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A0EADE",
  },
  inputContainer: {
    width: "80%",
    
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    minWidth: "90%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 70,
  },
  button: {
    backgroundColor: "#5c6784",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#5c6784",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#5c6784",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText:{
    color: "#202124",
    marginTop: 10,

  },
  linkText :{
    textDecorationLine: "underline",
    marginTop: 10,
    color: "blue",
  }
});
