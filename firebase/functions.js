/*

import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  QuerySnapshot,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase.js";
import { useState, useEffect } from "react";

export const addNewUser = (id) => {

  return addDoc(collection(db, "users")).doc(id).set({
    defaultLanguage: defaultLanguage,
    displayName: username,
    photoURL: avatarUrl,
  });
};
// //add user
// useEffect(() => {
//   addDoc(collection(db, "users"), {
//     avatar_url:
//       "https://i.guim.co.uk/img/media/127566a4cad1e561dedcae69cb501256c325a328/0_78_3500_2100/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a9f8d7c1b1d8262da9dd485ad8f0c7a3",
//     name: "gordon",
//     username: "sexy_scot1951",
//   });
// }, []);
//get all users
export const fetchUsers = () => {
  return getDocs(collection(db, "users")).then((querySnapshot) => {
    // querySnapshot.forEach((doc) => {

    // });
    return querySnapshot;
  });
};

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

    });
}, []);

//  if (users.length !== 0) {
//   return (
//     <View style={styles.container}>
//       {users.map((user) => {
//         return <Text> {user.name}</Text>;
//       })}
//       {/* <LoginScreen /> */
//     </View>
//   );
// } else {
//   return (
//     <View style={styles.container}>
//       <Text>Loading...</Text>
//     </View>
//   );
// }
//}

// //get single user
// useEffect(() => {
//   const docRef = doc(db, "users", "a4VG40pWrBH0HZCoue9z");
//   getDoc(docRef).then((docSnap) => {
//     if (docSnap.exists()) {

//     } else {
//
//     }
//   });
// }, []);

// // Filter user
// const userRef = collection(db, "users");
// const nameQuery = query(userRef, where("name", "==", "gordon"));

// useEffect(() => {
//   getDocs(nameQuery).then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {

//     });
//   });
// }, []);

// //Delete user with provided id
// const usersRef = doc(db, "users" , "89fdhs9ihdjkj");

// useEffect(() => {
//  deleteDoc(usersRef)
// }, []);
