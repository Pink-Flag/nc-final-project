import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDoc, addDoc, doc } from "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";

const VanillaTest = () => {
  const navigate = useNavigate();
  const { deck_id, index } = useParams();
  const [cardIndex, setCardIndex] = useState(0);
  const [deckWords, setDeckWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayBack, setDisplayBack] = useState(false);

  console.log(typeof index);

  useEffect(() => {
    setCardIndex((curr) => curr + 1);
  }, [displayBack]);

  if (Number(index) === 99) {
    useEffect(() => {
      getDoc(doc(db, "decks", deck_id)).then((querySnapshot) => {
        setDeckWords(querySnapshot.data().words);
      });
    }, []);
  } else {
    useEffect(() => {
      getDoc(doc(db, "custom_decks", deck_id)).then((querySnapshot) => {
        setDeckWords(querySnapshot.data().decks[index].words);
      });
    }, []);
  }

  if (deckWords.length !== 0) {
    return (
      <View style={styles.container}>
        {/* {loading ? (
          <Text value={loading}></Text>
        ) : (
          <Text value={loading}></Text>
        )} */}
        <Swiper
          cards={deckWords}
          infinite={true}
          verticalSwipe={false}
          onSwipedLeft={() => {
            setDisplayBack(false);
          }}
          onSwipedRight={() => {
            setDisplayBack(false);
          }}
          onSwiping={() => {
            setDisplayBack(false);
          }}
          onTapCard={(index) => {
            setDisplayBack((current) => {
              return !current;
            });
          }}
          renderCard={(card) => {
            return (
              <View key={card.word} style={styles.card}>
                {displayBack ? (
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://www.germany-insider-facts.com/images/flag-of-germany-small.jpg",
                      }}
                    />
                    <Text style={styles.text}>{card.word}</Text>
                  </View>
                ) : (
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://image.shutterstock.com/image-vector/official-uk-flag-united-kingdom-260nw-153708980.jpg",
                      }}
                    />
                    <Text style={styles.text}>{card.definition}</Text>
                  </View>
                )}
              </View>
            );
          }}
          onSwipedAll={() => {}}
          cardIndex={cardIndex}
          backgroundColor={"transparent"}
          stackSize={3}
        ></Swiper>
        {/* <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => {
                navigate("/viewdecks");
              }}
            >
              <Text style={styles.buttonOutlineText}>Return to decks</Text>
            </TouchableOpacity> */}
      </View>
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

export default VanillaTest;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
  },
  card: {
    width: "94%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    height: "80%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    bottom: 180,
    left: 260,
  },
  text: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  // card: {
  //   border: 2,
  //   backgroundColor: "white",
  //   borderWidth: 3,
  //   borderRadius: 10,
  //   padding: 25,
  //   width: "80%",
  //   marginTop: 30,
  // },
  // text: {
  //   fontSize: 24,
  //   textAlign: "center",
  //   padding: 20,
  // },
  // buttonContainer: {
  //   width: "60%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 170,
  // },
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
});
