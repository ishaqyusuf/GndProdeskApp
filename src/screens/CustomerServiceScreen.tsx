import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import useConsole from '@src/utils/use-console';
import React, { Fragment,   useEffect } from "react";
import {  Pressable,   StyleSheet,  View } from 'react-native';
import { Text } from 'react-native-paper'; 
import useList from '../utils/use-list'; 
 
// 
// const auth = Firebase.auth();

const CustomerServiceScreen  = ({navigation,props}) => { 
     const list = useList({
    _url: 'v1/orders',
    _query: {
      // project_slug
    },
     
   });
   const viewer = useBottomSheet();

   function _click(item) {
     viewer.open(item)
        }
   useEffect(() => {
      list.load();
      useConsole.log("PROPS")
      useConsole.log(JSON.stringify(props))
 },[])
 function addAction() {
  // /
 }
 function CustomerServiceItem(item) {
  return <Pressable onPress={() => {
      _click(item)
  }}>
    <View className="mb-3 border-b border-gray-200">
      <Text className="font-bold mb-2">{item.name}</Text>
      <Text>{item.project_count}</Text>
    </View>
  </Pressable>
 }
  return (
    <ListPage {...{navigation,canGoBack:true,header:true,title:'Builders',subtitle: '',addAction,loader:list}}>
    { list.items.map((item,i) => (<CustomerServiceItem item={item}/> )) }

    <BottomSheetComponent ctx={viewer}>
      {viewer.data && (<Fragment>
        <Text className="text-lg mb-6 font-bold">
       {viewer.data.headline}
      </Text>
      <DataDisplay title="Status" value={viewer.data.sub_status} />
      <DataDisplay title="Builder" value={viewer.data.builder_name} />
      <DataDisplay title="" value="" />
      <DataDisplay title="" value="" />
      </Fragment>)}
    </BottomSheetComponent>
   </ListPage>
  );
}
export default CustomerServiceScreen;
const styles = StyleSheet.create({
  
});
