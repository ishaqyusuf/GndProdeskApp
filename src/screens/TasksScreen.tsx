import PageLoader from '@src/components/ListPage';
import useConsole from '@src/utils/use-console';
import React, { useContext, useEffect } from 'react';
import {  ScrollView, StyleSheet,  View } from 'react-native';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useList from '../utils/use-list'; 
 
// 
// const auth = Firebase.auth();

const TasksScreen   = ({navigation,...props}) => { 
     const list = useList({
    _url: 'home-tasks',
    _query: {
       ...props.query
    }
   });
   useEffect(() => {
      list.load();
      useConsole.log("PROPS")
      useConsole.log(JSON.stringify(props))
 },[])
  return (
    <PageLoader loader={list}>
    { list.items.map((item,i) => (<List.Item  key={i} title={item.title} onPress={
      () => {
         navigation.navigate('UnitsPage')
      }
    } description={item.status}/> )) }
   </PageLoader>
  );
}
export default TasksScreen;
const styles = StyleSheet.create({
  
});
