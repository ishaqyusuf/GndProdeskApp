import { BottomSheetComponent, useBottomSheet } from "@src/components/BottomSheet"; 
import {   MenuItem } from "@src/components/MenuItem"; 
import useForm from "@src/utils/use-form";
import { Label } from "@src/utils/use-status-colors";
import React, { Fragment, useState } from "react";
import { Pressable, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
 
export default function InstallationsScene( {list} ) { 
    const option = useBottomSheet({
    page: 'menu', //submit
    onOpen() {
        setCompleteForm(false)
        setSaving(false)
        setNote('')
    }
    
  });
  const [completeForm,setCompleteForm] = useState(false)
  const [saving,setSaving] = useState(false)
  const [note,setNote] = useState('')
  const Form = useForm({
    _url: 'unit-tasks'
  });
   function App() {
   
  return (
         <Fragment>
               <BottomSheetComponent ctx={option}>
                <View>
                    <Item readonly={true} item={option.data} />
                </View>
              {option.data && <Fragment>
                 {!completeForm && (
                  <Fragment>
                     <MenuItem title="View" />
                     { option.data.meta.install_status == 'Completed' ?
                     <MenuItem title="Not Completed" style={{color: '#BFAF56'}} onPress={
                        () => {
                            setSaving(true)
                                    list.updateItem({
                                        install_note: null,
                                        status: 'Installation', 
                                        reverse_action: true
                                    },option.data.id)
                                    .then(r => {
                                        setSaving(false)
                                        option.close();

                                    })
                        }
                     } >
                         { saving && <ActivityIndicator  /> }
                     </MenuItem> :
                     <MenuItem style={{color: 'green'}} title="Mark as completed" onPress={
                        () => setCompleteForm(true)
                     } /> }
                     {/* <DeleteMenuItem menu={option} list={list} /> */}
                  </Fragment>
               )}
               {
                  completeForm && (
                    InstallationForm()
                  )
               }
                </Fragment>}
               </BottomSheetComponent>
         </Fragment>
      );
  } 
  function Item({item,readonly}) {
         return item && (
             <Pressable onPress={() => {
                    !readonly && option.open(item)
      }}>
                <View className="px-4 py-3 border-b border-gray-300">
                <Text className="font-bold">{item.meta.project_title} - {item.meta.lot_block}</Text>
                <View className="flex-row justify-between">
                    {/* <Text>{item.meta.lot_block}</Text> */}
                    <Text>
                        {item.title}
                    </Text>
                    <Label status={item.meta.install_status ?? 'Pending'}/>
                </View>
                { readonly && (
                    <View>

                    </View>
                )}
                </View>
            </Pressable>
         )
  }
  function InstallationForm() {
    return ( <View className="p-4">
                        <TextInput multiline placeholder="Information" 
                        value={note}
                        onChangeText={text => setNote(text)} />
                        <View>
                            <Button loading={saving} onPress={() => {
                                    setSaving(true)
                                    list.updateItem({
                                        install_note: note,
                                        status: 'Completed',
                                        installation: true
                                    },option.data.id)
                                    .then(r => {
                                        setSaving(false)
                                        option.close();

                                    })
                            }} color="green">Save</Button>
                        </View>
                     </View>)
  }
    return {
        App,
        Item
    }
}