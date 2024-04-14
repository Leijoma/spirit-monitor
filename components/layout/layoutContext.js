import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash'; 

export const LayoutContext = createContext();




export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({ canvases: [] });

  

  useEffect(() => {
    const loadLayout = async () => {
      try {
        const storedLayout = await AsyncStorage.getItem('layoutData');
        if (storedLayout) setLayout(JSON.parse(storedLayout));
      } catch (error) {
        console.error('Error loading layout:', error);
      }
    };

    const clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
    
      console.log('Done.')
    }
    
    clearAll();
    loadLayout();
  }, []);

  const saveLayout = async (newLayout) => {
    try {
      await AsyncStorage.setItem('layoutData', JSON.stringify(newLayout));
      setLayout(newLayout);
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  };

  const addComponent = (type, parentID, newComponent) => {
    let updatedLayout = _.cloneDeep(layout); 

    if (type === 'canvas') {
      updatedLayout.canvases.push(newComponent); 
    } else {
      const parent = findComponent(updatedLayout.canvases, parentID);
      if (parent) {
        if (type === 'panel') {
          if (!parent.panels) parent.panels = []; // Ensure panels array exists
          console.log("parent: "+JSON.stringify(parent))
        
          console.log("new panel: "+JSON.stringify(newComponent))
          parent.panels.push(newComponent);
          console.log("parent: "+JSON.stringify(parent))
        
        } else if (type === 'section') {
          if (!parent.sections) parent.sections = []; // Ensure sections array exists
          parent.sections.push(newComponent);
        } else if (type === 'item') {
          if (!parent.items) parent.items = []; // Ensure items array exists
          parent.items.push(newComponent);
        }
      }
    }

    saveLayout(updatedLayout);
  };

  const removeComponent = (type, parentID, componentID) => {
    let updatedLayout = _.cloneDeep(layout);

    if (type === 'canvas') {
      updatedLayout.canvases = updatedLayout.canvases.filter(canvas => canvas.id !== componentID);
    } else {
      const parent = findComponent(updatedLayout.canvases, parentID);
      if (parent) {
        if (type === 'panel') {
          parent.panels = parent.panels.filter(panel => panel.id !== componentID);
        } else if (type === 'section') {
          parent.sections = parent.sections.filter(section => section.id !== componentID);
        } else if (type === 'item') {
          parent.items = parent.items.filter(item => item.id !== componentID);
        }
      }
    }

    saveLayout(updatedLayout);
  };

  // Updated to recursively search for sections as well
  function findComponent(components, id) {
    for (let component of components) {
      if (component.id === id) return component;
      if (component.panels) {
        const foundPanel = findComponent(component.panels, id);
        if (foundPanel) return foundPanel;
      }
      if (component.sections) {
        const foundSection = findComponent(component.sections, id);
        if (foundSection) return foundSection;
      }
      if (component.items) {
        const foundItem = findComponent(component.items, id);
        if (foundItem) return foundItem;
      }
    }
    return null;
  }

  return (
    <LayoutContext.Provider value={{ layout, addComponent, removeComponent }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
