import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import defaultAvatar from "../images/defaultAvatar.jpg";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Profile = () => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  //Initialize state variables 
  const [profilePicture, setProfilePicture] = useState(
    "https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg"
  );
  const [loading, setLoading] = useState(false);
   const [avatar, setAvatar] = useState(defaultAvatar);
  const [updatedEmail, setUpdatedEmail] = useState("");


  //set up default profile picture  for users that dont upload one
  useEffect(() => {
    if (user.photoURL !== null) {
      setProfilePicture(user.photoURL);
    }
  }, [user]);

  //reference the users table in firestore
  const dataRef = doc(db, "users", user.uid);

  //update user  profile picture
  const updateAvatar = () => {
    setLoading(true);
    updateDoc(dataRef, {
      photoURL: avatar,
    }).then(() => {
      setProfilePicture(avatar);
      setLoading(false);
    });
  };

  //signing out the user
  const signOut = () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        alert("You have been signed out");
        navigate("/loginscreen/signedOut");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const updateEmail = () => {
    // .then((res) => {})
    // .then(() => {
    //   setUser({ ...user, email: updatedEmail });
    // })
    // .catch((error) => {});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profileHeader}>Your profile</Text>
        </View>

        <View>
          <Image
            style={styles.image}
            source={{
              uri: profilePicture,
            }}
          />

          <Text style={styles.username}>{user.displayName}</Text>
        </View>

        <ScrollView>
          <View style={styles.inputView}>
            <Text> Avatar link</Text>
            <View style={styles.editTitle}>
              <TextInput
                defaultValue={user.photoURL}
                style={styles.input}
                onChangeText={(text) => setAvatar(text)}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={() => {
                  updateAvatar();
                }}
              >
                <Text style={styles.buttonOutlineText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputView}>
            <Text> Email address</Text>
            <View style={styles.editTitle}>
              <TextInput
                defaultValue={user.email}
                style={styles.input}
                onChangeText={(text) => setUpdatedEmail(text)}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={() => {
                  updateEmail();
                }}
              >
                <Text style={styles.buttonOutlineText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputView}>
            <Text> Username</Text>
            <View style={styles.editTitle}>
              <TextInput value={user.displayName} style={styles.input} />
              <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputView}>
            <Text> Password</Text>
            <View style={styles.editTitle}>
              <TextInput
                value={user.providerId}
                style={styles.input}
                secureTextEntry
              />
              <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

        
        </ScrollView>
        <View style={styles.inputView}>
          <TouchableOpacity
            style={[styles.signOutButton, styles.signOutButtonOutline]}
            onPress={() => {
              signOut();
            }}
          >
            <Text style={styles.signOutButton}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    backgroundColor: "#ECEAF6",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    height: "80%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileHeader: {
    fontSize: 24,
    padding: 15,
  },
  username: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
  },
  inputView: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "95%",
    alignSelf: "flex-start",
    justifyContent: "space-evenly",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "75%",
  },
  button: {
    backgroundColor: "#5c6784",
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
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
  editTitle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  signOutButton: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    padding: 5,
    borderRadius: 12,
    width: "80%",
    marginLeft: "10%",
  },
  signOutButtonOutline: {
    backgroundColor: "#5c6784",
    marginTop: 5,
    borderRadius: 10,
    borderColor: "#5c6784",
    borderWidth: 2,
  },
});
