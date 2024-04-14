import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from './SignalkContext';

function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }


export default function Komponent() {

   
    const [data,isConnected] = useContext(SignalkContext)

    useEffect(() => {
        console.log("data updated "+JSON.stringify(data));
      }, [data])


      const Item = (path, value, timestamp) => (
        <View >
          <Text >{path}</Text>
          <Text >{value}</Text>
          <Text >{timestamp}</Text>
          
        </View>
      );

    return (
     <View style={{flexDirection : 'row', height : 480, width : 800, borderWidth : 1}}>
       {data.map((path) => (
       <View style={{flexDirection : 'column', height : 75, width : 200, borderWidth : 1, margin : 1, padding : 2}} > 
        <Text>{path.path} </Text>
        <Text>{path.value} </Text>
        <Text>{formatTime(path.timestamp)}</Text>
       </View>
       
     ))}
     </View>
    )
    
}

