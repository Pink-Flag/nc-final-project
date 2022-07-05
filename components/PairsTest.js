import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigate } from "react-router-dom";
// import {
//   fetchDictionaryEntry,
//   fetchTranslation,
// } from "../dictionary/dictionaryFunctions";

const PairsTest = () => {
  const navigate = useNavigate();
  const words = [
    { word: "Apfel", definition: "Apple" },
    { word: "Orange", definition: "Orange" },
    { word: "Banane", definition: "Banana" },
    { word: "Tomate", definition: "Tomato" },
    { word: "Erdbeere", definition: "Strawberry" },
    { word: "Banane", definition: "Banana" },
    { word: "Tomate", definition: "Tomato" },
  ];

  return (
    <>
      <View style={styles.wordsContainer}>
        {words.map((word) => {
          return (
            <>
              <TouchableOpacity
                style={[styles.buttonWord, styles.buttonOutline]}
                key={word.word}
                onPress={() => {
                  fetchTranslation();
                }}
              >
                <Text style={styles.buttonOutlineText}>{word.word}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonWord, styles.buttonOutline]}
                key={word.definition}
              >
                <Text style={styles.buttonOutlineText}>{word.definition}</Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate("/testing");
          }}
        >
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PairsTest;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "8%",
    marginTop: "10%",
  },
  button: {
    backgroundColor: "#5c6784",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  buttonWord: {
    backgroundColor: "#5c6784",
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
    borderColor: "#5c6784",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#5c6784",
    fontWeight: "700",
    fontSize: 16,
  },
});
