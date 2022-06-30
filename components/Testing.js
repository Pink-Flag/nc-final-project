import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeRouter, Link, Route, Routes } from "react-router-native";

const Testing = () => {
  return (
    <>
    <View>
      <Text style={styles.testHeader}>Time to test yourself !</Text>
      <Text  style={styles.testHeader}> Select your test type : </Text>
    </View>
    <View style={styles.buttonContainer}>
   
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
    >
       <Link to="/vanillatest" >
      <Text style={styles.buttonOutlineText}>Vanilla</Text>
      </Link>
    </TouchableOpacity>
  
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
    >
       <Link to="/pairstest" >
      <Text style={styles.buttonOutlineText}>Pair matching</Text>
      </Link>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
    >
       <Link to="/stricttest" >
      <Text style={styles.buttonOutlineText}>Strict spelling</Text>
      </Link>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
    >
      <Text style={styles.buttonOutlineText}>Mixed tests</Text>
    </TouchableOpacity>
  </View>
  </>
  );
};

export default Testing;

const styles = StyleSheet.create({
  testHeader :{
    fontSize : 24,
    padding:5,
  },
  button: {
    backgroundColor: "#5c6784",
    width: "45%",
    height: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin :5,
    marginLeft:11,
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
    fontSize: 20,
    marginTop:"20%"
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "40%",
    marginTop: "20%",
    
    

  },
});
