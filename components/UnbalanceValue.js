

import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath } from '../utils/pathFunctions';

function findBiggestDifference(a, b, c, d) {
 
// Use the Math.max and Math.min functions to find the maximum and minimum values
const maxVal = Math.max(a, c, d);
const minVal = Math.min(a, b, c, d);

// The biggest difference is the difference between the maximum and minimum
return maxVal - minVal;
}

export default function UnbalanceValue({name}) {

    const { data, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [meta,setMeta] = useState({})
    const [lipo1,setLipo1] = useState(null)
    const [lipo2,setLipo2] = useState(null)
    const [lipo3,setLipo3] = useState(null)
    const [lipo4,setLipo4] = useState(null)
    const [loaded, setLoaded] = useState(false)
    
    
    useEffect(() => {
        console.log("component loaded");
        if (serverUrl) { // Only proceed if serverUrl has a valid value
            const fetchData = async () => {
                try {
                    const metadata = await fetchMetadata("electrical.bms.lipo1.voltage");
                    setMeta(metadata);
                } catch (error) {
                    console.error("Failed to fetch metadata:", error);
                    // Handle error or setMeta to a default/error state if needed
                }
            };

            fetchData();
        } else {
            console.log("Server URL is not set yet.");
        }
      }, [])

    useEffect(() => {
       setLipo1(getValueByPath(data,"electrical.bms.lipo1.voltage"))
       setLipo2(getValueByPath(data,"electrical.bms.lipo2.voltage"))
       setLipo3(getValueByPath(data,"electrical.bms.lipo3.voltage"))
       setLipo4(getValueByPath(data,"electrical.bms.lipo4.voltage"))
       if (lipo1!=null)
         setLoaded(true)
    }, [data]); // Include fetchMetadata in the dependency array if it's expected to change, though it's likely static.
    

    return (
      (loaded == false) 
            ? <Text style={{color : "white"}}>Loading</Text>
            :
            <View style={{flexDirection : 'column', height : 50, minWidth : 75, borderWidth : 0, borderColor : "white", margin : 0, padding : 2}} > 
            <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 14 }}>{name} </Text>
            <View style={{flexDirection : 'row', alignItems  : 'flex-end' }} >
               <Text  style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  24 }}>{findBiggestDifference(lipo1.value,lipo2.value,lipo3.value,lipo4.value).toFixed(2)} </Text>
                   
                <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20, marginBottom : 2 }}>{meta.meta?.units} </Text> 
            </View>  
           
        </View>

            
        
    )
    
}

