
import { useEffect, useState , useRef, useContext} from "react";
import { Button,  TextInput ,StyleSheet, Modal,Text, View, SafeAreaView ,TouchableHighlight } from 'react-native';
import { getValueByPath } from '../utils/pathFunctions';
import { SignalkContext } from '../SignalkContext';




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

export default function VerticalBar({name, max, min,fillColor,disabled= false, limitHigh, limitLow, warnLow, path}) {
   const { data, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
   const [barValue, setBarValue]=useState(0)

    useEffect(() => {
      let newValue=Number((getValueByPath(data,path))*100).toFixed(0)
      if (newValue<=warnLow) {
        fillColor='#F0A637'  
      }
      if (newValue<=limitLow) {
          fillColor='#F33'  
      }
      if (newValue>=limitHigh) {
          fillColor='#F33'  
        }
      setBarValue(newValue)
    }, [data]);

    if (!fillColor)
        fillColor='#0C7602'
    if (!limitHigh)
       limitHigh=max;    
    if (!limitLow)
        limitLow=min; 
    if (!warnLow)
      warnLow=limitLow; 
      
    if (barValue<=warnLow) {
        fillColor='#F0A637'  
    }

    if (barValue<=limitLow) {
        fillColor='#F33'  
    }
    if (barValue>=limitHigh) {
        fillColor='#F33'  
      }
      //console.log("LimitHigh: ",limitHigh)
//          <View style={{height: 174, width: 58, backgroundColor : '#0f0f0f',borderRadius :4, borderWidth : 1, borderColor :  '#302F2F'}}></View>
         
    return (
      
        <View style={{  flexDirection : 'column', height : 70 , alignItems: 'center', borderWidth : 0, borderColor : 'gray', backgroundColor : 'transparent'}}>
            { (barValue!=-9999) ?
            <View  style={{  flexDirection : 'row', alignItems : 'flex-end' }}>
               
                  <View style={{height: 174, width: 58, backgroundColor : '#0f0f0f',borderRadius :4, borderWidth : 1, borderColor :  'white'}}></View>
                  <View style={{position : 'absolute',marginLeft : 2, marginBottom : 2, width : 54,borderBottomLeftRadius :4, borderBottomRightRadius :4,  height :  valueToHeight(min,max,barValue/100,170), backgroundColor : fillColor }}></View>
                  <View style={{position : 'absolute', marginLeft : 0, width : 58, alignItems : 'center'}}>
                    <View style={{flexDirection : 'row', paddingBottom : 5, alignItems : 'flex-end'}}>
                        <Text style={{ fontFamily: 'futura_medium', fontSize : 20,color : 'white'}}>{barValue}</Text>
                        <Text style={{ fontFamily: 'futura_medium', fontSize : 16,color : 'white'}}> %</Text>
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
       <Text style={{ fontFamily: 'futura_light', fontSize : 14,color : 'white'}}>{name}</Text>
                   
        </View>
        
    )
}

/*
 <Tick value={min} showLabel={true}/>
                        <Tick value={(max-min)/2+min} showLabel={true} />
                        <Tick value={(max-min)/4+min} showLabel={false}/>
                        <Tick value={((max-min)/4)*3+min} showLabel={false}/>
                        
                        <Tick value={max}showLabel={true} />
                        
*/
const styles = StyleSheet.create({
input: {
    width: 100,
    height: 20,
    padding: 5,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: '#e8e8e8'
  },
  inputLabel : { 
    fontSize : 11, 
    color : 'white'},
  inputLong: {
    width: 300,
    height: 22,
    padding: 5,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: '#e8e8e8'
  },
  settingsColumn : {
    flexDirection : 'column', 
    width : 165,
    padding : 0,
  },
  buttonColumn : {
    flexDirection : 'column', 
    width : 100,
    padding : 5,
  },
  settingsRow : {
    flexDirection : 'row', 
    width : 100,
    paddingHorizontal : 5,
  },
})