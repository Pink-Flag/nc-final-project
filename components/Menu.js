import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

// top menu component

const Menu = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.userContainer}>
            <Image
              style={styles.image}
              source={{
                uri: user.photoURL,
              }}
            ></Image>
            <Text style={styles.username}>
              Hello,<Text style={styles.name}>{user.displayName}!</Text>
            </Text>
          </View>
        </>
      ) : null}

      <View style={styles.menu}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate("/");
          }}
        >
          <Text style={styles.buttonOutlineText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate(`/viewdecks`);
          }}
        >
          <Text style={styles.buttonOutlineText}>View decks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate(`/profile`);
          }}
        >
          <Text style={styles.buttonOutlineText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    height: "9%",
    position: "absolute",
    top: 40,
    padding: 0,
    minWidth: "100%",
    marginBottom: "20%",
  },
  userContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginLeft: "7%",
  },
  menu: {
    paddingRight: 0,
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: " red",
  },
  login: {
    marginLeft: "80%",
  },
  button: {
    backgroundColor: "#423250",
    width: "20%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
  },
  buttonOutline: {
    backgroundColor: "#423250",
    marginTop: 5,
    borderColor: "#F7F8FA",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 3,
  },
  username: {
    marginTop: 4,
    marginLeft: 6,
    color: "#423250",
  },
  name: {
    fontWeight: "700",
    color: "#423250",
  },
});
