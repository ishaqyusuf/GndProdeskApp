import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useContext, useEffect, useState } from 'react';
import {  ScrollView, StyleSheet,  View } from 'react-native';
import { Card, List, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useList from '../utils/use-list'; 
import { Appbar } from 'react-native-paper';
 
// 
// const auth = Firebase.auth();
const ProjectScreen   = ({navigation}) => {
   function _click(item) {
    navigation.navigate('UnitsPage',{
               project_slug: item.slug
            })
        }
   const auth = useAuth();
     const list = useList({
    _url: 'v1/projects',
    options: [
      _sheetOption('Open',_click),
      _sheetOption('Edit',(item) => {
      }),
      _sheetOption('Delete',(item) => {},{
         color: 'red'
      })
    ]
   });
   useEffect(() => {
      list.load(); 
   },[])

   // const [selected,setSelection] = 
   
   
  return ( 
  <ListPage loader={list}  addAction={() => navigation.navigate('')}>
    <Appbar.Header className="bg-gray-100 shadow-none my-4">
      <Appbar.BackAction onPress={() => {
         navigation.goBack();
      }} />
        <Appbar.Content title="Projects" subtitle="Lorem Ipsum Dolor" />
    </Appbar.Header>
    { list.items.map((item,i) => (<List.Item  key={i} title={item.title} onPress={
      () => {
        _click(item)
      } 
    } onLongPress={
         () => list.longPress(item)
    } description={`${item.ref_no}  |  ${item.builder_name}`} /> )) } 
 </ListPage> 
  );
}
export default ProjectScreen;
const styles = StyleSheet.create({
  
});


