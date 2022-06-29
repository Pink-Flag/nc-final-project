import { StyleSheet, Text, View, LogBox } from "react-native";
import { NativeRouter, Link, Route, Routes } from "react-router-native";
import { fetchUsers } from "./firebase/functions";
import { createContext, useContext, useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";
import { UserContext } from "./components/UserContext";

import Home from "./components/Home";
import IndividualDeck from "./components/IndividualDeck";
import EnterWords from "./components/EnterWords";
import PairsTest from "./components/PairsTest";
import Profile from "./components/Profile";
import StrictTest from "./components/StrictTest";
import Testing from "./components/Testing";
import VanillaTest from "./components/VanillaTest";
import ViewDecks from "./components/ViewDecks";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.links}>
            <Link to="/">
              <Text>Home</Text>
            </Link>
            <Link to="/register">
              <Text>Register</Text>
            </Link>
            <Link to="/loginscreen">
              <Text>LoginScreen</Text>
            </Link>
            <Link to="/viewdecks">
              <Text>ViewDecks</Text>
            </Link>
            <Link to="/profile">
              <Text>Profile</Text>
            </Link>
            <Link to="/individualdeck">
              <Text>IndividualDeck</Text>
            </Link>
            <Link to="/enterwords">
              <Text>EnterWords</Text>
            </Link>
            <Link to="/testing">
              <Text>Testing</Text>
            </Link>
            <Link to="/vanillatest">
              <Text>VanillaTest</Text>
            </Link>
            <Link to="/pairstest">
              <Text>PairsTest</Text>
            </Link>
            <Link to="/stricttest">
              <Text>StrictTest</Text>
            </Link>
          </View>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginscreen" element={<LoginScreen />} />
            <Route path="/viewdecks" element={<ViewDecks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/individualdeck" element={<IndividualDeck />} />
            <Route path="/enterwords" element={<EnterWords />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/vanillatest" element={<VanillaTest />} />
            <Route path="/pairstest" element={<PairsTest />} />
            <Route path="/stricttest" element={<StrictTest />} />
          </Routes>
        </View>
      </NativeRouter>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0EADE",
    alignItems: "center",
    justifyContent: "center",
  },
  links: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
