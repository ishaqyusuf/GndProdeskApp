import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import useConsole from '@src/utils/use-console';
import React, { Fragment, useContext, useEffect } from 'react';
import {  ScrollView, StyleSheet,  View } from 'react-native';
import { Appbar, List, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useList from '../utils/use-list'; 
 
// 
// const auth = Firebase.auth();

const UnitsScreen   = ({navigation,props}) => { 
     const list = useList({
    _url: 'homes',
    _query: {
      // project_slug
    },
    options: [
      // _sheetOption('Tasks',_click),
      // _sheetOption('Manage Costs',_click),
      _sheetOption('Delete',(item) => {
        // list.delete
      },{
        color: 'red'
      }),
    ]
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
  return (
    <ListPage addAction={
      () => {}
    } loader={list}>
       <Appbar.Header className="bg-gray-100 shadow-none my-4">
      <Appbar.BackAction onPress={() => {
         navigation.goBack();
      }} />
        <Appbar.Content title="Units" subtitle="Lorem Ipsum Dolor" />
    </Appbar.Header>
    { list.items.map((item,i) => (<List.Item className="border-b border-gray-200"  key={i} title={item.app_title} onPress={
      () => {
        _click(item)
      }
    } description={item.project_title}/> )) }

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
export default UnitsScreen;
const styles = StyleSheet.create({
  
});
export function DataDisplay({title,value}) {
    return <View className="mb-3">
      <Text className="font-bold mb-2">{title}</Text>
      <Text>{value}</Text>
    </View>
}