import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import { useNavigate,  useParams  } from "react-router-dom";


const Testing = () => {

    const navigate = useNavigate();
    const { deck_id } = useParams();

    console.log(deck_id)
  return (
    <>
    <View>
      <Text style={styles.testHeader}>Time to test yourself !</Text>
      <Text  style={styles.testHeader}> Select your test type : </Text>
    </View>
   
    <View style={styles.buttonContainer}>
   
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
        navigate('/pairstest');
      }}
    >
       
      <Text style={styles.buttonOutlineText}>Pair matching</Text>
      
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
      onPress={() => {
        navigate('/stricttest')
      }}
    >
       
      <Text style={styles.buttonOutlineText}>Strict spelling</Text>
     
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.buttonOutline]}
      onPress={() => {
        navigate('/mixedtesting')
      }}
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
    marginTop:"20%",
    paddingBottom:10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "40%",
    marginTop: "20%",
    
    

  },
});
