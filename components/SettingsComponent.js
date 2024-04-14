import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SignalkContext } from '../SignalkContext';

const SettingsComponent = () => {
  const { settings, saveSettings } = useContext(SignalkContext);
  
  const solarSettings = settings.solarSettings.panelVoltage;

  // Create state for each setting
  const [path, setPath] = useState(solarSettings.path);
  const [label, setLabel] = useState(solarSettings.label);
  const [constant, setConstant] = useState(String(solarSettings.constant));
  const [multiplier, setMultiplier] = useState(String(solarSettings.multiplier));
  const [unit, setUnit] = useState(solarSettings.unit);
  const [decimals, setDecimals] = useState(String(solarSettings.decimals));
  const [timeout, setTimeoutValue] = useState(String(solarSettings.timeout));


  useEffect(() => {
    if (settings && settings.solarSettings && settings.solarSettings.panelVoltage) {
      const { panelVoltage } = settings.solarSettings;
      setPath(panelVoltage.path || '');
      setLabel(panelVoltage.label || '');
      setConstant(panelVoltage.constant || '');
      setMultiplier(panelVoltage.multiplier || '');
      setUnit(panelVoltage.unit || '');
      setDecimals(panelVoltage.decimals || '');
      setTimeoutValue(panelVoltage.timeout || '');

      // Update other states similarly...
    }
  }, [settings]); // Depend on settings

  const handleSave = () => {
    // Assuming the state for each setting attribute is directly maintained in the component's state,
    // there's no need to reference 'panelVoltageSettings' directly here.
    // Just use the state variables you've defined.
    const newSettings = {
        ...settings, // Preserve existing settings
        solarSettings: {
            ...settings.solarSettings, // Preserve existing solar settings
            panelVoltage: { // Update panelVoltage with new values from component state
                path,
                label,
                constant: parseFloat(constant), // Ensure numeric values are parsed from strings
                multiplier: parseFloat(multiplier),
                unit,
                decimals: parseInt(decimals, 10),
                timeout: parseInt(timeout, 10),
            }
        }
    };

    saveSettings(newSettings); // Persist the updated settings
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Panel Voltage Settings:</Text>
      
      <TextInput style={styles.input} value={path} onChangeText={setPath} placeholder="Path" />
      <TextInput style={styles.input} value={label} onChangeText={setLabel} placeholder="Label" />
      <TextInput style={styles.input} value={constant} onChangeText={setConstant} placeholder="Constant" keyboardType="numeric" />
      <TextInput style={styles.input} value={multiplier} onChangeText={setMultiplier} placeholder="Multiplier" keyboardType="numeric" />
      <TextInput style={styles.input} value={unit} onChangeText={setUnit} placeholder="Unit" />
      <TextInput style={styles.input} value={decimals} onChangeText={setDecimals} placeholder="Decimals" keyboardType="numeric" />
      <TextInput style={styles.input} value={timeout} onChangeText={setTimeoutValue} placeholder="Timeout" keyboardType="numeric" />
      
      <Button title="Save Settings" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5', // Set a gray background
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  }
});

export default SettingsComponent;
