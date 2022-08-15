import { BottomSheetComponent, useBottomSheet } from "@src/components/BottomSheet";
import React, { Fragment, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";


export default function ProductionScene() {

    const option = useBottomSheet({
      
      });

    function ProductionDisplay() {
                  return (
         <Fragment>
               <BottomSheetComponent ctx={option}>

               </BottomSheetComponent>
         </Fragment>
      );
}  
function ProductionItem({item}) {
       return (<Pressable onPress={() => {
            option.open(item)
      }}>
         <View className="mb-3 border-b border-gray-200">
            <Text className="font-bold mb-2">{item.title}</Text>
            <Text>{item.prod_status}</Text>
         </View>
  </Pressable>)
  } 
    return { 
        App:ProductionDisplay,
        Item: ProductionItem
    }
}