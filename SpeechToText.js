import { Button, StyleSheet, Text, View, LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import Voice, {
    SpeechResultsEvent,
    SpeechErrorEvent,
} from "@react-native-voice/voice";

// import SpeechToText from "./SpeechToText";

export default function SpeechToText() {
    const [user, setUser] = useState(null);
    const [results, setResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        function onSpeechResults(SpeechResultsEvent) {
            setResults(SpeechResultsEvent.value = []);
        }
        function onSpeechError(SpeechErrorEvent) {
            console.error(SpeechErrorEvent);
        }
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return function cleanup() {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    async function toggleListening() {
        try {
            if (isListening) {
                await Voice.stop();
                setIsListening(false);
            } else {
                setResults([]);
                await Voice.start("en-UK");
                setIsListening(true);
            }
            // originally 'e'
        } catch (SpeechErrorEvent)  {
            // originally console.error(e)
            console.error(SpeechErrorEvent);
        }
    return (
        <View style={styles.container}>
          <Text>Press the button and start speaking.</Text>
          <Button
            title={isListening ? "Stop Recognizing" : "Start Recognizing"}
            onPress={toggleListening}
          />
          <Text>Results:</Text>
          {results.map((result, index) => {
            return <Text key={`result-${index}`}>{result}</Text>;
          })}
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
      },
    });
}
