import { View, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';
import SettingsModal from './SettingsModal';

import Svg, { G, Path, Text, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';


//export default function AnalogMeter({ name, value, unit='%', source}) {

   
    const AnalogMeter = ({ value,  size = 100, min=0, max=100, strokeWidth = 10, startAngle =-10, endAngle = 190, source= 'rpm' }) => {
        const start = polarToCartesian(center, center, radius, endAngle);
        const end = polarToCartesian(center, center, radius, startAngle);
      
       
    const { data, settings, isConnected, fetchMetadata, serverUrl } = useContext(SignalkContext);
    const [age,setAge] = useState(0)
    const [itemSettings,setItemSettings] = useState({})
    
    const [valuea, setValue] =useState(-99)
    const [lastUpdated, setLastUpdated] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeout, setTimeout] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [barValue, setBarValue]=useState(0)
    const [arcPath, setArcPath]=useState(0)
    const [arcValue, setArcValue]=useState(0)
    
    const [fillColor, setFillColor]=useState("#00ff00")
    

    
    const limitHigh=100
    const limitLow=13.2
    const warnLow=13
    


    // *************** svg things ***************

    const width = radius * 2 + 20;
    const height = radius + 20;
   
    const circumference = radius * Math.PI;
    


     // ******************************

    useEffect(() => {
        if (settings[source]) {
            const ls=settings[source]
            ls.source=source
            setItemSettings(ls)
            console.log("analog meter settings: "+JSON.stringify(settings[source]))
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
            setBarValue(-999)
        }
       }
       else {
        // source not found
       }
       
    }, [data])
    


  // Define the arc path directly in the render using the current barValue
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  // Convert angles from degrees to radians for SVG arc drawing
  const startRadians = ((startAngle - 90) * Math.PI) / 180.0;
  const endRadians = ((endAngle - 90) * Math.PI) / 180.0;
  const largeArcFlag = endRadians - startRadians <= Math.PI ? '0' : '1';

  // Background arc path
  const backgroundPath = describeArc(center, center, radius, startAngle, endAngle);

  // Calculate the value angle in radians based on the value
  const valueRadians = startAngle + (barValue / max) * (endAngle-startAngle);
  const valuePath = describeArc(center, center, radius, startAngle, valueRadians);


    const handleLongPress = () => {
        setModalVisible(true);
      };
    
      const saveSettings = (newSettings) => {
        // Implement logic to save the edited settings
        // This might involve updating the SignalkContext with the new settings
      };
    
      
    return (
       

        
        (data) == {} 
            ? <View></View>
            :
            <TouchableOpacity onLongPress={handleLongPress} style={{flex: 1}}>
             <View>   
            <View>


           
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <Path d={backgroundPath} fill="none" stroke="#e6e6e6" strokeWidth={strokeWidth}  strokeLinecap="round" />
        {/* Foreground arc */}
        <Path d={valuePath} fill="none" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        {/* Text for the value */}
        <Text
          x={center}
          y={center}
          fill="#ffffff"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily='futura_light'
        >
          {`${barValue.toFixed(itemSettings.decimals)} ${itemSettings.unit}`}
        </Text>
        <Text
          x={center}
          y={center+20}
          fill="#ffffff"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily='futura_light'
        >
          {`${itemSettings.label}`}
        </Text>
      </Svg>

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

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Function to describe the SVG path for an arc
  const describeArc = (x, y, radius, startAngle, endAngle, continueLine = false) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    const lineCommand = continueLine ? 'L' : 'M';

    return [
      lineCommand,
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      arcSweep,
      0,
      end.x,
      end.y,
    ].join(' ');
  };

    
export default AnalogMeter

  

