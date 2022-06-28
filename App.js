import { StyleSheet, Text, View, LogBox } from "react-native";
import { fetchUsers } from "./firebase/functions";
import { useState, useEffect } from "react";

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
