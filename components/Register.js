import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { React, useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "./UserContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setavatarUrl] = useState("");
  const [defaultLanguage, setdefaultLanguage] = useState("French");
  const auth = getAuth();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const defaultAvatar =
    "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg";

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { testUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: avatarUrl,
      });
      setUser(auth.currentUser);
      setLoading(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.headerView}>
          <Text style={styles.header}>Vocab</Text>
        </View>
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
            <Picker
              selectedValue={defaultLanguage}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setdefaultLanguage(itemValue)
              }
            >
              <Picker.Item label="French" value="French" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="German" value="German" />
            </Picker>
            <Text style={styles.required}>* required fields</Text>
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
      </KeyboardAvoidingView>
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
  registerText: {
    color: "#202124",
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 70,
  },
  headerView: {
    textAlignVertical: "top",
    marginTop: 0,
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
});

export default Register;
