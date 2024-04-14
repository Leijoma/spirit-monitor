



import React, { useState, useEffect, useContext } from 'react';
import { AppState,View, Text, StyleSheet } from 'react-native';

//import SignalkContext from './SignalkContext';


const SignalkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useContext([]);
  const [appInForeground, setAppInForeground] = useState(true);
  const [serverUrl, setServerUrl] = useState('');
  const [paths, setPaths] = useState([]);

  let ws;

  const processWebSocketData = (message) => {
   // const message = JSON.parse(data); // Assuming data is a JSON string
    const timestamp = message.updates[0].timestamp; // Assuming there's always at least one update

    message.updates.forEach(update => {
        update.values.forEach(value => {
            const updateObject = {
                path: value.path,
                value: value.value,
                timestamp: timestamp
            };
          //  console.log(updateObject)
           
            const existingIndex = data.findIndex(u => u.path === updateObject.path);
          //  console.log("index: "+existingIndex)

            if (existingIndex !== -1) {
                console.log("index: "+existingIndex+ " "+JSON.stringify(updateObject))
                const updatedUpdates = data;
                updatedUpdates[existingIndex] = updateObject;
                setData(updatedUpdates)
            } else {
                const tempData=data
                tempData.push(updateObject)
                setData(tempData);
            }
           
        });
    });
};

  const connect = async () => {
    try {
      const availablePaths = await fetchAvailablePaths();
      console.log(availablePaths)
      if (!ws || ws.readyState !== ws.OPEN) { // Check if ws needs to be created or reconnected
        ws = new WebSocket('ws://158.174.207.36:3000/signalk/v1/stream?subscribe=none');
        var login_msg ='{"requestId": "1234-45653-343454","login": {"username": "'+"magnus@leijonborg.se"+'","password": "'+'Molly123'+'"}}'
        var subscribe_msg = '{"context": "vessels.self","subscribe": [{"path": "electrical.bms.*","period": 1000}]}'; // ,{"path": "*","period": 1000}
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
            console.log("data received: "+JSON.stringify(data))
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
        const response = await fetch(`http://158.174.207.36:3000/signalk/v1/api/vessels/self`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching paths: ${response.statusText}`);
      }

      const data = await response.json();
     // console.log("Extracted paths: " + extractPaths(data))
      console.log("Extracted paths: " + findPathsWithValue(data))
      findPathsWithValue
      //const paths = data.entries.map((entry) => entry.path);

      return paths;
    } catch (error) {
      console.error('Error fetching paths:', error);
      return []; // Return empty array on error
    }
  };


  useEffect(() => {
    const loadData = async () => {
      const storedUrl = await SecureStore.getItemAsync('serverUrl');
      const storedPaths = await SecureStore.getItemAsync('paths');
      setServerUrl(storedUrl);
      setPaths(storedPaths || []);
    };

    loadData();


    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('Coming to the foreground')// App is coming to foreground, reconnect WebSocket
        connect();
      } else {
        console.log('Going to the background')
        // App is going to background, close WebSocket
        close();
      }
    };
    console.log(AppState)
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      subscription.remove(); // Remove listener on cleanup
    };
  }, []);

  useEffect(() => {
    return () => {
      if (ws) {
        close(); // Close ws on unmount
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

  const value = {
    isConnected,
    data,
    subscribe,
    unsubscribe,
  };

  return (
    <SignalkContext.Provider value={data}>{children}</SignalkContext.Provider>
  );
};

export default SignalkProvider;
