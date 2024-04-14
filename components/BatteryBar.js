import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';
import SettingsModal from './SettingsModal';

export default function BatteryBar({voltageSource, socSource}) {
    const { data, settings, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [age,setAge] = useState(0)
    const [socSettings,setSocSettings] = useState({})
    const [voltageSettings,setVoltageSettings] = useState({})
    const [timeout,setTimeout]=useState(10)
    const [soc, setSoc]= useState(-99)
    const [voltage, setVoltage]= useState(-99)
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        if (settings[voltageSource] && settings[socSource]) {
            const vs=settings[voltageSource]
            vs.source=voltageSource
            setVoltageSettings(vs)
            const ss=settings[socSource]
            ss.source=socSource
            setSocSettings(ss)
            
            console.log("Battery bar  voltage settings: "+JSON.stringify(settings[voltageSource]))
            console.log("Battery bar  soc settings: "+JSON.stringify(settings[socSource]))
        }
        else 
            alert("Sources "+voltageSource +' or '+ socSource +" not found, check your source list.")
    }, [settings])

    useEffect(() => {
       
       if (settings[socSource]) {
        //console.log("Battery bar: "+socSettings.path)
        const newData=getValueByPath(data,socSettings.path)
       
        if (newData!=null) {
            //console.log("Battery bar soc settigns: "+JSON.stringify(socSettings))
            setSoc((newData.value+socSettings.constant)*socSettings.multiplier)
            setAge(newData.age)
           
        }
        else {
            setSoc(-999)
        }
       }
       else {
        // source not found
       }

       if (settings[voltageSource]) {
        //console.log("Battery bar: "+voltageSettings.path)
        const newData=getValueByPath(data,voltageSettings.path)
        if (newData!=null) {
            setVoltage((newData.value+voltageSettings.constant)*voltageSettings.multiplier)
            setAge(newData.age)
        }
        else {
            setVoltage(-999)
        }
       }
       else {
        // source not found
       }
       
    }, [data])

    const handleLongPress = () => {
        setModalVisible(true);
      };

    function valueToHeight(min, max, value, height) {
        let h=(height/(max-min))*(value-min)-2
    // let h=100
    //console.log(value ,'  ',h)
    if (h<0) 
        {h=0}
    if (h>height) 
        {h=height}
    return h
}

    return (
        <TouchableOpacity onLongPress={handleLongPress} style={{flex: 1}}>
            <View  style={{  flexDirection : 'row', alignItems : 'center',alignContent : 'center', marginHorizontal : 10 }}>
                <View style={{height: 68, width: 10, backgroundColor : '#302F2F', borderTopLeftRadius : 5, borderBottomLeftRadius : 5}}></View>
                <View style={{height: 68, width: 184, backgroundColor : '#0f0f0f', borderWidth : 1, borderColor :  '#302F2F'}}></View>
                <View style={{position : 'absolute',marginLeft : 11, height : 66, width :  valueToHeight(0,100,soc.toFixed(0),184), backgroundColor : '#0C7602' }}></View>
                <View style={{position : 'absolute', marginLeft : 0, width : 210, alignItems : 'center'}}>
                <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                    {(age<=timeout) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>{soc.toFixed(socSettings.decimals)} </Text>
                            : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>No data </Text>    
                    }
                    <Text style={{ fontFamily: 'futura_medium', fontSize : 14,color : 'white'}}> %</Text>
                </View>
                <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                    {(age<=timeout) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>{voltage.toFixed(voltageSettings.decimals)} </Text>
                            : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>No data </Text>    
                    }
                    <Text style={{ fontFamily: 'futura_medium', fontSize : 14,color : 'white'}}> V </Text>
                    <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>Age: </Text>
                    <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>{age} </Text>
                </View>    
            
                </View>
                <View style={{height: 68, width: 10, backgroundColor : '#302F2F', borderTopRightRadius : 5, borderBottomRightRadius : 5}}></View>
                <View style={{height: 18, width: 6 , backgroundColor : '#302F2F', borderTopRightRadius : 2, borderBottomRightRadius : 2, borderWidth : 0}}></View>       
            </View> 
            <SettingsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                settingsArray={[socSettings,voltageSettings]} // Pass the settings array here
                onSave={(updatedSettings) => {
                    // Implement saving logic for the updated settings array
                }}
            />
        </TouchableOpacity>
    )
} 
