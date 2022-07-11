# Wordsmith – a flashcard app for foreign language learning

# Summary

This app was created as the final project of the Northcoders bootcamp and was a collaborative effort between:
-	https://github.com/Pink-Flag
-	https://github.com/Kristinna97
-	https://github.com/mgrindrod92
-	https://github.com/nmb882003

Wordsmith allows users to view pre-made decks of vocabulary, as well as create their own lists, making use of an in-built dictionary lookup function from the Oxford Dictionaries API, eliminating the need for users to translate words themselves. Users are able to revise their flashcards at any time, and can test their knowledge and spelling of new words.

# Video demonstration

This project was designed for education and development purposes and so it cannot be guaranteed to maintained or hosted indefinitely. A demonstration of the app can be viewed at the following link: *****

# Tech stack

Firebase/Firestore: Firebase was used for user authentication, whereas a non-relational Firestore database was utilised for data storage.
React Native: The use of user context allowed user data to be created and stored
Expo: This allowed us to test the app and view changes made in real time. Android studio was also used to assist with testing.

# Node requirements

To run this app locally, you must have a node version of 16.0.0 or higher.

# Setup instructions

To run a version of this app yourself, you will need to register with Oxford Dictionaries and obtain an API key (https://developer.oxforddictionaries.com/). You will also need to obtain an API key from Firebase (https://firebase.google.com/). Finally, to view the app, you will either need to download and install Android Studio or Expo. 

After cloning the repo, create a .env file with the following information, ensuring that any ‘.env’ files are added to your ‘.gitignore’:
OXFORD_APP_ID=”<Your-ID-Here>”
OXFORD_APP_KEY=”<Your-Key-Here>”

Import the key and ID into any required file by using
Import { OXFORD_APP_ID, OXFORD_APP_KEY } from “@env”;

Finally: 
1.	Run npm i in the terminal
2.	Run expo start and use the expo app on your phone to view Wordsmith

# Additional notes

The initial application only processed translations from English to German, due to time constraints, however the implementation of additional languages from Oxford Dictionaries is possible. Furthermore, time permitting, a further form of testing – paired matching – would have been added, as well as allowing users to filter lists based on date created or by alphabetical order.
