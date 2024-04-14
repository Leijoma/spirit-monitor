import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SignalkConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const connect = async () => {
      try { 
        const ws = new WebSocket('ws://158.174.207.36:3000/signalk/v1/stream?subscribe=none'); // Replace with your server URL
        ws.onopen = () => setIsConnected(true);
        ws.onmessage = (event) => setData(JSON.parse(event.data));
        ws.onclose = () => setIsConnected(false);
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };

    connect();
  }, []);

  // Render connection status and data
  return (
    <View style={styles.container}>
      {isConnected ? (
        <>
          <Text>Connected to SignalK server!</Text>
          {data.length > 0 && (
            <View>
              {JSON.stringify(data)}
            </View>
          )}
        </>
      ) : (
        <Text>Connecting to SignalK server...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignalkConnection;