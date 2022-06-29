
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setavatarUrl] = useState("");
  const [defaultLanguage, setdefaultLanguage] = useState("French");
  const auth = getAuth();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered with ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="position" >
        <View style={styles.headerView}>
          <Text style={styles.header}>Vocab</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <Text> Username</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputView}>
            <Text> Email</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputView}>
            <Text> Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
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
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleSignup();
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent : "center",
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
  }
});

export default Register;

