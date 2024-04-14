import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SignalkContext } from '../SignalkContext';
import { useSettings } from '../SettingsContext';

const Serversettings = () => {
  const { serverSettings, saveServerSettings } = useContext(SignalkContext);
  const { appSettings, saveAppSettings } = useSettings();
  
  const servSettings = serverSettings;
  
  // Create state for each setting
  const [url, setUrl] = useState(servSettings.url);
  const [port, setPort] = useState(servSettings.port);
  const [user, setUser] = useState(servSettings.user);
  const [pw, setPw] = useState(servSettings.password);
/*
    const [url, setUrl] = useState("192.168.1.211");
  const [port, setPort] = useState("3000");
  const [user, setUser] = useState("magnus");
  const [pw, setPw] = useState("Molly123!");
  */

  useEffect(() => {
    console.log("servSettings: "+JSON.stringify(serverSettings))
    if (servSettings.url) {
      const { ss } = servSettings;
      setUrl(serverSettings.url);
      setPort(serverSettings.port);
      setUser(servSettings.user);
      setPw(servSettings.password);
      

      // Update other states similarly...
    }
  }, [serverSettings]); // Depend on settings

  const handleSave = () => {
    // Assuming the state for each setting attribute is directly maintained in the component's state,
    // there's no need to reference 'panelVoltageSettings' directly here.
    // Just use the state variables you've defined.
    const newSettings = {
        ...servSettings, // Preserve existing settings
       url : url,
       port : port,
       user : user,
       password : pw
     }
    saveServerSettings(newSettings); // Persist the updated settings
};

  if  (!appSettings.EditSignalKSettings )
    return <View></View>;


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Server settings:</Text>
      
      <TextInput style={styles.input}  value={url} onChangeText={setUrl} placeholder="Url" />
      <TextInput style={styles.input} value={port} onChangeText={setPort} placeholder="Port" />
      <TextInput style={styles.input} value={user} onChangeText={setUser} placeholder="Username"  />
      <TextInput style={styles.input} value={pw} onChangeText={setPw} placeholder="Password" />
      
      <Button title="Save Settings" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f5f5f5', // Set a gray background
  },
  input: {
    height : 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily : "futura",
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily : "futura_medium",
  },
  button : {
    heigth : 20,
  },
});

export default Serversettings;
