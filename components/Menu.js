import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
 
} from "react-native";
import { useNavigate } from "react-router-dom";
import { useState,  useContext } from "react";
import { UserContext } from "./UserContext";

const Menu = () => {
  const navigate = useNavigate();
  const [active, setActive] =  useState(false)
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
   {user ? (
   
       <Text style={styles.username}>Hello,<Text style={styles.name}>{user.displayName}!</Text></Text>)
        :
      (<Text style={styles.login} onPress={() => {
        navigate(`/loginscreen`);
      }}>Log in </Text>)

      }
      
      <ScrollView horizontal={true} contentContainerStyle={styles.menu}>
        <TouchableOpacity
            activeOpacity={0.6}
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate(`/`);
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
          <Text style={styles.buttonOutlineText}>View Decks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate(`/enterwords`);
          }}
        >
          <Text style={styles.buttonOutlineText}>Enter words</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigate(`/profile`);
          }}
        >
          <Text style={styles.buttonOutlineText}>Profile</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  menu: {

    paddingRight: 0,
    minWidth: "100%",
    justifyContent: "space-between",
  },
  login:{
    marginLeft: "80%",
  },
  button: {
    backgroundColor: "black",
    width: "20%",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    padding:5,
  },
  buttonOutline: {
    backgroundColor: "black",
    marginTop: 5,
    borderColor: "#F7F8FA",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
    marginTop:3,
   
  },
  username:{
    marginBottom: 5,
    marginLeft: 10,
  },
  name: {
    fontWeight: "700",
 
  }
});
