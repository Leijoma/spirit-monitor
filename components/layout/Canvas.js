import React, { useContext } from 'react';
import { View, Button , StyleSheet} from 'react-native';
import { LayoutContext } from './layoutContext';
import PanelComponent from './Panel'; // Ensure this is imported

const CanvasComponent = ({ canvasId }) => {
  const { layout, addComponent, removeComponent } = useContext(LayoutContext);

  const canvas = layout.canvases.find(c => c.id === canvasId);
  if (!canvas) return null; // Guard clause in case canvas is not found

  const handleAddPanel = () => {
    const newPanel = {
      id: `panel-${Date.now()}`, // Unique ID for the panel
      sections: [] // Each panel now contains sections  
    };
    addComponent('panel', canvasId, newPanel);
  };

  const handleDeleteCanvas = () => {
    removeComponent('canvas', null, canvasId);
  };

  return (
    <View style={styles.canvas}>
    <Button title="Add Panel" onPress={handleAddPanel} style={styles.addButton} />
    <View style={styles.panelsContainer}>
      {canvas.panels.map((panel) => (
        <PanelComponent key={panel.id} canvasId={canvasId} panelId={panel.id} />
      ))}
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
  canvas: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  addButton: {
    width: 50,
    marginRight: 10, // Creates space between the button and the panels
  },
  panelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CanvasComponent;