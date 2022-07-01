import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigate } from "react-router-dom";

const VanillaTest = () => {

  const navigate = useNavigate();

  return (
    <>
    <View style={styles.card}>
      <Text style={styles.text}>Die Katze</Text>
      <Text style={styles.text}>plural: die Katzen</Text>
    </View>
    <View>
      <Text style={styles.text}>
        Showing card 3 of 20
      </Text>
    </View>
    <View style={styles.buttonContainer}>
    
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
             onPress={() => {
              navigate('/testing');
          }}
          >
            <Text style={styles.buttonOutlineText}>Back</Text>
          </TouchableOpacity>
      
        </View>
    </>
  );
};

export default VanillaTest;

const styles = StyleSheet.create({
  card: {
    border: 2,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    padding: 25,
    width: "80%",
    marginTop: 30,
  },
  text : {
    fontSize: 24,
    textAlign: "center",
    padding: 20,

  },
  buttonContainer: {
    width: "60%",
    justifyContent : "center",
    alignItems: "center",
    marginTop: 170,
    },
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

});

