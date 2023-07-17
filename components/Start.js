import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HUHU</Text>
      <TextInput
        style={styles.yourName}
        value={name}
        onChangeText={setName}
        placeholder='&#128100; Your Name'
      />
      <Text style={styles.chooseCol}>
        Choose Background Color:
      </Text>
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
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF'
  },
  yourName: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 50,
  },
  chooseCol:{
    width: '88%',
    fontSize: 16,
    fontWeight: 300,
    color: '#757083',
    opacity: 100,
    marginTop: 15,
    marginBottom: 15,
  },
  chatButton: {
    width: '88%',
    backgroundColor: '#757083',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF'
  }
});

export default Start;