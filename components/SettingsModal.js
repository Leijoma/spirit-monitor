
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ScrollView , Pressable} from 'react-native';
import { SignalkContext } from '../SignalkContext'; // Adjust the import path as necessary

const SettingsModal = ({ visible, onClose, settingsArray, onSave }) => {
 
    const { saveSettings, settings } = useContext(SignalkContext); // Assuming saveSettings is a method in your context to update settings
    const [editableSettings, setEditableSettings] = useState(settingsArray || []);

    // Update an individual setting's value based on user input

    const [isFirstOpen, setIsFirstOpen] = useState(true);

    useEffect(() => {
        if (visible && isFirstOpen) {
            console.log("settings array: "+JSON.stringify(settingsArray))
            setEditableSettings(settingsArray || []);
            setIsFirstOpen(false); // Reset so settings aren't re-initialized on further renders
        }
        if (!visible) {
            setIsFirstOpen(true); // Ready to re-initialize settings on next opening
        }
    }, [settingsArray, visible]);
    
  const updateSettingValue = (index, key, value) => {
    const updatedSettings = editableSettings.map((setting, idx) => {
      if (idx === index) {
        return { ...setting, [key]: value };
      }
      return setting;
    });
    setEditableSettings(updatedSettings);
  };

  const handleSave = () => {
    // Clone the current global settings to prepare for updates
    const updatedGlobalSettings = { ...settings };

    // Iterate over the editableSettings and update the global settings accordingly
    editableSettings.forEach(updatedSetting => {
        const settingKey = updatedSetting.source; // Assuming each setting has a unique 'key' property
        if (updatedGlobalSettings[settingKey]) {
            updatedGlobalSettings[settingKey] = { ...updatedGlobalSettings[settingKey], ...updatedSetting };
        }
    });

    // Save the merged settings back to the global context
    saveSettings(updatedGlobalSettings);
    onClose();
};

    /*
    const handleSave = () => {
        onSave(editedSettings);
        onClose();
    };
    */

  

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
     
        <ScrollView>
        {editableSettings.map((setting, index) => (
              <View key={index} style={{flexDirection : 'row'}}>
               
                {Object.entries(setting).map(([key, value]) => (
                  // Assuming each setting is an object with simple key-value pairs
                  <View key={key} style={styles.inputGroup}>
                    <Text style={styles.label}>{key}:</Text>
                    <TextInput
                      style={styles.input}
                      value={String(value)} // Ensure the value is a string for TextInput
                      onChangeText={(newValue) => updateSettingValue(index, key, newValue)}
                    />
                  </View>
                ))}
              </View>
            ))}
        </ScrollView>
        <View style={{flexDirection : "row"}}>
            <Pressable style={styles.button} onPress={() => handleSave()} >
                        <Text>Save</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onClose} >
                <Text>Cancel</Text>
            </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal 


 
  const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '80%', // Ensure the modal is not too tall
      },
      settingContainer: {
        flexDirection : "row",
        marginBottom: 10,
      },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0,
      backgroundColor: '#f5f5f5',
    },
    input: {
      height : 20,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 10,
     
      borderRadius: 5,
      fontFamily : "futura",
      marginRight : 10,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 0,
      fontFamily : "futura_medium",
      marginRight : 10,
    },
    item: {
      paddingVertical : 4,
      fontWeight: 'bold',
      marginBottom: 5,
      fontFamily : "futura_light",
    },
    button : {
      padding : 8,
      borderWidth : 1,
      borderRadius : 4,
      backgroundColor : "#bbbbff",
      height : 20,
      marginRight : 5,
      alignContent : "center",
      justifyContent : "center",
      fontWeight: 'bold',
      
      fontFamily : "futura_light",
    },
  });
  
