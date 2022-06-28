// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
// import { fetchUsers } from "./firebase/functions";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function App() {
  const [users, setUsers] = useState([]);

  // const listsRef = db.collection("lists");

  // useEffect(() => {
  //   listsRef.get().then((data) => {
  //     console.log(data);
  //     console.log("hi");
  //   });
  // }, []);

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
