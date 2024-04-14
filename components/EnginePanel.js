//#2A4F86

import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { useSettings } from '../SettingsContext';
import { getValueByPath } from '../utils/pathFunctions';
import DigitalValue from './DigitalValue';
import DigitalValue2 from './DigitalValue2';
import { engineSettings } from "../assets/config";
import RoundLed from './leds';
import { FontAwesome } from '@expo/vector-icons';
import VerticalBar2 from './VerticalBar2';



export default function EnginePanel() {

    const { settings, saveSettings } = useSettings();
    const { data, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [meta,setMeta] = useState({})
    const [value, setValue] =useState(-99)
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [timedout, setTimedout] = useState(false);
    
    
    

    useEffect(() => {
      console.log('enginePanel created')      
     }, [])

    useEffect(() => {
        //console.log('energyPanel paths updated')   
        
        // calculate currents

      
    }, [data]);

    //   <View style={{flex : 2,flexDirection : 'row', height : 200, minWidth : 190, maxWidth : 215 ,borderWidth : 1, margin : 1, padding : 2, backgroundColor : "#012C00" }} > 
          
    return (
       
            <View style={{flex : 2,flexDirection : 'row', height : 200, minWidth : 210, maxWidth : 215 ,borderWidth : 1, margin : 1, padding : 2, backgroundColor : "#000" }} > 
               
                <View style={{flexDirection : 'column', minWidth : 100, marginRight : 10}} > 
                    <View style={{flexDirection : 'row', borderBottomWidth : 1, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                        <DigitalValue2  source={"engineTemp"} />
                    
                    </View>
                    <View style={{flexDirection : 'row', width : 100, backgroundColor : "red",  borderBottomWidth : 1, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                        <DigitalValue2 source={"alternatorTemp"} />
                    
                    </View>
                    <View style={{flexDirection : 'row',  borderBottomWidth : 0, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                        <DigitalValue2  source={"rpm"} />
                    
                    </View>
                </View>
                <View>
                    <VerticalBar2 source={"tankLevelDiesel"}/>
                </View>


             
               
              
               
               
            </View>
    )  
  
        
}
    
    

  

