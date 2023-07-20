import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView} from 'react-native';
import { getAuth, signInAnonymously} from 'firebase/auth';

 
const Start = ({ navigation }) => {
    // anonymous login of user:
    const signIn = () => {
        // sign in user anonymously
        signInAnonymously(auth)
          .then((result) => {
            navigation.navigate('Chat', {
              name: name,                           //from route.params
              backgroundColor: backgroundColor, 
              user_id: result.user.uid,
            });
            Alert.alert('you are signed in !');
          })
          .catch((error) => {
            Alert.alert('unable to sign in. Please try again later.');
          });
      };
    const [name, setName] = useState('');
    // user can change background color
    const [backgroundColor, setBackgroundColor] = useState('');
    // create circle around selected color button:
    const [selectedCol, setSelectedCol] = useState('');
    const handleColorChange = (color) => {
        setBackgroundColor(color);
        setSelectedCol(color);
    };


// Initalize Firebase Authentication handler
    const auth = getAuth();


  return (
    <View style={[styles.container, {backgroundColor}]}>
        <ImageBackground
            source={require('../assets/BackgroundIMG.png')}
            resizeMode='cover'
            style={styles.backgroundImage}
        >

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
                    // onPress={() => navigation.navigate('Chat', {name: name, backgroundColor: backgroundColor})}
                    onPress={ signIn }
                   >
                    <Text style={styles.btnText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>   
        {/* not showing affect */}
        { Platform.OS==='ios'?<KeyboardAvoidingView behaviour='padding' />: null}
        { Platform.OS==='android'?<KeyboardAvoidingView behaviour='height' />: null}
    </View>
  );
}

const styles = StyleSheet.create({   //OBJECT WITH PROPERTIES, THAT ARE OBJECTS ITSELVES and its validating the properties
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',        //is default, just for structure
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,          //added margins, so user can see the col change for chat view
        marginRight: 15
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
        color: 'white',
    },
    yourName: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        color: 'black',
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