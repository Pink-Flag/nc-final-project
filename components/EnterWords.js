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
import { React, useState } from "react";
import { fetchTranslation } from "../dictionary/dictionaryFunctions";

const EnterWords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTranslation = () => {
    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        app_id: "a6274974",
        app_key: "06e17db5b5ac409a0ce68f3b330a4f43",
      },
    };
    setLoading(true);

    fetch(
      `https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${searchTerm}?strictMatch=false&fields=translations`,
      params
    )
      .then((response) => response.json())
      .then((body) => {
        // console.log(
        //   "-------------",

        //   body.results[0].lexicalEntries[0].entries[0].senses[0].translations[0]
        //     .text,
        //   ": ",
        //   body.results[0].lexicalEntries[0].entries[0].senses[0].translations[0]
        //     .notes[0].text
        // );
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

  const navigate = useNavigate();
  const imagePath =
    "https://play-lh.googleusercontent.com/6w97U4A8U-adUqQxuYNUagn5UaHE_498hpgKGlAYJRRq0EMbMMPr9ik1ntKYl1PdaatT";

  return (
    <View>
      <View style={styles.englishInputContainer}>
        <View style={styles.micInputContainer}>
          <Image style={styles.image} source={{ uri: imagePath }} />
          <TextInput
            style={styles.textinput}
            placeholder="Enter word"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
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
        <View style={styles.englishWordContainer}>
          <Text style={styles.englishWord}>English word</Text>
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
        <View>
          <Text style={styles.queryText}>
            Placeholder for where word querying will take place
          </Text>
        </View>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate("/individualdeck/:deck_id");
          }}
        >
          <Text>Return to deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterWords;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textinput: {
    marginLeft: 10,
    fontSize: 20,
    borderWidth: 2,
    minWidth: "50%",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  englishInputContainer: {
    alignItems: "center",
    padding: 1,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
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
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
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
    borderWidth: 2,
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
    fontSize: 20,
  },
  englishWord: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 20,
  },
});
