import { fill } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Polygon, Text } from 'react-native-svg';



const TideArrow = ({ currentDirection, currentSpeed }) => {
    const translation = useRef(
        new Animated.currentDirection(0)
      ).current;

      const needlePath = `${0},${-70} ${-10},${-100} ${10},${-100}`;

      
      useEffect(() => {
        Animated.timing(translation, {
          toValue: -currentDirection,
          delay: 0,
          useNativeDriver: false,
        }).start();
      }, [value]);


      const rotateInterpolate = translation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      });

     return (
        <Animated.View
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
            <Svg height="200" width="200" viewBox="0 0 200 200"    > 
              <Polygon points={"90,120 110,120 110,80 120,80 100,70 80,80 90,80 "}  stroke={"url(#linear2)"} fill={"url(#linear2)"}/>
              <defs>
                <linearGradient id="linear3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0000ff"/>
                    <stop offset="75%" stopColor="#0000ff"/>
                    <stop offset="100%" stopColor="#000"/>
                </linearGradient>
              </defs>
            </Svg>
        </Animated.View>
      );

}

export default TideArrow;
