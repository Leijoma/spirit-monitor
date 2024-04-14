import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SignalkContext } from '../SignalkContext';

export default function DataLed() {
  const { data } = useContext(SignalkContext);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [backgroundColor, setBackgroundColor] = useState('red'); // Initially red
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    // Update the last update time to now when data changes
   // console.log(Object.keys(data).length)
    if (Object.keys(data).length>0) {
      setLastUpdateTime(Date.now());
      //console.log(JSON.stringify(data))
     }

  }, [data]);

  useEffect(() => {
    // Check every second if it has been 10 seconds since the last update
    const checkDataUpdate = setInterval(() => {
      if (Date.now() - lastUpdateTime > 10000) { // 10 seconds
        // If more than 10 seconds have passed, stop blinking and set background to red
        setBackgroundColor('red');
        setBlink(false);
      } else {
        // If less than 10 seconds, ensure the LED is blinking green
        setBackgroundColor(blink ? '#55aa55' : '#338833');
        setBlink(true);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkDataUpdate);
  }, [lastUpdateTime, blink]);

  // Interval for blinking effect
  useEffect(() => {
    if (blink) {
      const blinkInterval = setInterval(() => {
        setBackgroundColor(currentColor => (currentColor === '#338833' ? '#55aa55' : '#338833'));
      }, 500); // Blink every 500ms
      return () => clearInterval(blinkInterval);
    }
  }, [blink]);

  return (
    <View style={[styles.container, { backgroundColor }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000', // Visual clarity
  },
});
