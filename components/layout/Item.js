import React, { useContext, useEffect } from 'react';
import { View, Button } from 'react-native';
import { LayoutContext } from './layoutContext';

const ItemComponent = ({ sectionId, itemId }) => {
  const { removeComponent } = useContext(LayoutContext);

  useEffect(() => {
   console.log("item:"+ itemId)
    
}, [])

  const handleDeleteItem = () => {
    removeComponent('item', sectionId, itemId);
  };

  return (
    <View style={{backgroundColor :"white"}}>
      <Button title="Delete Item" onPress={handleDeleteItem} />
    </View>
  );
};

export default ItemComponent;
