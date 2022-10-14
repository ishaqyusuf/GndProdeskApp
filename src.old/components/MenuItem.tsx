 
import React, { useState }  from "react";
import { Pressable, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export  function MenuItem({onPress=null,title,subtitle =null,style={}, children = null}) {
   return (
      <Pressable className={`p-4 border-b flex-row justify-between border-gray-300`} onPress={onPress}>
         <View  className="mb-3s">
      <Text style={style}  className='font-semibold'>{title}</Text>
      {subtitle && <Text>{subtitle}</Text>}
    </View>
    {children}
      </Pressable>
   )
  }


  export function DeleteMenuItem({list,menu}) {
    const [confirm,setConfirm] = useState(false)
    const [deleting,setDeleting] = useState(false)
    const [title,setTitle] = useState('Delete')
    function onPress() {
        if(!confirm) { 
            setConfirm(true)
            setTitle('Are you sure?')
            setTimeout(() => {
                if(confirm) {
                    setTitle('Delete')
                    setConfirm(false)
                }
            }, 3000);
        }
            else {
                setTitle('Deleting')
                setDeleting(true)
                setConfirm(false)
                list.deleteItem(menu.data).then(r => {
                    //deleted.
                    menu.close()

                })
            }
    }
    return (
        <MenuItem onPress={() => onPress()} style={{color: 'red'}} title={title}>
            { deleting && <ActivityIndicator  color="red" /> }
        </MenuItem>
    );
  }