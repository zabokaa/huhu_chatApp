import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage, Send } from 'react-native-gifted-chat';

const Chat = ({ route, navigation, db }) => {
  //getting parameters from start.js
  const { name, backgroundColor, user_id} = route.params;  //include user_id
  //state initialization
  const [messages, setMessages] = useState([]);
  const loadCachedMsg = async () => {
    const cachedMsg = await AsyncStorage.getItem('messages') || '[]';
    setMessages(JSON.parse(cachedMsg));
  };
  // messge from DB
  useEffect(() => {
      const que = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const unsubMessages = onSnapshot(que, async(documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cachedMsg(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMsg();

      return () => {
        if (unsubMessages) unsubMessages();
      }
      }, []);

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

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;