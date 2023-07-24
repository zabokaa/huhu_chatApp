import { StyleSheet, View, TextInput, Text, Button, Alert, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import Start from './components/Start';
import Chat from './components/Chat';
import { getStorage } from 'firebase/storage';

// Creating navigator before App func
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {         
  // network connectivity status:
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
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
 // storage for pics
 const storage = getStorage(app);
 
  return (
    <NavigationContainer style={styles.container}> 
      <Stack.Navigator
        initialRouteName='Start'      
      >
        {/* I need both components */}
       {/* name is the title */}
        <Stack.Screen name='Home' component={Start} />     
        <Stack.Screen            //access to DB
          name='Chat'>
            {props => <Chat isConnected={connectionStatus.isConnected} storage={storage} db={db} {...props} />}
            </Stack.Screen>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
})

export default App;