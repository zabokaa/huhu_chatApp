import { StyleSheet, View, TextInput, Text, Button, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import Start from './components/Start';
import Chat from './components/Chat';

// Creating navigator before App func
const Stack = createNativeStackNavigator();

const App = () => {             
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBZaM3PO9IhA1CqTcvAiecSYV-mf0ziV1s",
    authDomain: "huhu-d0ca8.firebaseapp.com",
    projectId: "huhu-d0ca8",
    storageBucket: "huhu-d0ca8.appspot.com",
    messagingSenderId: "781975769704",
    appId: "1:781975769704:web:3a34e6d0598fc0963ee1dd"
  };

// Initialize firebase
const app = initializeApp(firebaseConfig);
 // Initialize Cloud Firestore and get a reference to DB service
 const db = getFirestore(app);
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;