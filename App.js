import { StyleSheet, View, TextInput, Text, Button, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';



const App = () => {
  const [text, setText] = useState('');
  const alertMyText = () => {
    Alert.alert(text);
  }

  return (
    <View style={styles.container}>      
      <TextInput 
       style={styles.textiii}
       value={text}
       onChangeText={setText}
       placeholder='Type Something Here'
     />
    <Text style={styles.textDisplay}>you wrote: {text}</Text>
    <TouchableOpacity style={styles.button} onPress={() => {
        alertMyText();
        }}
        >
          <Text>press here</Text>
    </TouchableOpacity>
    <ScrollView>
      <Text style={{fontSize:80, color:'blue'}}>too big to see at once ! scroll scroll !! </Text>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textiii: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#dd8d12',
    paddingHorizontal: 20,
    paddingBottom: 10,
  }
});

export default App; 