import { UserContext } from "./UserContext";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { useNavigate } from "react-router-dom";

const SplashPage = ({ setIsFirstTime }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //navigate to home or login screen depending on if there is a logged in user
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsFirstTime(false);
      if (user) {
        navigate("/");
      } else {
        navigate(`/loginscreen`);
      }
    }, 5000);
  }, []);

  if (isLoading) {
    return (
      <>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../images/splash-img.png")}
          />
          <Text style={styles.mainText}>Wordsmith</Text>
          <Text style={styles.spinnerText}>Please wait while app loads</Text>
          <ActivityIndicator size="small" color="#5c6784" />
        </View>
      </>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

export default SplashPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ECEAF6",
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
  },
  spinnerText: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 25,
  },
  image: {
    width: "45%",
    height: "25%",
    resizeMode: "stretch",
  },
  mainText: {
    fontSize: 60,
    padding: 20,
  },
});
