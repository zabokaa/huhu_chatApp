import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage, Send } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {   //incl isConnected!
  //getting parameters from start.js
  const { name, backgroundColor, user_id} = route.params;  //include user_id
  //state initialization
  const [messages, setMessages] = useState([]);
  const loadCachedMsg = async () => {
    const cachedMsg = await AsyncStorage.getItem('messages') || '[]';
    setMessages(JSON.parse(cachedMsg));
  };
  // mesg from DB or load cahed msg
  useEffect(() => {
    const loadMsg = async () => {
      if (connectionStatus.isConnected) {
    
      const que = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));  // added asynch
      const unsubMessages = onSnapshot(que, async(documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        // try-catch-func --> error handling mechanism
        try {
          await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
        } catch (error) {
          console.log('Error caching messages:', error.message);
        }

        setMessages(newMessages);
      });
      // then: enable Firestore network
      enableNetwork(db);

      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      // Load cached messages from local storage
      loadCachedMsg();
      // Disable Firestore network when offline
      disableNetwork(db);
    }
   };
    loadMsg();
      }, [isConnected]);

      //setter func
      const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
      };

  // setting name of user
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // change color of date (called day !! )
  const renderDay = (props) => {
    return <Day {...props} textStyle={{color: 'white'}}/>
  }

  //change color of bubbles:
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000080'
        },
        left: {
          backgroundColor: 'pink'
        }
      }}
    />
  }

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{ color: 'white' }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        textStyle={{ color: '#000080' }}
      />
    );
  };

 return (
   <View style={[styles.container, { backgroundColor }]}>
       <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderDay={renderDay}
          renderSystemMessage={renderSystemMessage}
          renderSend={renderSend}
          onSend={messages => onSend(messages)}    //onSend when user sends msg
          user={{                                  // added name property
             _id: user_id, title: name
          }}

        />
        {/* Keyboard avoiding for older iOS or android */}
        { Platform.OS==='ios'?<KeyboardAvoidingView behaviour='padding' />: null}
        { Platform.OS==='android'?<KeyboardAvoidingView behaviour='height' />: null}
   </View>
 );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;