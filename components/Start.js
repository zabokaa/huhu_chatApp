import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HUHU</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Your name'
      />
      <TouchableOpacity 
        style={styles.chatButton} 
        onPress={() => navigation.navigate('Chat', {name: name})}
        >
        <Text style={styles.btnText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF'
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  chatButton: {
    width: '88%',
    backgroundColor: '#757083',
    alignItems: 'center',
    padding: 10,
    
  },
  btnText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF'
  }
});

export default Start;