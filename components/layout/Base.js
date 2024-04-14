import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { LayoutContext } from './layoutContext';
import CanvasComponent from './Canvas'; // Ensure this is imported

const BaseComponent = () => {
  console.log("Layoutcontext: "+LayoutContext)
  const { layout, addComponent } = useContext(LayoutContext);

  const handleAddCanvas = () => {
    const newCanvas = {
      id: `canvas-${Date.now()}`, // Unique ID for the canvas
      panels: []
    };
    addComponent('canvas', null, newCanvas);
  };

  return (
    <View style={styles.container}>
      {layout.canvases.map((canvas) => (
        <CanvasComponent key={canvas.id} canvasId={canvas.id} />
      ))}
      <Button title="Add Canvas" onPress={handleAddCanvas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor : "yellow"
  }
});

export default BaseComponent;
