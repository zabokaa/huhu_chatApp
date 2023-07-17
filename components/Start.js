import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    // user can change background color
    const [backgroundColor, setBackgroundColor] = useState('');
    // create circle around selected color button:
    const [selectedCol, setSelectedCol] = useState('');

    const handleColorChange = (color) => {
        setBackgroundColor(color);
        setSelectedCol(color);
    };


  return (
    <View style={[styles.container, {backgroundColor}]}>
        {/* <ImageBackground
            source={require('../assets/Background Image.png')}
            resizeMode='cover'
            style={styles.backgroundImage}
        > */}
            <View style={styles.titleBox}>
                <Text style={styles.title}>HUHU</Text>
            </View>

            <View style={styles.boxBack}>
                <TextInput
                    style={styles.yourName}
                    value={name}
                    onChangeText={setName}
                    placeholder='&#128100; Your Name'
                />
                <Text style={styles.chooseCol}>
                    Choose Background Color:
                </Text>
                <View style={styles.colButtonContainer}>
                    <TouchableOpacity
                        style={[styles.changeColButton, { 
                            backgroundColor: '#090C08',
                            borderWidth: selectedCol==='#090C08' ? 3:0,
                            borderColor: selectedCol==='#090C08' ? 'pink' : 'transparent',
                        }]}
                        onPress={() => handleColorChange('#090C08')}
                    />
                    <TouchableOpacity
                        style={[styles.changeColButton, { 
                            backgroundColor: '#474056',
                            borderWidth: selectedCol==='#474056' ? 3:0,
                            borderColor: selectedCol==='#474056' ? 'pink' : 'transparent'
                         }]}
                        onPress={() => handleColorChange('#474056')}
                    />
                    <TouchableOpacity
                        style={[styles.changeColButton, { 
                            backgroundColor: '#8A95A5',
                            borderWidth: selectedCol==='#8A95A5' ? 3:0,
                            borderColor: selectedCol==='#8A95A5' ? 'pink' : 'transparent'
                         }]}
                        onPress={() => handleColorChange('#8A95A5')}
                    />
                    <TouchableOpacity
                        style={[styles.changeColButton, { 
                            backgroundColor: '#B9C6AE',
                            borderWidth: selectedCol==='#B9C6AE' ? 3:0,
                            borderColor: selectedCol==='#B9C6AE' ? 'pink' : 'transparent',
                        }]}
                        onPress={() => handleColorChange('#B9C6AE')}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.chatButton} 
                    onPress={() => navigation.navigate('Chat', {name: name, backgroundColor: backgroundColor})}
                    >
                    <Text style={styles.btnText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
           
        {/* </ImageBackground>    */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',        //is default, just for structure
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBox: {
        flex: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxBack: {
        flex: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '88%',
        marginBottom: 20,
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
    colButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        marginBottom: 15,
      },
    changeColButton: {
        backgroundColor: '#090C08', 
       width: 30,
       height: 30,
       borderRadius: 15, 
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