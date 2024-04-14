import { fill } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import Svg, { Circle, Polygon} from 'react-native-svg';



const TideArrow = ({ currentDirection, currentSpeed }) => {
    const translation = useRef(
        new Animated.Value(0)
      ).current;

      const needlePath = `${0},${-70} ${-10},${-100} ${10},${-100}`;

      
      useEffect(() => {
        Animated.timing(translation, {
          toValue: -currentDirection,
          delay: 0,
          useNativeDriver: false,
        }).start();
      }, [currentDirection, currentSpeed]);


      const rotateInterpolate = translation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      });

     return (
        <View style={{ width: 200, height: 200,flexDirection : "column", alignItems : "center", justifyContent : "center",   backgroundColor : "transparent"}}>
          
          <Animated.View
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'transparent',
              transform: [{ rotate: rotateInterpolate }],
            }}
          >
              <Svg height="200" width="200" viewBox="0 0 200 200"    > 
                <Polygon points={"95,120 105,120 105,95 112,95 100,80 88,95 95,95 "}  stroke={"url(#linear3)"} fill={"url(#linear3)"}/>
                <defs>
                  <linearGradient id="linear3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0000ff"/>
                      <stop offset="75%" stopColor="#0000ff"/>
                      <stop offset="100%" stopColor="#000"/>
                  </linearGradient>
                </defs>
              </Svg>
          </Animated.View>
          <View style={{position : "absolute", top:95, left: 0, width : 200, backgroundColor : "transparent", flexDirection : "column", alignItems : "center"}}>
            <Text style={{color : 'white'}}>8.8</Text>
          </View>
         
        </View>
      );

}

export default TideArrow;
