import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { SignalkContext } from '../SignalkContext';
import { useSettings } from '../SettingsContext';
import DataLed from './DataLed';

const Header = () => {
  const { serverSettings, saveServerSettings } = useContext(SignalkContext);
  const { appSettings, saveAppSettings } = useSettings();
  


  useEffect(() => {
   
  }, []); // Depend on settings

  const togglePanel = () => {
        saveAppSettings({ ...appSettings, EditSignalKSettings: !appSettings.EditSignalKSettings });
    };

  return (
    <View style={styles.header}>
        <DataLed />  
        <View style={{width : 10}}></View>
        <Switch
                    value={appSettings.EditSignalKSettings}
                    onValueChange={togglePanel}
                />
    </View>
  );
};

const styles = StyleSheet.create({
  
 
  header : {
    flexDirection : "row",
    borderTopWidth : 0,
    borderColor : "white",
    paddingHorizontal : 4,
    
    alignItems: 'center',
    justifyContent: 'flex_start',
    height : 20,
    width : '100%',
    backgroundColor : '#000'
  },
});

export default Header;
