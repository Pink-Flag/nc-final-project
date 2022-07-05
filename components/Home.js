import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { React, useContext } from "react";
import { Link } from "react-router-native";
import { UserContext } from "./UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <><View style={styles.container}>
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
    height:"80%",
   
  },
  buttonContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",

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
    fontWeight :"700",
    marginTop: "10%",
    
  },
});
