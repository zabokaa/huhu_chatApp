import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
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

    

    return (
            <TouchableOpacity 
                style={styles.container}
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