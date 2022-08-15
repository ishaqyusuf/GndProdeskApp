import { BottomSheetComponent, useBottomSheet } from "@src/components/BottomSheet";
import Input from "@src/components/Input";
import { MenuItem } from "@src/components/MenuItem";
import useForm from "@src/utils/use-form";
import React, { Fragment, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";


export default function TasksScene() { 
    const option = useBottomSheet({
    page: 'menu', //submit
    
  });
  const installForm = useForm({
      note: ''
    })

   function App() {
  return (
         <Fragment>
            <BottomSheetComponent ctx={option}>
               {option.option.page == 'menu' && (
                  <Fragment>
                     <MenuItem title="View" />
                     <MenuItem title="Mark as completed" onPress={
                        () => option.setOption("page","submit")
                     } />
                     <MenuItem style={{color: 'red'}} title="Delete" />
                  </Fragment>
               )}
               {
                  option.option.page == 'submit' && (
                     <Fragment>
                        <Input type="textarea" placeholder="Information" useForm={installForm}  name="note" />
                     </Fragment>
                  )
               }
               </BottomSheetComponent>
         </Fragment>
      );
  } 
  function Item({item}) {
         return (
             <Pressable onPress={() => {
      option.open(item)
      }}>
    <View className="px-4 py-3 border-b border-gray-300">
      <Text className="font-bold">{item.meta.project_title}</Text>
      <View className="flex-row justify-between">
         <Text>{item.meta.lot_block}</Text>
         <Text>{item.install_status}</Text>
      </View>
    </View>
  </Pressable>
         )
  }
    return {
        App,
        Item
    }
}