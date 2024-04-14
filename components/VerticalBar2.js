import { View, Text, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';
import SettingsModal from './SettingsModal';

export default function VerticalBar2({source}) {

   
    
   
    const { data, settings, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [age,setAge] = useState(0)
    const [itemSettings,setItemSettings] = useState({})
    
    const [value, setValue] =useState(-99)
    const [lastUpdated, setLastUpdated] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [barValue, setBarValue]=useState(0)
    const [fillColor, setFillColor]=useState("#00ff00")
    

    const max=100
    const limitHigh=100
    const limitLow=10
    const warnLow=20
    const min=0
  

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
            setBarValue((newData.value+itemSettings.constant)*itemSettings.multiplier)
            //console.log(barValue)
            setFillColor('#0C7602')
             if (barValue<=warnLow) {
                setFillColor('#F0A637')  
             }
            if (barValue<=limitLow) {
                setFillColor('#F33')  
              }
              if (barValue>=limitHigh) {
                setFillColor('#F33')  
                }
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
    
    function valueToHeight(min, max, value, height) {
        let h=(height*value)
       // console.log('min: ',min)
       // console.log('max: ',max)
       // console.log('Height: ',h)
       // console.log('value: ',value)
        
      // let h=100
       //console.log(value ,'  ',h)
       if (h<0) 
           {h=0}
       if (h>height) {
         h=height
        
       }

       return h
   }

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
            <View style={{  flexDirection : 'column', height : 70 , alignItems: 'center', borderWidth : 0, borderColor : 'gray', backgroundColor : 'transparent'}}>
            { (barValue!=-9999) ?
            <View  style={{  flexDirection : 'row', alignItems : 'flex-end' }}>
               
                  <View style={{height: 174, width: 58, backgroundColor : '#0f0f0f',borderRadius :4, borderWidth : 1, borderColor :  'white'}}></View>
                  <View style={{position : 'absolute',marginLeft : 2, marginBottom : 2, width : 54,borderBottomLeftRadius :4, borderBottomRightRadius :4,  height :  valueToHeight(min,max,barValue/100,170), backgroundColor : fillColor }}></View>
                  <View style={{position : 'absolute', marginLeft : 0, width : 58, alignItems : 'center'}}>
                    <View style={{flexDirection : 'row', paddingBottom : 5, alignItems : 'flex-end'}}>
                        <Text style={{ fontFamily: 'futura_medium', fontSize : 20,color : 'white'}}>{barValue.toFixed(0)}</Text>
                        <Text style={{ fontFamily: 'futura_medium', fontSize : 16,color : 'white'}}> {itemSettings.unit}</Text>
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                      
                    </View>    
                  </View>
                  
            </View> 
            :
            <View>
               
                <Text style={{color : 'white'}}>No Data</Text>
            </View>   
        }
       <Text style={{ fontFamily: 'futura_light', fontSize : 14,color : 'white'}}>{itemSettings.label}</Text>
                   
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
    
    

  

