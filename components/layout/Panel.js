import React, {useContext, useEffect} from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { LayoutContext } from './layoutContext';
import SectionComponent from './Section'; // Ensure this is imported

const PanelComponent = ({ canvasId, panelId }) => {
    const { layout, addComponent, removeComponent} = useContext(LayoutContext);

    console.log("Before panel find: "+JSON.stringify(layout))
    const canvas= layout.canvases.find(c => c.id === canvasId);
    const panel = canvas.panels.find(p => p.id === panelId);
    if (!panel) return null; // Guard clause in case canvas is not found

    useEffect(() => {
        console.log("panel:"+ JSON.stringify(panel))
         
     }, [])

    const handleAddSection = () => {
        const newSection = {
        id: `section-${Date.now()}`,
        items: [] // Each section contains items
        };
        addComponent('section', panelId, newSection);
    };

    const handleDeletePanel = () => {
        removeComponent('panel', canvasId, panelId);
    };

    // Assuming panel now contains sections
    
    return (
        <View style={styles.panel}>
        {panel?.sections.map((section) => (
            <SectionComponent key={section.id} canvasId={canvasId} panelId={panelId} sectionId={section.id} />
        ))}
        <Button title="Add Section" onPress={handleAddSection} />
        <Button title="Delete Panel" onPress={handleDeletePanel} />
        </View>
    );
};

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 8,
    padding: 10,
  },
  // Add additional styling as needed
});

export default PanelComponent;
