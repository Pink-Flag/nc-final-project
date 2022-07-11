import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "./UserContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  //Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setavatarUrl] = useState("");
  const [defaultLanguage, setdefaultLanguage] = useState("German");

  const auth = getAuth();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //create new user profile
  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const data = {
          defaultLanguage: defaultLanguage,
          email: email,
          photoURL: avatarUrl,
          username: username,
        };
        setDoc(doc(db, "users", auth.currentUser.uid), data).then(() => {
          setUser({
            displayName: username,
            email: email,
            photoURL: avatarUrl,
            defaultLanguage: defaultLanguage,
            uid: auth.currentUser.uid,
          });
        });
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.headerView}>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text> Username*</Text>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text> Email*</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text> Password*</Text>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View style={styles.inputView}>
              <Text> Confirm Password*</Text>
              <TextInput
                placeholder="Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>
            <View style={styles.inputView}>
              <Text> Avatar link</Text>
              <TextInput
                placeholder="Avatar Link"
                value={avatarUrl}
                onChangeText={(text) => setavatarUrl(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputView}>
              <Text> I want to learn</Text>
              <View style={styles.editPicker}>
                <Picker
                  selectedValue={defaultLanguage}
                  style={styles.inputPicker}
                  onValueChange={(itemValue, itemIndex) =>
                    setdefaultLanguage(itemValue)
                  }
                >
                  <Picker.Item label="French" value="French" />
                  <Picker.Item label="German" value="German" />
                  <Picker.Item label="Spanish" value="Spanish" />
                </Picker>
                <Text style={styles.required}>* required fields</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                handleSignup();
              }}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register & Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View>
        {loading && (
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
  },
  inputContainer: {

    width: "90%",
    alignSelf: "center",

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
    marginLeft: "20%",

    marginBottom: "5%",

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
  headerView: {
    textAlignVertical: "top",
    marginTop: 0,
    marginTop: "20%",
    height: "0%",
  },
  inputView: {
    marginTop: 5,
    marginBottom: 5,
  },

  loadingSpinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  required: {
    fontSize: 12,
    marginTop: 10,
  },

  inputPicker: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  editPicker: {
    width: "75%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    width: "100%",
  },
});

export default Register;
