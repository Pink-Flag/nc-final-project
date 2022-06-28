import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetchUsers } from "./firebase/functions";
import { useState } from "react";
import { useEffect } from "react";
import { fireDB } from "./firebase.js";
import {get} from './firebase';
import { collection } from "firebase/firestore";

export default function App() {
  const [users, setUsers] = useState([]);

  const listsRef = fireDB.collection("lists").doc('0');

  useEffect(() => {
    listsRef.get().then((data) => {
   
      console.log(data);
      console.log("hi");
    });
  }, []);
  // console.log(lists);
  //  const fetchLists = () => {
  //   return
  //  } const lists = fireDB.
  // useEffect(() => {
  //   fetchUsers()
  //     .then((data) => {
  //       setUsers(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
