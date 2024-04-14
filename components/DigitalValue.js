import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';


export default function DigitalValue({path, name}) {

   
    
   
    const { data, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [meta,setMeta] = useState({})
    const [age,setAge] = useState(0)
    
    const [value, setValue] =useState(-99)
    const [lastUpdated, setLastUpdated] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [timedout, setTimedout] = useState(false);
    
    
  


    useEffect(() => {
        //console.log("data updated "+JSON.stringify(data));
        const newData=getValueByPath(data,path)
        if (newData!=null) {
            setValue(newData.value)
            setAge(newData.age)
            //setLastUpdated(convertTimestampToDate(newData.timestamp));
           
            setLastUpdated(newData.timestamp)
        }
        else {
            setValue(-999)
        }
        
    }, [data])
    
   
    
    
//   <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>Age: </Text>
// <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 10 }}>{elapsedTime.toFixed(0)} </Text>

    return (
        (meta || data) == {} 
            ? <Text>Loading</Text>
            :
           
            <View style={{flexDirection : 'column', height : 50, minWidth : 75, borderWidth : 0, borderColor : "white", margin : 0, padding : 2, backgroundColor : "transparent"}} > 
                <View style={{flexDirection : "row"}}>
                    <Text style={{fontFamily:'futura_light' ,color : 'white',fontSize : 14 }}>{name} </Text>
                    
                 
                </View>
                <View style={{flexDirection : 'row', alignItems  : 'flex-end' }} >
                    { (value==-999) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14 }}>Path not found </Text>
                    : <View>
                    {(age<=timeout) ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  24 }}>{value.toFixed(2)} </Text>
                               : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14 }}>Timeout </Text>    
                      
                    }
                    </View>
                    }
                    <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20, marginBottom : 2 }}>{meta.meta?.units} </Text> 
                    <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  10, marginBottom : 2 }}>{age} </Text> 
                    
                </View>  
               
                
               
            </View>


        
    )
        //  <Text style={{color : "white"}}>{meta.meta?.displayName}</Text>
               
}
    
    

  

