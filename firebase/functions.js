//get all users
useEffect(() => {
  getDocs(collection(db, "users")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  });
}, []);

//get single user
useEffect(() => {
  const docRef = doc(db, "users", "a4VG40pWrBH0HZCoue9z");
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  });
}, []);

//add user
useEffect(() => {
  addDoc(collection(db, "users"), {
    avatar_url:
      "https://i.guim.co.uk/img/media/127566a4cad1e561dedcae69cb501256c325a328/0_78_3500_2100/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a9f8d7c1b1d8262da9dd485ad8f0c7a3",
    name: "gordon",
    username: "sexy_scot1951",
  });
}, []);
