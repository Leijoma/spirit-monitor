//#2A4F86

import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference } from '../utils/pathFunctions';
import DigitalValue from './DigitalValue';
import DigitalValue2 from './DigitalValue2';

import RoundLed from './leds';
import { FontAwesome } from '@expo/vector-icons';
import UnbalanceValue from './UnbalanceValue';
import BatteryBar from './BatteryBar';


export default function BatteryPanel() {

    const { data, isConnected, fetchMetadata, serverUrl , settings} = useContext(SignalkContext);
    const [meta,setMeta] = useState({})
    const [value, setValue] =useState(-99)
    const [age, setAge] =useState(0)
    
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [timedout, setTimedout] = useState(false);
    const [soc, setSoc] =useState(-99)
    const [voltageHouse, setVoltageHouse] =useState(-99)
    
    
    
    const [load, setLoad] = useState(0);
    const [charge, setCharge] = useState(0);
    

    useEffect(() => {
      console.log('energyPanel created')      
     }, [])

    useEffect(() => {
        console.log('energyPanel paths updated')   
        
        // calculate currents

        // load=housecurrent-solarcurrent-chargercurrent-enginecurrent
        let charge=0 //Number(getValueByPath(data,energySettings.chargerCurrent.path))
        let sun=Number(getValueByPath(data,settings["solarCurrent"].path))
        let house=Number(getValueByPath(data,settings["houseCurrent"].path))
       //console.log("settings path: "+energySettings.houseCurrent)
      
       // console.log('current values:',charge, sun,house)
        let tempCharge=0
        let tempLoad=0
      //  console.log("charge: "+sun)
      //  console.log("load: "+house)
        
        if ((charge>-1) && (sun>-1)) {
          tempCharge=tempCharge+charge+sun
          tempLoad=house-charge-sun
        }
        else if ((charge>-1) && (sun<-1)) {
          tempCharge=tempCharge+charge
          tempLoad=house-charge
        }
        else if ((charge<-1) && (sun>-1)) {
          tempCharge=tempCharge+sun
          tempLoad=house-sun
        }
        else if ((charge<-1) && (sun<-1)) {
          tempCharge=0
          tempLoad=house
        }
        
        setCharge(tempCharge.toFixed(1))
        setLoad(tempLoad.toFixed(1))
        //let obj=getValueByPath(data,'electrical.batteries.House.capacity.stateOfCharge')
        let obj=getValueByPath(data,'navigation.courseOverGroundMagnetic')
        
        if (obj!=null) {
            setSoc(obj.value*100)
            setAge(obj.age)
        }
        else
            setSoc(0)
        obj=getValueByPath(data,'electrical.batteries.House.voltage')
        if (obj!=null) {
            setVoltageHouse(obj.value)
            setAge(obj.age)
        }
        else
            setVoltageHouse(-98)
    }, [data]);


   
    //    <View style={{flex : 1,flexDirection : 'column', height : 200, minWidth : 400, maxWidth : 430, borderWidth : 1, margin : 1, padding : 2, backgroundColor : "#2A4F86" }} > 
        
    return (
       
            <View style={{flex : 1,flexDirection : 'column', height : 200, minWidth : 400, maxWidth : 430, borderWidth : 1, margin : 1, padding : 2, backgroundColor : "#000" }} > 
                <View style={{flexDirection : 'row', justifyContent : 'space-evenly',width : "100%", borderBottomWidth : 1, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                    <DigitalValue2 source={"electricalBmsLipo1Voltage"} />
                    <DigitalValue2 source={"electricalBmsLipo2Voltage"}/>
                    <DigitalValue2 source={"houseCurrent"}/>
                </View>
                <View style={{flexDirection : 'row',  justifyContent : 'space-evenly', width : "100%", borderBottomWidth : 1, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                    <DigitalValue2 source={"electricalBmsLipo3Voltage"} />
                    <DigitalValue2 source={"electricalBmsLipo4Voltage"}/>
                    <UnbalanceValue name={"Balance diff"} />
                </View>
                <View style={{flex : 1, width : '100%',flexDirection : 'row', alignItems : 'center',  justifyContent : 'space-evenly', paddingHorizontal : 5, borderBottomWidth : 0, borderColor : "white", margin : 1, padding : 2, backgroundColor : "transparent" }} > 
                    <View  > 
                        <View style={{flexDirection : 'row', alignItems : 'center' }} >
                            <RoundLed on={getValueByPath(data,settings["bmsChargeOnOff"].path)} onColor={'green'}  offColor={'red'} />   
                            <View style={{width : 8}}/>
                            <FontAwesome name="long-arrow-right" size={24} color="white" />
                        </View>
                        <View style={{flexDirection : 'row', alignItems  : 'flex-end' }} >
                            {!timedout ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>{charge} </Text>
                                    : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>No data </Text>    
                            }
                            <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14, marginBottom : 0 }}>A</Text> 
                        </View>  
                   </View>
                   <View>
                    <BatteryBar voltageSource={"houseVoltage"} socSource={"houseSOC"}/>
                   </View>
                   <View style={{flexDirection : 'column', backgroundColor : "transparent"}} > 
                        <View style={{flexDirection : 'row', alignItems : 'center' }} >
                            <RoundLed on={getValueByPath(data,settings["bmsLoadOnOff"].path)} onColor={'green'}  offColor={'red'} />   
                            <View style={{width : 8}}/>
                            <FontAwesome name="long-arrow-right" size={24} color="white" />
                          
                        </View>
                        <View style={{flexDirection : 'row', alignItems  : 'flex-end' }} >
                                {!timedout ? <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>{load} </Text>
                                            : <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  20 }}>No data </Text>    
                                }
                                <Text style={{fontFamily: 'futura_medium' ,color : 'white',fontSize :  14, marginBottom : 0 }}>A</Text> 
                        </View>  
                   </View>
                </View>
              
               
               
            </View>
    )  
  
        
}
    
    

  

