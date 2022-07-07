import { StyleSheet, Text, View, LogBox } from "react-native";
import { NativeRouter, Link, Route, Routes } from "react-router-native";

import { useContext, useState, useEffect } from "react";
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
import MixedTesting from "./components/MixedTesting";
import Menu from "./components/Menu";
import IndividualCustomDeck from "./components/IndividualCustomDeck";

export default function App() {
  const [user, setUser] = useState(null);
  const [radioState, setRadioState] = useState("default");
  const [buttonState, setButtonState] = useState(1);
  const [customDecks, setCustomDecks] = useState([]);
  console.disableYellowBox = true;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NativeRouter>
        <View style={styles.container}>
          <Menu />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  radioState={radioState}
                  setRadioState={setRadioState}
                  buttonState={buttonState}
                  setButtonState={setButtonState}
                  customDecks={customDecks}
                  setCustomDecks={setCustomDecks}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/loginscreen" element={<LoginScreen />} />
            <Route path="loginscreen/:signedOut" element={<LoginScreen />} />
            <Route
              path="/viewdecks"
              element={
                <ViewDecks
                  radioState={radioState}
                  setRadioState={setRadioState}
                  buttonState={buttonState}
                  setButtonState={setButtonState}
                  customDecks={customDecks}
                  setCustomDecks={setCustomDecks}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/individualdeck/:deck_id"
              element={<IndividualDeck />}
            />
            <Route path="/enterwords" element={<EnterWords />} />
            <Route path="/testing/:deck_id" element={<Testing />} />
            <Route path="/testing/:deck_id/:index/" element={<Testing />} />
            <Route
              path="/vanillatest/:deck_id/:index"
              element={<VanillaTest />}
            />
            <Route path="/pairstest" element={<PairsTest />} />
            <Route
              path="/stricttest/:deck_id/:index"
              element={<StrictTest />}
            />
            <Route path="/mixedTesting" element={<MixedTesting />} />
            <Route
              path="/individualcustomdeck/:index"
              element={<IndividualCustomDeck />}
            />
          </Routes>
        </View>
      </NativeRouter>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  links: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
