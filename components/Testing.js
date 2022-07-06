import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Testing = () => {

  const navigate = useNavigate();
  const { deck_id } = useParams();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.testHeader}>Time to test yourself !</Text>
         
        </View>

        <View style={styles.buttonContainer}>
        <Text style={styles.testType}> Select your test type : </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => {
              navigate(`/vanillatest/${deck_id}`);
            }}
          >
            <Text style={styles.buttonOutlineText}>Vanilla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => {
              navigate(`/stricttest/${deck_id}`);
            }}
          >
            <Text style={styles.buttonOutlineText}>Strict spelling</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </>

  );
};

export default Testing;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    height:"80%",
   
  },
  testHeader: {
    fontSize: 26,
    padding: 10,
    color:"#423250",
    marginTop:"10%",
  },

  testType:{
    fontSize: 22,
    padding: 10,
    color:"#423250",
  },
  button: {
    backgroundColor: "#5c6784",
    width: "80%",
    height: "23%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
    minWidth:"80%",
 
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#5c6784",
    borderWidth: 2,
  },
  buttonOutlineText: {
    marginTop: 4,
    color: "#5c6784",
    fontWeight: "700",
    fontSize: 20,
  },
  buttonContainer: {
    height: "50%",
    marginTop: "20%",
  },
});
