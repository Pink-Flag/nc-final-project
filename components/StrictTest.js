import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const StrictTest = () => {
  const [userGuess, setUserGuess] = useState("");
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [triesCorrect, setTriesCorrect] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState("Let's go!");
  const [answerColour, setAnswerColour] = useState("black");
  const [isEndOfDeck, setIsEndOfDeck] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { deck_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "decks", deck_id))
      .then((querySnapshot) => {
        setDeck(querySnapshot.data().words);
      })
  }, []);

  const checkWord = () => {


    if (!isEndOfDeck) {

      setDisableSubmit(true);

      if (userGuess.toLowerCase() === deck[cardIndex].word.toLowerCase()) {
        setAnswerFeedback("You got it right!");
        setTriesCorrect(current => current + 1);
        console.log(triesCorrect);
        setUserGuess("");
        if (cardIndex < deck.length - 1) setTimeout(() => {
            setAnswerFeedback("You got this!");
        }, 2500);
      } else {
        setAnswerColour("red");
        setAnswerFeedback(`The correct answer is: "${deck[cardIndex].word}"`);
        setUserGuess("");
        if (cardIndex < deck.length - 1) setTimeout(() => {
          setAnswerColour("black");
          setAnswerFeedback("Don't give up!");
        }, 2500);
      }
      if (cardIndex < deck.length - 1) {
        console.log(triesCorrect);
        setTimeout(() => {
          setCardIndex(current => current + 1),
            setDisableSubmit(false);
        }, 2000);
      } else {

        setTimeout(() => {
          setAnswerFeedback(`Deck complete. You scored ${parseInt((triesCorrect / deck.length) * 100)}%`);
          setIsEndOfDeck(true);
        }, 3000);
      }
    }
  }

  const resetDeck = () => {
    setAnswerFeedback("Practise makes perfect!");
    setCardIndex(0);
    settriesCorrect(0);
    setIsEndOfDeck(false);
    setDisableSubmit(false);
  }

  if (deck.length) {
    return (
      <>
        <View style={styles.englishContainer}>
          <Text style={styles.englishWord}>{deck[cardIndex].definition}</Text>
        </View>
        <View style={styles.progressFeedback}>
          <Text style={(answerColour === "red") ? styles.answerFeedbackRed : styles.answerFeedback}>{answerFeedback}</Text>
          <Text style={styles.progressCount}>Card {cardIndex + 1} of {deck.length}</Text>
          <Text style={styles.scoreCount}>Cards correct: {triesCorrect}</Text>
        </View>
        <View style={styles.targetContainer}>
          <TextInput style={styles.targetWord} value={userGuess} onChangeText={(input) => setUserGuess(input)} placeholder="Type here"></TextInput>
        </View>
        {isEndOfDeck ? (
          <TouchableOpacity onPress={() => resetDeck()} style={styles.submitButton}><Text style={styles.submitButtonText}>Replay deck</Text></TouchableOpacity>
        ) :
          (
            <TouchableOpacity onPress={() => {checkWord()}} disabled={(userGuess === "") ? true : disableSubmit} style={styles.submitButton}><Text style={styles.submitButtonText}>Submit</Text></TouchableOpacity>
          )}
        <TouchableOpacity style={[styles.backButton, styles.button]} onPress={() => {
          navigate(`/testing/${deck_id}`);
        }} >
          <Text style={styles.backButtonText}>Back to tests</Text>
        </TouchableOpacity>
      </>
    );
  } else {
    return <Text>Empty</Text>
  }
};

export default StrictTest;

const styles = StyleSheet.create({
  englishWord: {
    fontSize: 24
  },
  targetWord: {
    fontSize: 24
  },
  englishContainer: {
    borderWidth: 2,
    width: "70%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginTop: 25,
    marginBottom: 25
  },
  targetContainer: {
    borderWidth: 2,
    width: "70%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginTop: 25,
    marginBottom: 10
  },
  progressFeedback: {
    alignItems: "center"
  },
  answerFeedback: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 20
  },
  answerFeedbackRed: {
    color: "red",
    fontSize: 25,
    marginTop: 5,
    marginBottom: 20
  },
  progressCount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  scoreCount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },

  button: {
    backgroundColor: "white",
    width: "50%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 10
  },
  submitButton: {
    fontSize: 20,
    backgroundColor: "white",
    width: "40%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 10
  },
  backButton: {
    marginTop: 60
  },
  submitButtonText: {
    fontSize: 20
  },
  backButtonText: {
    fontSize: 20
  }

});
