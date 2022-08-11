import PageLoader from '@src/components/ListPage';
import useConsole from '@src/utils/use-console';
import React, { useEffect } from 'react';
import {   StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
 
import useList from '../utils/use-list'; 
 
// 
// const auth = Firebase.auth();

const UnitTasksScreen   = ({navigation,props}) => { 
     const list = useList({
    _url: 'unit-tasks',
    _query: {
      ...(props.query ?? {})
    }
   });
   useEffect(() => {
      list.load();
      useConsole.log("PROPS")
      useConsole.log(JSON.stringify(props))
 },[])
  return (
    <PageLoader loader={list}>
    { list.items.map((item,i) => (<List.Item  key={i} title={item.app_title} onPress={
      () => {
         navigation.navigate('UnitsPage')
      }
    } description={item.project_title}/> )) }
   </PageLoader>
  );
}
export default UnitTasksScreen;
const styles = StyleSheet.create({
  
});
