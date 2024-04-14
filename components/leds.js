import { useEffect, useState } from "react";
import {Button,ScrollView, FlatList, StyleSheet, Text, View, TouchableHighlight } from 'react-native';





export default function RoundLed({on,onColor, offColor}) {

    

    useEffect(() => {
      console.log(on)
      
    }, []);


    return (
      <View style={{height : 16, width: 16, borderRadius : 8 , borderWidth : 1, backgroundColor: on ? onColor : offColor, borderColor : 'white'}}></View>
       

    )

}



/*
<TouchableHighlight onPress={() => {setIsModalVisible(true);}} underlayColor="gray">
                <View>
                    <Entypo name="cog" size={18} color="white"  />
                </View>
             </TouchableHighlight>
           
*/

const styles = StyleSheet.create({
    modalContent: {
      height: '300',
      width: '800',
      flex : 1,
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      top : 10,
      left : 0,
      bottom: 0,
    },
    titleContainer: {
      height: '20',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
  });
