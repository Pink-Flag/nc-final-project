import React from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-native-loading-spinner-overlay";
import { useState, useEffect, useContext } from "react";
import EnterWords from "./EnterWords";
import { db } from "../firebase";
import { UserContext } from "./UserContext";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// component that displays, and allows updates to, the custom deck

const IndividualCustomDeck = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // gets the custom deck from the database and sets it to the state

  useEffect(() => {
    getDoc(doc(db, "custom_decks", user.uid)).then((querySnapshot) => {
      setDeck(querySnapshot.data().decks[index]);
    });
  }, []);

  // gets the custom deck from the database, deletes the word at index, and updates the database

  const deleteWord = (index) => {
    const wordReff = doc(db, "custom_decks", user.uid);

    setDeck((current) => {
      const newWords = current.words.filter((_, i) => i !== index);
      const newDeck = { ...current, words: newWords };
      updateDoc(wordReff, newDeck).catch(function (error) {
        console.error(error.message);
      });

      return newDeck;
    });
  };

  if (deck.words) {
    return (
      <>
        <View style={styles.containera}>
          <View style={styles.deckInfo}>
            <Text style={styles.textName}>{deck.list_name}</Text>
            <Text style={styles.textLang}>🇩🇪</Text>
          </View>
          <ScrollView style={styles.scroll}>
            <View style={styles.wordContainer}>
              <View style={styles.firstLangWords}>
                <Text style={styles.lang}>English</Text>
                {deck.words.map((word) => {
                  return (
                    <Text style={styles.word} key={word.word + "_eng"}>
                      {" "}
                      {word.definition}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.foreignLangWords}>
                <Text style={styles.lang}>German</Text>
                {deck.words.map((word, index) => {
                  return (
                    <View
                      key={word.word + "_ger"}
                      style={styles.singleWordContainer}
                    >
                      <TouchableOpacity
                        style={[styles.buttonX, styles.buttonOutlineX]}
                        onPress={() => {
                          deleteWord(index);
                        }}
                      >
                        <Text style={styles.buttonOutlineTextX}>x</Text>
                      </TouchableOpacity>
                      <Text style={styles.word}> {word.word}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={[styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <EnterWords
                    deck_id={index}
                    deck={deck}
                    setDeck={setDeck}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                  />
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonOutlineText}>Add Word</Text>
            </Pressable>
          </View>
        </View>

        <View>
          {loading && (
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          )}
        </View>
      </>
    );
  } else {
    return (
      <ActivityIndicator
        size="small"
        color="#5c6784"
        style={styles.targetWord}
      />
    );
  }
};
export default IndividualCustomDeck;
const styles = StyleSheet.create({
  containera: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    height: "75%",
  },

  deckInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textName: {
    marginRight: "25%",
    fontSize: 22,
    padding: 10,
  },
  textLang: {
    marginLeft: "25%",
    fontSize: 22,
    padding: 10,
  },
  singleWordContainer: {
    flexDirection: "row",
    marginLeft: "2%",
  },
  buttonContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5C6784",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  scroll: {
    height: "60%",
  },
  buttonX: {
    backgroundColor: "#5C6784",
    width: "15%",
    height: "60%",

    borderRadius: 10,
    alignItems: "center",
  },
  buttonWord: {
    backgroundColor: "#5C6784",
    width: "35%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "35%",
    margin: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#5C6784",
  },
  buttonOutlineX: {
    backgroundColor: "#423250",
    marginTop: 5,
    borderColor: "#5C6784",
  },
  buttonOutlineText: {
    color: "#5C6784",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineTextX: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  wordContainer: {
    width: "100%",
    height: "50%",
    marginTop: "3%",
    borderRadius: 10,
    flexDirection: "row",
  },

  firstLangWords: {
    width: "50%",
    height: "100%",
  },
  foreignLangWords: {
    width: "50%",
    height: "100%",
  },
  lang: {
    fontSize: 22,
    textAlign: "center",
    padding: 15,
    textDecorationLine: "underline",
  },
  word: {
    padding: 10,
    marginLeft: "5%",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: "3%",
    marginLeft: "70%",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
