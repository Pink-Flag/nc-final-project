import { React, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import CreateDeck from "./CreateDeck";
import { useNavigate } from "react-router-dom";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

const Home = ({
  setRadioState,
  setButtonState,
  customDecks,
  setCustomDecks,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const gotoDecks = () => {
    setModalVisible(!modalVisible);
    navigate("/viewdecks");
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          {user ? (
            <Text style={styles.welcomeMessage}>
              Welcome, {user.displayName}!
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
            <Text
              style={styles.buttonOutlineText}
              onPress={() => {
                navigate(`/viewdecks`);
              }}
            >
              View existing decks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
            <Text
              style={styles.buttonOutlineText}
              onPress={() => {
                navigate(`/profile`);
              }}
            >
              View profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
              <Pressable style={[styles.buttonClose]}>
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
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
  },
  buttonContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#DCDEDF",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#423250",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5c6784",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "65%",
    margin: 25,
  },
  welcomeMessage: {
    fontSize: 20,
    padding: 30,
    color: "#423250",
    fontWeight: "700",
    marginTop: "10%",
    letterSpacing: 1,
  },
});
