import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, FlatList, StyleSheet } from 'react-native';
import { SignalkContext } from '../SignalkContext';
import { useSettings } from '../SettingsContext';

  
  const EditableList = ({ data, saveSettings }) => {
    const [editItemId, setEditItemId] = useState(null);
    const [editItemValue, setEditItemValue] = useState({});
  
  
    const handleSave = () => {
      // Create a new settings object with the edited item's value updated
      console.log('Before update:', data);
      
      console.log('Preparing to update with:', updatedSettings);
      const updatedSettings = { ...data, [editItemId]: editItemValue };

      console.log('After update:', updatedSettings);
      
      saveSettings(updatedSettings); // Use the saveSettings function from the context
      setEditItemId(null); // Exit edit mode
    };

    const handleEdit = (item) => {
        console.log('Editing item:', item);
        setEditItemId(item.key); // Use the original object key, not the array index
        setEditItemValue({ ...item });
      };
      

  const handleCancel = () => {
    setEditItemId(null);
  };

  const renderItem = ({ item }) => {
    const isEditing = editItemId === item.key;
    return (
      <View style={styles.itemContainer}>
       
        {isEditing ? (
            <View style={{ flexDirection : "row" }}>
            <Text style={[styles.item, {width : 150}]}>{item.key}</Text>
            <TextInput
              style={[styles.input,{width : 90}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, label: text }))}
              value={editItemValue.label}
            />
            <TextInput
               style={[styles.input,{width : 300}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, path: text }))}
              value={editItemValue.path}
            />
            <TextInput
                style={[styles.input,{width : 30}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, unit: text }))}
              value={editItemValue.unit}
            />
              <TextInput
                style={[styles.input,{width : 60}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, constant: text }))}
              value={editItemValue.constant}
            />
              <TextInput
                style={[styles.input,{width : 60}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, multiplier: text }))}
              value={editItemValue.multiplier}
            />
              <TextInput
                style={[styles.input,{width : 60}]}
              onChangeText={text => setEditItemValue(prev => ({ ...prev, decimals: text }))}
              value={editItemValue.decimals}
            />
            <Pressable style={styles.button} title="Save" onPress={handleSave} >
                <Text>Save</Text>
            </Pressable>
            <Pressable style={styles.button} title="Cancel" onPress={handleCancel} >
                <Text>Cancel</Text>
            </Pressable>
          </View>
        ) : (
            <View style={{ flexDirection : "row" }}>
                <Text style={[styles.item, {width : 150}]}>{item.key}</Text>
                <Text style={[styles.item, {width : 100}]}>{item.label}</Text>
                <Text style={[styles.item, {width : 310}]}>{item.path}</Text>
                <Text style={[styles.item, {width : 40}]}>{item.unit}</Text>
                <Text style={[styles.item, {width : 70}]}>{item.constant}</Text>
                <Text style={[styles.item, {width : 70}]}>{item.multiplier}</Text>
                <Text style={[styles.item, {width : 70}]}>{item.decimals}</Text>
            
                <Pressable style={styles.button} onPress={() => handleEdit(item)} >
                    <Text>Edit</Text>
                </Pressable>
          </View>
        )}
      </View>
    );
  };


  return (
    <FlatList
    data={Object.entries(data).map(([key, value]) => ({ key, ...value }))}
    renderItem={renderItem}
    keyExtractor={(item) => item.key}
  />
   
  );
};

export default function EditSignalKSettings() {
  const { settings, saveSettings } = useContext(SignalkContext);
  const { appSettings, saveAppSettings } = useSettings();
  
  if  (!appSettings.EditSignalKSettings )
    return <View></View>;
  
  if (!settings || Object.keys(settings).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ width: 950, height: 200, backgroundColor: '#f5f5f5', padding : 5}}>
         <View style={{flexDirection : "row"}}>
            <Text style={[styles.label, {width : 150}]}>Name</Text>
            <Text style={[styles.label, {width : 100}]}>Label</Text>
            <Text style={[styles.label, {width : 310}]}>Path</Text>
            <Text style={[styles.label, {width : 40}]}>Unit</Text>
            <Text style={[styles.label, {width : 70}]}>Constant</Text>
            <Text style={[styles.label, {width : 70}]}>Multiplier</Text>
            <Text style={[styles.label, {width : 70}]}>Decimals</Text>
        </View>
      <EditableList data={settings}  saveSettings={saveSettings}/>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 5,
    fontFamily : "futura_medium",
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
    marginLeft : 5,
    alignContent : "center",
    justifyContent : "center",
    fontWeight: 'bold',
    
    fontFamily : "futura_light",
  },
});
