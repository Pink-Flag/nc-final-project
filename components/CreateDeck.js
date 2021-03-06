import { useNavigate } from "react-router-dom";
import { React, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Picker } from "@react-native-picker/picker";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

// this the component that creates new custom decks by user id

const CreateDeck = ({
  modalVisible,
  setModalVisible,
  setButtonState,
  setCustomDecks,
}) => {
  const [deckName, setDeckName] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("DE_GB");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // pulls all custom decks from firestore under a user ID then updates database and state with these plus the new deck

  const createDBDeck = async () => {
    const deckRef = doc(db, "custom_decks", user.uid);
    const newDeck = {
      list_name: deckName,
      language: language,
      words: [],
      user: user.uid,
    };

    getDoc(deckRef).then((querySnapshot) => {
      const oldDecks = querySnapshot.data().decks;
      const newDecks = [...oldDecks, newDeck];
      setCustomDecks([{ decks: newDecks }]);
      updateDoc(deckRef, { decks: newDecks });
    });
    setModalVisible(!modalVisible);
    setButtonState(2);
  };

  // checks if user has any custom decks and if not, creates a new entry in the database

  const deckCheck = async () => {
    const docCheck = await getDoc(doc(db, "custom_decks", user.uid));
    if (docCheck.data()) {
      createDBDeck();
    } else {
      await setDoc(doc(db, "custom_decks", user.uid), { decks: [] });
      createDBDeck();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.englishInputContainer}>
        <View style={styles.micInputContainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Name of Deck"
            value={deckName}
            onChangeText={(text) =>
              setDeckName(text.charAt(0).toUpperCase() + text.slice(1))
            }
          ></TextInput>
        </View>
      </View>
      <View style={styles.inputView}>
        <View style={styles.options}>
          <Text> I want to learn</Text>
          <View style={styles.editPicker}>
            <Picker
              selectedValue={language}
              style={styles.inputPicker}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
            >
              <Picker.Item label="German" value="DE_GB" />
              <Picker.Item label="French" value="FR_GB" />
              <Picker.Item label="Spanish" value="ES_GB" />
            </Picker>
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.required}>* required fields</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => deckCheck()}
            >
              <Text style={styles.buttonText}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.targetOutputContainer}>
        <View>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#5c6784"
              style={styles.targetWord}
            />
          ) : (
            <Text style={styles.targetWord}>{translation}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateDeck;

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    backgroundColor: "#ECEAF6",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
  },
  btnContainer: {
    marginTop: "35%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textinput: {
    marginLeft: 10,
    fontSize: 20,
    minWidth: "50%",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  englishInputContainer: {
    alignItems: "center",
    padding: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: "15%",
  },
  englishWordContainer: {
    alignItems: "center",
  },
  options: {
    marginTop: "20%",
  },
  micInputContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
  },
  targetOutputContainer: {
    alignItems: "center",
    marginTop: "20%",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  miniButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 10,
    width: "15%",
  },
  miniButtonText: {
    fontSize: 20,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderColor: "#5c6784",
  },
  miniButtonOutline: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
  },
  queryText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  targetWord: {
    fontSize: 32,
    marginBottom: "55%",
    fontWeight: "700",
  },
  englishWord: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 20,
  },
  buttonText: {
    color: "#423250",
    fontWeight: "700",
    fontSize: 16,
  },
});
