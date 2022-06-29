import { StyleSheet, Text, View, LogBox } from "react-native";
import { NativeRouter, Link, Route } from 'react-router-native';
import { fetchUsers } from "./firebase/functions";
import { useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";

export default function App() {

  return (
    <NativeRouter>
      <View style={styles.container}>
        <link to="/" >
          <Text>Home</Text>
        </link>
        <link to="/register" >
          <Text>Register</Text>
        </link>
        <link to="/loginscreen" >
          <Text>LoginScreen</Text>
        </link>
        <link to="/viewdecks" >
          <Text>ViewDecks</Text>
        </link>
        <link to="/profile" >
          <Text>Profile</Text>
        </link>
        <link to="/individualdeck" >
          <Text>IndividualDeck</Text>
        </link>
        <link to="/enterwords" >
          <Text>EnterWords</Text>
        </link>
        <link to="/testing" >
          <Text>Testing</Text>
        </link>
        <link to="/vanillatest" >
          <Text>VanillaTest</Text>
        </link>
        <link to="/pairstest" >
          <Text>PairsTest</Text>
        </link>
        <link to="/stricttest" >
          <Text>StrictTest</Text>
        </link>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/loginscreen" component={LoginScreen} />
        <Route path="/viewdecks" component={ViewDecks} />
        <Route path="/profile" component={Profile} />
        <Route path="/individualdeck" component={IndividualDeck} />
        <Route path="/enterwords" component={EnterWords} />
        <Route path="/testing" component={Testing} />
        <Route path="/vanillatest" component={VanillaTest} />
        <Route path="/pairstest" component={PairsTest} />
        <Route path="/stricttest" component={StrictTest} />
      </View>
    </NativeRouter>
  )}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#A0EADE",
      alignItems: "center",
      justifyContent: "center",
    },
  });
