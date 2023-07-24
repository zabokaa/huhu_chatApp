import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import { uploadBytes } from 'firebase/storage';


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage }) => {
    // fetching actionSheet
    const actionSheet = useActionSheet();
    const inActionPress = () => {
 
        //defining options for displaying in actionSheet as an array:
        const options = [
            'Pick an image from the library', 'Take a picture', 'Get my location', 'Cancel'
        ]
        const cancelButtonIndex = options.length -1;      //was genau ist das nochmal ??
        actionSheet.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                  pickImage(storage);
                  return;
                case 1:
                  takePic();
                  return;
                case 2:
                  getLocation();
                default:
              }
            },
          );
        };
    
    // Pick an image from the library
    const pickImage = async (storage) => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchImageLibraryAsync();
              if (!result.canceled) {
                const imageURI = result.assets[0].uri;
                const response = await fetch(imageURI);
                const blob = await response.blob();         // convert for fireBase
                const newUploadRef = ref(storage, 'img123'); //reference for storage Cloud
                // using fireBase upload method:
                uploadBytes(newUploadRef, blob).then(async (snapshot) => {
                    console.log('upload is working !!');
                })
              } else Alert.alert("Permissions haven't been granted.");
            }
          }
     
    // Take a picture
    const takePic = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchCameraAsync();
              if (!result.canceled) {
                console.log('uploading and uploading the image occurs here');
              } else Alert.alert("Permissions haven't been granted.");
            }
          }

    // get my location:
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
          const location = await Location.getCurrentPositionAsync({});
          if (location) {
            onSend({
              location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              },
            });
          } else Alert.alert('Error occurred while fetching your location');
        } else Alert.alert('Permissions not granted');
      }

    

    return (
            <TouchableOpacity 
                style={styles.container}
                onPress={inActionPress}
            >
                <View style={[styles.wrapper, wrapperStyle]}>
                    <Text style={[styles.iconText, iconTextStyle]}>++</Text>
                </View>
            </TouchableOpacity>
          );
    }

    //styleSheet outside main func
    const styles = StyleSheet.create({
        container: {
          width: 26,
          height: 26,
          marginLeft: 10,
          marginBottom: 10,
        },
        wrapper: {
          borderRadius: 13,
          borderColor: '#b2b2b2',
          borderWidth: 2,
          flex: 1,
        },
        iconText: {
          color: '#b2b2b2',
          fontWeight: 'bold',
          fontSize: 10,
          backgroundColor: 'transparent',
          textAlign: 'center',
        },
      });
      

export default CustomActions;