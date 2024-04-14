//#2A4F86

import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath } from '../utils/pathFunctions';
import DigitalValue from './DigitalValue';
import { engineSettings } from "../assets/config";
import RoundLed from './leds';
import { FontAwesome } from '@expo/vector-icons';
import VerticalBar2 from './VerticalBar2';
import AnalogMeter from './AnalogMeter';



export default function WaterPanel() {

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

    //   <View style={{flex : 2,flexDirection : 'row', height : 200, minWidth : 190, maxWidth : 215 ,borderWidth : 1, margin : 1, padding : 2, backgroundColor : "#006278" }} > 
    
    /*

 <View style={{flex : 2,flexDirection : 'row', height : 200, minWidth : 190, maxWidth : 215 ,borderWidth : 1, margin : 1, padding : 2, backgroundColor : "black" }} > 
                <View style={{flexDirection : 'column', minWidth : 100, marginRight : 10}} > 
                    <VerticalBar2 source={"tankLevelWaterSB"} />
                </View>
                <View>
                    <VerticalBar2 source={"tankLevelWaterP"} />
                </View>
            </View>
    )  

    */
    return (
       
            <View style={{flex : 2,flexDirection : 'column', height : 200, minWidth : 190, maxWidth : 215 ,borderWidth : 1, margin : 1, padding : 2, backgroundColor : "black" }} > 
                <View style={{flexDirection : 'column', minWidth : 100, marginRight : 10}} > 
                  
                   <AnalogMeter source={"tankLevelWaterSB"}  max={100} min={0} />
                </View>
                <View>
                   <AnalogMeter source={"tankLevelWaterP"} max={100} min={0}/>
                </View>
            </View>
    )  
  
        
}
    
    

  

