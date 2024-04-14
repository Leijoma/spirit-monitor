import { View, Text, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';
import SettingsModal from './SettingsModal';

export default function DigitalValue2({source}) {

   
    
   
    const { data, settings, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [age,setAge] = useState(0)
    const [itemSettings,setItemSettings] = useState({})
    
    const [value, setValue] =useState(-99)
    const [lastUpdated, setLastUpdated] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);

    
    useEffect(() => {
        if (settings[source]) {
            const ls=settings[source]
            ls.source=source
            setItemSettings(ls)
            console.log("DigitalValue2 settings: "+JSON.stringify(settings[source]))
        }
        else 
            alert("Source "+source+" not found, check your source list.")
    }, [settings])

    useEffect(() => {
       
       if (settings[source]) {
        //console.log("DigitalValue2: "+itemSettings.path)
        const newData=getValueByPath(data,itemSettings.path)
        //console.log("DigitalValue2: "+newData)
        
        if (newData!=null) {
            setValue((newData.value+itemSettings.constant)*itemSettings.multiplier)
            setAge(newData.age)
            setLastUpdated(newData.timestamp)
        }
        else {
            setValue(-999)
        }
       }
       else {
        // source not found
       }
       
    }, [data])
    
   
    const handleLongPress = () => {
        setModalVisible(true);
      };
    
      const saveSettings = (newSettings) => {
        // Implement logic to save the edited settings
        // This might involve updating the SignalkContext with the new settings
      };
    
//   <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>Age: </Text>
// <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>{elapsedTime.toFixed(0)} </Text>
    // <TouchableOpacity onLongPress={handleLongPress} style={{flex: 1}}>
   // <View style={{flexDirection : 'column', height : 50, minWidth : 75, borderWidth : 0, borderColor : "white", margin : 0, padding : 2, backgroundColor : "transparent"}}>
   
    return (
       
        (data) == {} 
            ? <Text>Loading</Text>
            :
            <TouchableOpacity onLongPress={handleLongPress} style={{flex: 1}}>
            <View>
            <View style={{flexDirection : 'column', height : 50, minWidth : 75, borderWidth : 0, borderColor : "white", margin : 0, padding : 2, backgroundColor : "transparent"}} > 
                <View style={{flexDirection : "row"}}>
                    <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 14 }}>{itemSettings.label} </Text>
                    
                 
                </View>
                <View style={{flexDirection : 'row', alignItems  : 'flex-end' }} >
                    { (value==-999) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14 }}>Path not found </Text>
                    : <View>
                    {(age<=timeout) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  24 }}>{value.toFixed(itemSettings.decimals)} </Text>
                               : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14 }}>Timeout </Text>    
                      
                    }
                    </View>
                    }
                    <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20, marginBottom : 2 }}>{itemSettings.unit} </Text> 
                    <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  10, marginBottom : 2 }}>{age} </Text> 
                    
                </View>  
               
                
               
            </View>
           
            <SettingsModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            settingsArray={[itemSettings]} // Pass the settings array here
            onSave={(updatedSettings) => {
                // Implement saving logic for the updated settings array
            }}
            />
           </View>
           </TouchableOpacity>
           )
     
}
    
    

  

