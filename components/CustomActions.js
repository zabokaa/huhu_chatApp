import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, user_id }) => {
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
                  pickImage();
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

    // prep for uploading multiple pics, storing with individual naming
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${user_id}-${timeStamp}-${imageName}`;
      }
    
    // Pick an image from the library, store it and send it via chat bubble
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchImageLibraryAsync();
              if (!result.canceled) {
                const imageURI = result.assets[0].uri;
                const uniqueRefString = generateReference(imageURI);
                const response = await fetch(imageURI);
                const blob = await response.blob();         // convert for fireBase
                const newUploadRef = ref(storage, uniqueRefString); //reference for storage Cloud
                // using fireBase upload method:
                uploadBytes(newUploadRef, blob).then(async (snapshot) => {   // snapshot contains meta data
                    // // showing metadata
                    // console.log('Snapshot:', snapshot);
                    const imageURL = await getDownloadURL(snapshot.ref)
                    onSend({ image: imageURL})
                })
              } else Alert.alert('Permission not granted');
            }
          }
     
    // Take a picture + store + send in bubble
    const takePic = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchCameraAsync();
              if (!result.canceled) {
                const imageURI = result.assets[0].uri;
                const uniqueRefString = generateReference(imageURI);
                const response = await fetch(imageURI);
                const blob = await response.blob();      
                const newUploadRef = ref(storage, uniqueRefString); 
                uploadBytes(newUploadRef, blob).then(async (snapshot) => {
                const imageURL = await getDownloadURL(snapshot.ref)
                    onSend({ image: imageURL})
              })
            } else Alert.alert('Permission not granted');
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
        } else Alert.alert('Permission not granted');
      }

    

    return (
            <TouchableOpacity 
                style={styles.container}
                accessible={true}
                accessibilityLabel="add more"
                accessibilityHint="You can choose to send an image or your current location."
                accessibilityRole="button"
                onPress={inActionPress}
            >
                <View style={[styles.wrapper, wrapperStyle]}>
                    <Text style={[styles.iconText, iconTextStyle]}>+</Text>
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
          borderColor: '#000080',
          borderWidth: 2,
          flex: 1,
        },
        iconText: {
          color: '#000080',
          fontWeight: 'bold',
          fontSize: 15,
          backgroundColor: 'transparent',
          textAlign: 'center',
        },
      });
      

export default CustomActions;