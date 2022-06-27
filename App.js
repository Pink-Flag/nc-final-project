import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetchUsers } from "./firebase/functions";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      {users.map((user) => {
        return <Text key={user.name}>{user.name}</Text>;
      })}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
