import { StyleSheet, Text, View, TouchableOpacity, 
ScrollView } from "react-native";
import { React, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import RadioButtonRN from "radio-buttons-react-native";
import { useNavigate } from "react-router-dom";

const ViewDecks = () => {
  const [defaultLanguage, setdefaultLanguage] = useState("French");
  const [sortBy, setSortBy] = useState("French");
  const navigate = useNavigate();

  const data = [
    {
      label: "Saved decks",
    },
    {
      label: "Pre-made",
    },
  ];

 const  decks = [
    'Travel',
    'Food',
    'Greetings',
    'Animals',
  ]

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerOption}>
          <Text style={styles.containerText}>Language :</Text>
          <View style={styles.editPicker}>
            <Picker
              selectedValue={defaultLanguage}
              style={styles.inputPicker}
              onValueChange={(itemValue, itemIndex) =>
                setdefaultLanguage(itemValue)
              }
            >
              <Picker.Item label="French" value="French" />
              <Picker.Item label="German" value="German" />
              <Picker.Item label="Spanish" value="Spanish" />
            </Picker>
          </View>
        </View>
        <View style={styles.containerOption}>
          <Text style={styles.containerText}>Sort By: </Text>
          <View style={styles.editPicker}>
            <Picker
              selectedValue={sortBy}
              style={styles.inputPicker}
              onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
            >
              <Picker.Item label="Name" value="Name" />
              <Picker.Item label="Date created" value="Date Created" />
              <Picker.Item label="Number of cards" value="Number of cards" />
            </Picker>
          </View>
        </View>
        <View style={styles.containerRadio}>
        <Text style={styles.viewText}>View: </Text>
          <RadioButtonRN data={data} style={styles.radio}  selectedBtn={(e) => console.log(e)} />
        </View>
        <ScrollView style={styles.scrollContainer}>
         {decks.map((deck) => {
          return<View style={styles.deckContainer} key={deck}>
          <Text style={styles.decks}> {deck}</Text>
          <TouchableOpacity style={[styles.buttonTest, styles.buttonOutlineTest]}
           onPress={() => {
              navigate('/testing');
          }}>
          <Text style={styles.buttonOutlineTextTest}>Test</Text>
        </TouchableOpacity>
          </View>
         })}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Create a new deck</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ViewDecks;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "70%",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#5c6784",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  buttonTest: {
    backgroundColor: "#5c6784",
    width: "30%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
 
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
    fontSize: 14,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#5c6784",
    borderWidth: 2,
  },
  buttonOutlineTest: {
    backgroundColor: "white",
  
    borderColor: "#5c6784",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#5c6784",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineTextTest: {
    color: "#5c6784",
    fontWeight: "700",
    fontSize: 16,
  },
  inputPicker: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  editPicker: {
    width: "50%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
  },
  containerOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "4%",
    marginRight: 15,
  },
  viewText: {
    fontSize: 18,
    marginTop: 25,
    marginLeft: "4%",
  },
  containerText: {
    fontSize: 18,
    alignSelf: "center",
  },
  radio: {
    width: "48%",


  },
  containerRadio: {
    flexDirection: "row",
    justifyContent: "space-between",
    height:" 30%",
    marginRight: "4%"
  },
  scrollContainer: {
    height: "50%",
   
  },
  decks : {
    fontSize: 24,
    marginTop: 7,
  },
  deckContainer: {
    backgroundColor: "white",
    marginBottom: 3,
    width: "95%",
    padding: 3,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%",

  },
});
