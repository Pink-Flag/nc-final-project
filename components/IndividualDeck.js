import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-native-loading-spinner-overlay";
import { useState, useEffect } from "react";
import { db } from "../firebase";
const IndividualDeck = () => {
  const { deck_id } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "decks", deck_id)).then((querySnapshot) => {
      setDeck(querySnapshot.data());
    });
  }, []);

  const deleteWord = (index) => {
    const wordReff = doc(db, "decks", deck_id);

    setDeck((current) => {
      console.log(current);
      const newWords = current.words.filter((_, i) => i !== index);
      const newDeck = { ...current, words: newWords };
      updateDoc(wordReff, newDeck).catch(function (error) {
        console.error(error.message);
      });
      console.log(deck);
      return newDeck;
    });
  };

  if (deck.words) {
    return (
      <>
        <View style={styles.containera}>
          <View style={styles.deckInfo}>
            <Text style={styles.textName}>{deck.list_name}</Text>
            <Text style={styles.textLang}>German</Text>
          </View>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => {
                navigate("/enterwords");
              }}
            >
              <Text style={styles.buttonOutlineText}>Add a new word</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => {
                navigate("/viewdecks");
              }}
            >
              <Text style={styles.buttonOutlineText}>Return to decks</Text>
            </TouchableOpacity> */}
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
    return <Text>Empty</Text>;
  }
};
export default IndividualDeck;
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
    marginLeft:"2%",
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
  buttonX: {
    backgroundColor: "#5C6784",
    width: "15%",
    height:"60%",
 
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
    borderWidth: 2,
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
    height: "70%",
    marginTop: "3%",
    borderRadius: 10,
    flexDirection: "row",
  },

  firstLangWords: {
    borderRightWidth: 1,
    width: "50%",
    height: "85%",
  },
  foreignLangWords: {
    width: "50%",
    height: "50%",
  },
  lang: {
    fontSize: 22,
    textAlign: "center",
    padding: 25,
    textDecorationLine: "underline",
  },
  word: {
    padding: 10,
    marginLeft: 5,
    fontSize: 20,
  },
});
