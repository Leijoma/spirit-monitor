import { View, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SignalkContext } from '../SignalkContext';
import { getValueByPath, calculateTimeDifference} from '../utils/pathFunctions';
import SettingsModal from './SettingsModal';

import Svg, { G, Path, Text, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Ticks from '../assets/svgDials/Ticks';
import DegreeTicks from '../assets/svgDials/DegreeTicks';
import Boat from '../assets/svgDials/Boat';
import AwdDial from '../assets/svgDials/AwdDial';
import TwdDial from '../assets/svgDials/TwdDial';

import InnerRing from '../assets/svgDials/InnerRing';
import Laylines from '../assets/svgDials/Laylines';
import WaypointDirection from '../assets/svgDials/WaypointDirection';
import CogDial from '../assets/svgDials/CogDial';
import TideArrow from '../assets/svgDials/TideArrow'

//export default function AnalogMeter({ name, value, unit='%', source}) {

   
    const WindDisplay = ({ value,  size = 100, min=0, max=100, strokeWidth = 10, startAngle =-10, endAngle = 190, source= 'rpm' }) => {
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
  const backgroundPath = describeArc(center, center, radius, 0, 359);

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

    const  OuterCircle= ({rotate}) => {
        return (
           
            <Svg height="200" width="200" viewBox="0 0 200 200"    > 
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#666666"/>
                    <stop offset="25%" stopColor="#666666"/>
                    <stop offset="50%" stopColor="#ff0000"/>
                    <stop offset="50%" stopColor="#00ff00"/>
                    <stop offset="75%" stopColor="#666666"/>
                    <stop offset="100%" stopColor="#666666"/>
                </linearGradient>
            </defs>
            {/* Static parts */}
            <Circle cx="100" cy="100" r="90" stroke="url(#linear)" strokeWidth="12"  fill="none"/>
            <Ticks  cx="100" cy="100" length={8} radius={90} strokeWidth={2} totalTicks={12}/>
            <Ticks  cx="100" cy="100" length={3} radius={90} strokeWidth={2} totalTicks={36}/>
            
           
            </Svg>
        )
    }

   
    return (
       

        
        (data) == {} 
            ? <View></View>
            :
            <TouchableOpacity onLongPress={handleLongPress} style={{flex: 1}}>
                <View>   
                    <View style={{backgroundColor : "black", height : 200, width : 200}}>
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <InnerRing value={age*15}/>
                        </View>
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <OuterCircle />
                        </View>
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <Boat cx={70} cy={40}/>
                        </View>   
                       
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <CogDial value={10}/>
                        </View>   
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <AwdDial value={age*-10}/>
                        </View>  
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <Laylines value={age*-10} tackAngle={35}/>
                        </View> 
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <TwdDial value={age*-5}/>
                        </View>   
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <TideArrow currentDirection={45} currentSpeed ={3} />
                        </View> 
                    
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <WaypointDirection value={age*12}/>
                        </View>   
                        
                        
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

    
export default WindDisplay

function calculateTide(H, COG, STW, SOG) {
    // Convert degrees to radians
    const degToRad = (deg) => deg * Math.PI / 180;

    // Calculate components
    const waterX = STW * Math.cos(degToRad(H));
    const waterY = STW * Math.sin(degToRad(H));
    const groundX = SOG * Math.cos(degToRad(COG));
    const groundY = SOG * Math.sin(degToRad(COG));

    // Calculate tide vector
    const tideX = groundX - waterX;
    const tideY = groundY - waterY;

    // Calculate current speed
    const currentSpeed = Math.sqrt(tideX * tideX + tideY * tideY);

    // Calculate current direction
    const currentDirection = Math.atan2(tideY, tideX) * 180 / Math.PI;

    return { currentSpeed, currentDirection: (currentDirection + 360) % 360 };
}

