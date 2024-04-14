// SectionComponent.js
import React, {useContext} from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { LayoutContext } from './layoutContext';
import ItemComponent from './Item'; // Ensure this is imported

const SectionComponent = ({ canvasId, panelId, sectionId }) => {
  const { layout,addComponent, removeComponent } = useContext(LayoutContext);

  const canvas= layout.canvases.find(c => c.id === canvasId);
  const panel = canvas.panels.find(p => p.id === panelId);
  console.log("panel in section:"+ JSON.stringify(panel))
  const section = panel.sections.find(s => s.id === sectionId);
  console.log("section in section:"+ JSON.stringify(section))
  if (!section) return null; // Guard clause in case canvas is not found


  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      content: 'New Item Content'
    };
    addComponent('item', sectionId, newItem); // Note the change to sectionId
  };

  const handleDeleteSection = () => {
    removeComponent('section', panelId, sectionId); 
  };

  // Assuming sections contain items directly
  return (
    <View style={styles.section}> 
        <View style={{}}>
            {section?.items.map((item) => (
            <ItemComponent key={item.id} sectionId={sectionId} itemId={item.id} />
            ))}
        </View>
        <Button title="Add Item" onPress={handleAddItem} />
        <Button title="Delete Section" onPress={handleDeleteSection} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
  },
  // Add additional styling as needed
});

export default SectionComponent;
