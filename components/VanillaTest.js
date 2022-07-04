import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Swiper from "react-native-deck-swiper";

const VanillaTest = () => {
  const navigate = useNavigate();
  const [displayBack, setDisplayBack] = useState(false);

  return (
    <View style={styles.container}>
      <Swiper
        cards={[
          { front: "GERMAN WORD FOR RIGHT", back: "ENGLISH WORD FOR RIGHT" },
          { front: "GERMAN WORD FOR TOMATO", back: "ENGLISH WORD FOR TOMATO" },
          {
            front: "GERMAN WORD FOR FLEXBOX",
            back: "ENGLISH WORD FOR FLEXBOX",
          },
          {
            front: "GERMAN WORD FOR WHAT AM I DOING WITH MY LIFE",
            back: "ENGLISH WORD FOR WHAT AM I DOING WITH MY LIFE",
          },
          { front: "I", back: "ENGLISH WORD FOR I" },
          { front: "LOVE", back: "ENGLISH WORD FOR LOVE" },
          { front: "COFFEE", back: "ENGLISH WORD FOR COFFEE" },
        ]}
        infinite={true}
        verticalSwipe={false}
        onSwipedLeft={() => {
          setDisplayBack(false);
          console.log(displayBack);
        }}
        onSwipedRight={() => {
          setDisplayBack(false);
          console.log(displayBack);
        }}
        onTapCard={(index) => {
          setDisplayBack(true);
          console.log(displayBack);
        }}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              {displayBack ? (
                <Text style={styles.text}>{card.back}</Text>
              ) : (
                <Text style={styles.text}>{card.front}</Text>
              )}
            </View>
          );
        }}
        onSwiped={(cardIndex) => {}}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        backgroundColor={"transparent"}
        stackSize={3}
      ></Swiper>
    </View>
  );
};

export default VanillaTest;

const styles = StyleSheet.create({
  container: {
    flex: 40,
    backgroundColor: "transparent",
    minWidth: "100%",
  },
  card: {
    flex: 2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
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
  // button: {
  //   backgroundColor: "#5c6784",
  //   width: "100%",
  //   padding: 15,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   minWidth: "65%",
  // },
  // buttonText: {
  //   color: "white",
  //   fontWeight: "700",
  //   fontSize: 16,
  // },
  // buttonOutline: {
  //   backgroundColor: "white",
  //   marginTop: 5,
  //   borderColor: "#5c6784",
  //   borderWidth: 2,
  // },
  // buttonOutlineText: {
  //   color: "#5c6784",
  //   fontWeight: "700",
  //   fontSize: 16,
  // },
});
