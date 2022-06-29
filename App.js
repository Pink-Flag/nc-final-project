import { StyleSheet, Text, View, LogBox } from "react-native";
import { fetchUsers } from "./firebase/functions";
import { useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [users, setUsers] = useState([]);

  const userArray = [];
  useEffect(() => {
    fetchUsers()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userArray.push({
            id: doc.id,
            name: doc.data().name,
            avatar_url: doc.data().avatar_url,
          });
        });
        setUsers([...userArray]);
      })
      .then(() => {
        console.log(users);
      });
  }, []);

  if (users.length !== 0) {
    return (
      <View style={styles.container}>
        {users.map((user) => {
          return <Text> {user.name}</Text>;
        })}
        {/* <LoginScreen /> */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0EADE",
    alignItems: "center",
    justifyContent: "center",
  },
});
