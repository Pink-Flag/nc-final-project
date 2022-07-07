import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [refreshToken, setRefreshToken] = useState("hi");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const navigate = useNavigate();

  const { signedOut } = useParams();

  useEffect(() => {
    if (signedOut) {
      setUser(null);
    }
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setRefreshToken(userCredential.refreshToken);
        const docRef = doc(db, "users", userCredential.user.uid);
        getDoc(docRef).then((docSnap) => {
          setUser({
            displayName: docSnap.data().displayName,
            email: docSnap.data().email,
            photoURL: docSnap.data().photoURL,
            uid: userCredential.user.uid,
            defaultLanguage: docSnap.data().defaultLanguage,
          });
        });
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {signedOut ? <Text style={styles.goodbye}>Goodbye!</Text> : null}
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

      <Text style={styles.registerText}>
        Not Registered?
        <Link to="/register">
          <Text style={styles.linkText}> Click here</Text>
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
    marginTop: "23%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",

    height: "80%",
  },
  inputContainer: {
    width: "80%",
    marginTop: " 45%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#F7F8FA",
    borderWidth: 1,
    marginTop: 5,
    minWidth: "90%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  registerText: {
    color: "#202124",
    marginTop: 10,
  },
  linkText: {
    textDecorationLine: "underline",
    marginTop: 10,
    color: "blue",
  },
  goodbye: {
    fontSize: 20,
    marginTop: "10%",
    letterSpacing: 1,

  }
});
