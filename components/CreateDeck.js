import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from 'react';
import { UserContext } from "./UserContext";

const CreateDeck = () => {
    const [deckName, setDeckName] = useState("");
    const [isDeckNameChosen, setIsDeckNameChosen] = useState(false);
    const [isNewDeck, setIsNewDeck] = useState(true);

    const { route_id } = useParams();
    console.log(route_id);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.deckNameInputContainer}>
                    {!isDeckNameChosen? (
                    <TextInput style={styles.deckNameInput} value={deckName} placeholder={"New deck name"} onChangeText={(input) => setDeckName(input)} onEndEditing={()=> {
                        setIsDeckNameChosen(true)}} autoFocus={true} />
                    ) : (
                    <Text style={styles.langName}>{deckName}</Text>
                    )}
                </View>
                <View style={styles.langNameContainer}>
                    <Text style={styles.langName}>Language: Ger</Text>
                </View>
            </View>
        </>
    )
}

export default CreateDeck;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 2,
        marginTop: "20%",
        width: "100%",
        height: "80%"
    },
    deckNameInput: {
        width: "85%",
        fontSize: 20,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    deckNameInputContainer: {
        marginTop: 10,
        width: "50%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    langNameContainer: {
        marginTop: 10,
        width: "50%",
        height: "10%",
        justifyContent: "center"
    },
    langName: {
        fontSize: 20,
        textAlign: "center"

    }
})