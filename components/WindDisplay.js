import { View, StyleSheet, FlatList ,TouchableOpacity, sources} from 'react-native';
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

   
const WindDisplay = ({ sources,  size = 100, min=0, max=100, strokeWidth = 10, startAngle =-10, endAngle = 190, source= 'rpm' }) => {
    
       
    const { data, settings, isConnected, fetchMetadata, serverUrl, addSetting } = useContext(SignalkContext);
    const [age,setAge] = useState(0)
    
    const [itemSettings,setItemSettings] = useState({})
    const [localSettings, setLocalSettings] = useState([])
    
    const [modalVisible, setModalVisible] = useState(false);
    const [awa, setAwa]=useState(0)
    const [aws, setAws]=useState(0)
    const [speed, setSpeed]=useState(0)
    const [heading, setHeading]=useState(0)
    const [tws, setTws]=useState(0)
    const [twa, setTwa]=useState(0)
    const [cog, setCog]=useState(0)
    const [sog, setSog]=useState(0)
    const [wpd, setWpd]=useState(0)
    const [currentHeading, setCurrentHeading]=useState(0)
    const [currentspeed, setCurrentSpeed]=useState(0)
    
    
    
    useEffect(() => {
        const newSettings = {};
        let ls=[]
        sources.forEach(source => {
          if (settings[source]) {
            const vs=settings[source]
            vs.source=source
            ls.push(vs)
           // console.log("Windpanel settings: "+JSON.stringify(ls))
          } else {
            console.log(`Source ${source} not found, check your source list.`);
            addSetting(source)
          }
        });
        
        setLocalSettings(ls); // Update state with new settings object
        console.log("Windpanel settings: "+JSON.stringify(ls))
       // console.log("Windpanel settings: "+JSON.stringify(localSettings))
      }, [settings]);  // Dependency on settings and sources to re-run when either changes
    


    useEffect(() => {
        sources.forEach(source => {
            if (settings[source]) {
                const newData=getValueByPath(data,settings[source].path)
                if (newData!=null) {
                   // console.log("source "+ source)
                    if (source === "sailpanel-awa") {
                      
                        setAwa((-newData.value+settings[source].constant)*settings[source].multiplier)
                       
                     //   console.log("newData value: "+  newData.value)
                     //   console.log("awa value: "+ awa)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-aws") {
                        setAws((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-cog") {
                        setCog((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-sog") {
                        setSog((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-heading") {
                        setHeading((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-speed") {
                        setSpeed((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                    if (source=="sailpanel-dtw") {
                        setWpd((newData.value+settings[source].constant)*settings[source].multiplier)
                        setAge(newData.age)
                    }
                   
                    const trueWind = calculateTrueWind(awa, aws, cog, heading, sog, speed)
                    setTws(trueWind.trueWindSpeed)
                    setTwa(trueWind.trueWindAngle)
                   
                    const current= calculateTide(heading, cog, speed, sog)
                    setCurrentHeading(current.currentDirection)
                    setCurrentSpeed(current.currentSpeed)
                   
                }
                else {
                    
                }
            }
            else {
                // source not found
            }
        }
        )
    }, [data])
    


    // Define the arc path directly in the render using the current barValue
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;

    const handleLongPress = () => {
        setModalVisible(true);
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
                            <InnerRing value={heading}/>
                        </View>
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <OuterCircle />
                        </View>
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <Boat cx={70} cy={40}/>
                        </View>   
                       
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <CogDial value={cog}/>
                        </View>   
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <AwdDial value={awa}/>
                        </View>  
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <Laylines value={awa} tackAngle={35}/>
                        </View> 
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <TwdDial value={twa}/>
                        </View>   
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <TideArrow currentDirection={currentHeading} currentSpeed ={currentspeed} />
                        </View> 
                    
                        <View style={{position : "absolute", x : 0, y : 0}} >
                            <WaypointDirection value={wpd}/>
                        </View>        
                    </View>
                    <SettingsModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    settingsArray={localSettings} // Pass the settings array here
                    onSave={(updatedSettings) => {
                        // Implement saving logic for the updated settings array
                    }}
                    />
                </View>
           </TouchableOpacity>
           )
    }
    
export default WindDisplay

function calculateTrueWind(awa, aws, cog, heading, sog, stw) {
    const degToRad = deg => (deg * Math.PI) / 180;
    const knotsToMs = knots => knots * 0.51444;
  
    // Convert SOG and STW to m/s
    sog = knotsToMs(sog);
    stw = knotsToMs(stw);
  
    // Calculate boat velocity vector components
    let boatVelocityX = stw * Math.sin(degToRad(heading));
    let boatVelocityY = stw * Math.cos(degToRad(heading));
  
    // Calculate apparent wind vector components
    let apparentWindX = aws * Math.sin(degToRad(awa));
    let apparentWindY = aws * Math.cos(degToRad(awa));
  
    // Convert boat movement vector based on COG into the apparent wind frame
    let boatMovementX = sog * Math.sin(degToRad(cog));
    let boatMovementY = sog * Math.cos(degToRad(cog));
  
    // Calculate true wind vector components
    let trueWindX = apparentWindX + boatMovementX - boatVelocityX;
    let trueWindY = apparentWindY + boatMovementY - boatVelocityY;
  
    // Calculate true wind speed and angle
    let tws = Math.sqrt(trueWindX**2 + trueWindY**2);
    let twa = Math.atan2(trueWindX, trueWindY); // Result is in radians
  
    // Convert TWA back to degrees and adjust range
    twa = (twa * 180 / Math.PI + 360) % 360;
  
    return {
      trueWindSpeed: tws,
      trueWindAngle: twa
    };
  }

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

