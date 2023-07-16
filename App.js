import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useState } from 'react';



const App = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>      
      <TextInput 
       style={styles.textiii}
       value={text}
       onChangeText={setText}
       placeholder='Type Something Here'
     />
    <Text style={styles.textDisplay}>you wrote: {text}</Text>
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
  }
});

export default App; 