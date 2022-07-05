import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { React, useContext } from "react";
import { Link } from "react-router-native";
import { UserContext } from "./UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
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
          <Link to="/individualdeck">
            <Text style={styles.buttonOutlineText}>Create new deck</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Link to="/viewdecks">
            <Text style={styles.buttonOutlineText}>View existing decks</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Link to="/profile">
            <Text style={styles.buttonOutlineText}>View profile</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
    color: "#484848",
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
    padding: 15,
  },
});
