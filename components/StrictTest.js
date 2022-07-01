import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const StrictTest = () => {

  const [userGuess, setUserGuess] = useState("");
  const [numberOfTries, setNumberOfTries] = useState(0);

  const navigate = useNavigate();

  const word = "e.g. Table";
  const targetWord = "Tisch";

  return (
    <>
      <View style={styles.englishContainer}>
        <Text style={styles.englishWord}>{word}</Text>
      </View>
      <View>
        <Text style={styles.attemptsCount}>Number of attempts: 4</Text>
      </View>
      <View style={styles.targetContainer}>
        <TextInput style={styles.targetWord} value={userGuess} placeholder="Your response here"></TextInput>
      </View>
      <TouchableOpacity style={[styles.submitButton, styles.button]}><Text style={styles.submitButtonText}>Submit</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.backButton, styles.button]} onPress={() => {
            navigate("/testing");
          }} ><Text style={styles.backButtonText}>Back to testing</Text></TouchableOpacity>
    </>
  );
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
    margin: "20%",
    borderWidth: 2,
    width: "70%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginTop: 40,
    marginBottom: 40
  },
  targetContainer: {
    borderWidth: 2,
    width: "70%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginTop: 40,
    marginBottom: 10
  },
  attemptsCount: {
    fontSize: 20
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
    fontSize: 20
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
