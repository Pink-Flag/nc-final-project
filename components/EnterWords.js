import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { React, useState, useContext } from "react";
import { OXFORD_APP_KEY, OXFORD_APP_ID } from "@env";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  updateDoc,
  deleteField,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "./UserContext";

const EnterWords = ({
  deck_id,
  deck,
  setDeck,
  modalVisible,
  setModalVisible,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTranslation = () => {
    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        app_id: OXFORD_APP_ID,
        app_key: OXFORD_APP_KEY,
      },
    };
    setLoading(true);

    fetch(
      `https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${searchTerm}?strictMatch=false&fields=translations`,
      params
    )
      .then((response) => response.json())
      .then((body) => {
        setTranslation(
          body.results[0].lexicalEntries[0].entries[0].senses[0].translations[0]
            .text
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("word not found!");
      });
  };

  const addWord = async () => {
    getDoc(doc(db, "custom_decks", user.uid)).then((querySnapshot) => {
      const oldDeck = querySnapshot.data().decks[deck_id];

      const testSplice = querySnapshot.data();
      testSplice.decks[deck_id].words.push({
        word: translation,
        definition: searchTerm,
      });
      setDoc(doc(db, "custom_decks", user.uid), testSplice);
      setDeck(testSplice.decks[deck_id]);

      hideModal();
    });
  };

  const hideModal = () => {
    setModalVisible(!modalVisible);
  };

  const navigate = useNavigate();
  const imagePath =
    "https://play-lh.googleusercontent.com/6w97U4A8U-adUqQxuYNUagn5UaHE_498hpgKGlAYJRRq0EMbMMPr9ik1ntKYl1PdaatT";

  return (
    <View style={styles.container}>
      <View style={styles.englishInputContainer}>
        <View style={styles.micInputContainer}>
          <Image style={styles.image} source={{ uri: imagePath }} />
          <TextInput
            style={styles.textinput}
            placeholder="Enter word"
            value={searchTerm}
            onChangeText={(text) =>
              setSearchTerm(text.charAt(0).toUpperCase() + text.slice(1))
            }
          ></TextInput>
          <TouchableOpacity
            style={[styles.miniButtonOutline, styles.miniButton]}
            onPress={() => {
              fetchTranslation();
            }}
          >
            <Text style={styles.miniButtonText}>Go</Text>
          </TouchableOpacity>
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
            <>
              <Text style={styles.searchWord}>{searchTerm} :</Text>
              <Text style={styles.targetWord}>{translation}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => addWord()}
        >
          <Text style={styles.buttonText}>Add word</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterWords;

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    backgroundColor: "#ECEAF6",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    height: "85%",
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
  searchWord: {
    fontSize: 18,
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
