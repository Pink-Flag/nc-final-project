import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { React, useState, useEffect, useContext } from "react";
import RadioButtonRN from "radio-buttons-react-native";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc, 
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "./UserContext";
import CreateDeck from "./CreateDeck";

const ViewDecks = ({
  radioState,
  setRadioState,
  buttonState,
  setButtonState,
  customDecks,
  setCustomDecks,
}) => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [defaultDecks, setDefaultDecks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    {
      label: "Default Decks",
    },
    {
      label: "Custom Decks",
    },
  ];

  //get all default decks from firestore 
  useEffect(() => {
    getDocs(collection(db, "decks")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const newDeck = {
          id: doc.id,
          data: doc.data(),
        };

        setDefaultDecks((current) => [newDeck, ...current]);
      });
    });
  }, []);

  // reference the custom decks for the logged in user 
  const customRef = doc(db, "custom_decks", user.uid);

  //get all custom decks for the logged in user 
  useEffect(() => {
    getDoc(customRef).then((querySnapshot) => {
      const queryWords = querySnapshot.data();
      setCustomDecks([...customDecks, queryWords]);
    });
  }, []);

  if (defaultDecks.length !== 0 && customDecks.length !== 0) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.containerOption}>
            <Text style={styles.containerText}>Language :</Text>
            <View style={styles.editPicker}>
              {user ? (
                <Text style={styles.language}>{user.defaultLanguage}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.containerOption}></View>
          <View style={styles.containerRadio}>
            <Text style={styles.viewText}>View: </Text>
            <RadioButtonRN
              initial={buttonState}
              data={data}
              style={styles.radio}
              selectedBtn={(e) => setRadioState(e.label)}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            {radioState === "Default Decks" && defaultDecks.length !== 0
              ? defaultDecks.map((deck) => {
                  return (
                    <View
                      style={styles.deckContainer}
                      key={deck.id + "_default"}
                    >
                      <Text style={styles.decks}> {deck.data.list_name}</Text>
                      <View style={styles.btnContainer}>
                        <TouchableOpacity
                          style={[styles.buttonTest, styles.buttonOutlineTest]}
                          onPress={() => {
                            navigate(`/testing/${deck.id}/99`);
                          }}
                        >
                          <Text style={styles.buttonOutlineTextTest}>Test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.buttonTest, styles.buttonOutlineTest]}
                          onPress={() => {
                            navigate(`/individualdeck/${deck.id}`);
                          }}
                        >
                          <Text style={styles.buttonOutlineTextTest}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              : customDecks[0].decks.map((deck, index) => {
                  return (
                    <View style={styles.deckContainer} key={index}>
                      <Text style={styles.decks}> {deck.list_name}</Text>
                      <View style={styles.btnContainer}>
                        <TouchableOpacity
                          style={[styles.buttonTest, styles.buttonOutlineTest]}
                          onPress={() => {
                            navigate(`/testing/${user.uid}/${index}/`);
                          }}
                        >
                          <Text style={styles.buttonOutlineTextTest}>Test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.buttonTest, styles.buttonOutlineTest]}
                          onPress={() => {
                            navigate(`/individualcustomdeck/${index}`);
                          }}
                        >
                          <Text style={styles.buttonOutlineTextTest}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                      style={[styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                    <CreateDeck
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      setRadioState={setRadioState}
                      setButtonState={setButtonState}
                      customDecks={customDecks}
                      setCustomDecks={setCustomDecks}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonOutlineText}>Create a new deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
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
export default ViewDecks;
const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    borderRadius: 10,
    height: "80%",
  },
  buttonContainer: {
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5C6784",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
  },
  buttonTest: {
    backgroundColor: "#5C6784",
    width: "30%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 3,
  },
  buttonWord: {
    backgroundColor: "#5C6784",
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
    borderColor: "#DCDEDF",
    borderWidth: 1,
  },
  buttonOutlineTest: {
    backgroundColor: "white",
    borderColor: "#DCDEDF",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#484848",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineTextTest: {
    color: "#5C6784",
    fontWeight: "700",
    fontSize: 16,
  },
  inputPicker: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  language: {
    fontSize: 18,
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerRadio: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: " 30%",
    marginRight: "4%",
  },
  scrollContainer: {
    height: "50%",
  },
  decks: {
    fontSize: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: "3%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: "70%",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
