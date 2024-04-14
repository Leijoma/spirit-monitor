import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppState,View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignalkContext = createContext();

export const SignalkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);
  const [appInForeground, setAppInForeground] = useState(true);
  const [serverUrl, setServerUrl] = useState('');
  const [paths, setPaths] = useState([]);

  let ws;

  const processWebSocketData = (message) => {
    const timestamp = message.updates[0].timestamp; // Assuming there's always at least one update

    message.updates.forEach(update => {
        update.values.forEach(value => {
            const updateObject = {
                path: value.path,
                value: value.value,
                timestamp: timestamp
            };

            setData(currentData => {
                const existingIndex = currentData.findIndex(u => u.path === updateObject.path);

                if (existingIndex !== -1) {
                    // If the path exists, update the item at the existing index
                    const updatedData = [...currentData];
                    updatedData[existingIndex] = updateObject;
                    return updatedData; // This updatedData array has the updated item
                } else {
                    // If the path does not exist, add the new item
                    return [...currentData, updateObject]; // This spreads the old data and adds the new item
                }
            });
        });
    });
};

  
  


  const connect = async () => {
    try {
      const availablePaths = await fetchAvailablePaths();
      //console.log(availablePaths)
      if (!ws || ws.readyState !== ws.OPEN) { // Check if ws needs to be created or reconnected
       // ws = new WebSocket('ws://158.174.207.36:3000/signalk/v1/stream?subscribe=none');
        ws = new WebSocket('ws://'+serverUrl+'/signalk/v1/stream?subscribe=none');
        
       
        var login_msg ='{"requestId": "1234-45653-343454","login": {"username": "'+"magnus@leijonborg.se"+'","password": "'+'Molly123'+'"}}'
        var subscribe_msg = '{"context": "vessels.self","subscribe": [{"path": "electrical.*","period": 1000},{"path": "tanks.*","period": 1000},{"path": "electrical.bms.lipo2.*","period": 1000}]}'; // ,{"path": "*","period": 1000}
        var unsubscribe_all_msg = '{"context": "*","unsubscribe": [{"path": "*"}]}' 
       
        ws.onopen  = () => {
          setIsConnected(true)
          // connection opened
          console.log("Connected in context...");
          //setConnected(true)
          ws.send(login_msg);  // send a message
        
        };
        
       
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          //console.log(message)
          if (message.name) 
            console.log(message.name)
          else if (message.login) {
            console.log("Logged in")
            ws.send(subscribe_msg);
          }
          else 
          {
             // Update data based on message type
          // (e.g., full update, delta, subscription response)
          //  console.log("message received: "+JSON.stringify(message))
           // console.log("data received: "+JSON.stringify(data))
            processWebSocketData(message)
           // setData({ ...data, ...message });
          }
         
          
        };
        ws.onclose = () => {

          setIsConnected(false), console.log('disconnected...')
          if (appInForeground) { // Check if app is in foreground
            console.log('Reconnecting...');
            connect(); // Attempt reconnection automatically
          }
        };
        // ... rest of your connection logic
      }
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  };

  const close = async () => {
    ws.close
  }


  function replaceDotsWithSlashes(inputString) {
    return inputString.replace(/\./g, "/");
  }

  const fetchMetadata = async (path) => {
    try {
      //const response = await fetch(`${serverUrl}/signalk/v2/api/resources?type=self`, {
        //console.log("path: "+path + "  "+replaceDotsWithSlashes(path))
        const response = await fetch('http://'+serverUrl+'/signalk/v1/api/vessels/self/'+replaceDotsWithSlashes(path), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching paths: ${response.statusText}`);
      }

      const data = await response.json();
     // console.log("Extracted paths: " + extractPaths(data))
      //.log("received metadata: " + JSON.stringify(data))
      return data
      //const paths = data.entries.map((entry) => entry.path);

     
    } catch (error) {
      console.error('Error fetching paths:', error);
      return {}; // Return empty array on error
    }
  };

  function findPathsWithValue(obj, currentPath = '') {
    let paths = [];
    Object.keys(obj).forEach(key => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (key === 'value') {
         
            paths.push(currentPath);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            paths = paths.concat(findPathsWithValue(obj[key], newPath));
        }
    });
    return paths;
}

  const fetchAvailablePaths = async () => {
    try {
      //const response = await fetch(`${serverUrl}/signalk/v2/api/resources?type=self`, {
        const response = await fetch('http://'+serverUrl+'/signalk/v1/api/vessels/self', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching paths: ${response.statusText}`);
      }

      const data = await response.json();
     // console.log("Extracted paths: " + extractPaths(data))
      //console.log("Extracted paths: " + findPathsWithValue(data))
      findPathsWithValue
      //const paths = data.entries.map((entry) => entry.path);

      return paths;
    } catch (error) {
      console.error('Error fetching paths:', error);
      return []; // Return empty array on error
    }
  };

  const getServerData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem('serverData');
      if (storedData == null) {
       // alert("no server data stored");
        setServerUrl("158.174.207.36:3000"); // This will indirectly trigger the useEffect below due to the state update
      } else {
        const serverObject = JSON.parse(storedData);
        // If you wish to use the serverObject's properties, uncomment the next line
        // setServerUrl(serverObject.url + ':' + serverObject.port);
        setServerUrl("158.174.207.36:3000"); // Placeholder for actual logic
      }
    };
  
    console.log("starting?");
    loadData();
  }, []); // This useEffect is only triggered on component mount
  
  // useEffect to call connect when serverUrl changes
  useEffect(() => {
    // Ensure serverUrl is set before calling connect
    if (serverUrl) {
      console.log('Server URL is set, now connecting...');
      connect();
    }
  }, [serverUrl]); // This useEffect is triggered every time serverUrl changes
  
  // Your existing useEffect for AppState changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('Coming to the foreground');
        // Ensure reconnecting only if serverUrl is already set
        if (serverUrl) {
          connect();
        }
      } else {
        console.log('Going to the background');
        close();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      subscription.remove(); // Cleanup on component unmount
    };
  }, [serverUrl]); // Adding serverUrl as a dependency here as well, if connect/close logic depends on it
  useEffect(() => {
   
    return () => {
      if (ws) {
        close(); // Close ws on unmount
      }
      else {
        connect();
      }
    };
  }, []);

  const subscribe = (path) => {
    // Implement subscription logic with WebSocket
    // Update data on successful subscription
  };

  const unsubscribe = (path) => {
    // Implement unsubscription logic with WebSocket
    // Update data on successful unsubscription
  };

  
  return (
    <SignalkContext.Provider value={{ data, isConnected, fetchMetadata, serverUrl }}>
      {children}
    </SignalkContext.Provider>
  );
};


