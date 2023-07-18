import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage, Send } from 'react-native-gifted-chat';


const Chat = ({ route, navigation }) => {
  //getting parameters from start.js
  const { name, backgroundColor } = route.params;
  //state initialization
  const [messages, setMessages] = useState([]);
  //settter func
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }
 
  // testing w static message
  useEffect(() => {
    setMessages([
      {
        _id: 1,        // MUST HAVE: _id, text, createdAt, user object
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'Huhu, you have entered the chat!',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

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
        textStyle={{ color: 'pink' }}
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
          user={{
            _id: 1
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