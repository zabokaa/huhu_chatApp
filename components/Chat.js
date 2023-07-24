import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage, Send, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

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

      if (isConnected) {  
      // // then: enable Firestore network
      // enableNetwork(db);

      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      // Load cached messages from local storage
      loadCachedMsg();
      // // Disable Firestore network when offline
      // disableNetwork(db);
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

  // unable to add msg while offline:
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null; // Hide the InputToolbar when offline
    }
  };

  // adding actionSheet to input field
  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} {...props} />;         // adding onSend callback !!
  };

  // view Location in bubble
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 100,
              height: 100,
              borderRadius: 50,
              margin: 10}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

 return (
   <View style={[styles.container, { backgroundColor }]}>
       <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderDay={renderDay}
          renderSystemMessage={renderSystemMessage}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
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