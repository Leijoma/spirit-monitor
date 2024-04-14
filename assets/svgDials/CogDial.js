import { fill } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Polygon, Text } from 'react-native-svg';



const CogDial = ({ value }) => {
    const translation = useRef(
        new Animated.Value(0)
      ).current;

      const needlePath = `${0},${-70} ${-10},${-100} ${10},${-100}`;

      
      useEffect(() => {
        Animated.timing(translation, {
          toValue: -value,
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
              <Polygon points={"100,31 95,20 105,20 "} stroke={"gray"} fill={"orange"}/>
              <Polygon points={"100,29 95,40 105,40 "} stroke={"gray"} fill={"orange"}/>
            </Svg>
        </Animated.View>
      );

}

export default CogDial;
