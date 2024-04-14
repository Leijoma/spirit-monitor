import Svg, { Path, Polygon, Circle } from "react-native-svg";
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';


    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
  
    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x,y,
            "L", start.x, start.y
        ].join(" ");
        
        //console.log(d);

        return d;       
    }

    function valueToAngle(max, min, value) {
        let angle=((150/(max-min))*(value-min))-75
        return angle
    }

export default function WindRose({max,min,steps,value,label, backgroundColor, limitHigh, limitLow, warnLow}) {

    

    function Dial({angle, length}) {
       // console.log('Angle: ',angle)
        let needleAngle=Number(angle)
        return (
            <Svg
            width={60}
            height={60}
            viewBox="0 0 60 60"
            >
            <g
                transform={`rotate(${angle+180} ${30} ${30})  translate(0 0) skewX(0) scale(1 1) `}>
                <Polygon points="26,45 30,42 33,45 30,15 " fill='transparent' stroke='#fff' strokeWidth={'1.5'} />       
            </g>
        </Svg>
        )
    }

    function Tick({angle}) {
       
    let tickAngle=angle
        return (
            <Svg
                width={60}
                height={60}
                viewBox="0 0 60 60"
            >
                <g
                    transform={`rotate(${tickAngle} ${30} ${30})  translate(0 0) skewX(0) scale(1 1) `}>
                    <Polygon points="30,54 30,54 30,48 30,48 " fill='#fff' stroke='#fff'  strokeWidth={'2'}/>  
                </g>
            </Svg>
        )
    }

    if (!limitHigh)
       limitHigh=max; 
    if (!limitLow)
    limitLow=min; 
    if (!warnLow)
    warnLow=limitLow; 
       
    //console.log("LimitHigh: ",limitHigh)

    //  valueToAngle(max,min,limitLow)

    return (
        <View style={{width: 45, height : 40 ,  alignItems: 'center', borderWidth : 0, borderColor : 'gray', backgroundColor : "transparent"}}>
           
            <Svg
                width={230}
                height={140}
                viewBox="0 0 60 60"
                transform= 'scale(0.8 0.8)'
            >
                <circle cx='30' cy='30' r='20' stroke="#fff" strokeWidth={'2'} fill="transparent" />
                
             
                <Tick angle={-45} />
                <Tick angle={-135} />
                <Tick angle={45} />
                <Tick angle={135} />
               

                
               
                <g fontFamily="Arial" fontSize="10" >         
                    <text  textAnchor="middle" x="30" y="7" fill="white" >
                        N
                    </text>
                    <text textAnchor="middle"  x="30" y="7" fill="white" transform="rotate(90 30 30)
                        translate(0 0)
                        skewX(0)
                        scale(1 1)">
                       E
                    </text>
                    <text textAnchor="middle"  x="30" y="7" fill="white" transform="rotate(180 30 30)
                        translate(0 0)
                        skewX(0)
                        scale(1 1)">
                       S
                    </text>
                    <text  textAnchor="middle" x="30" y="7" fill="white" transform="rotate(-90 30 30 )
        
                        translate(0 0)
                        skewX(0)
                        scale(1 1)">
                       W
                    </text>
                  
                </g>    
                <g fontFamily="Arial" fontSize="9" >   
                    <text textAnchor="middle" x="90" y="100" fill="white" >
                     
                    </text> 
                </g>        

                <Dial angle={value} /> 
            </Svg>
        </View>
    )
}

//   <Entypo name="cog" size={18} color="white"  />
           