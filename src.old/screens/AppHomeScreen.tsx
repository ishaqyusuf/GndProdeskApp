import { useFocusEffect } from '@react-navigation/native';
import AdminNav from '@src/components/home/AdminNav';
import HomeHeader from '@src/components/home/HomeHeader';
import VirtualizedList from '@src/components/VirtualizedList';
import useConsole from '@src/utils/use-console';
import React, { useCallback, useState } from 'react';
import { InteractionManager, StyleSheet } from 'react-native';
import TasksScreen from './TasksScreen';

// fetchApi({debug: true})
// .get('hello-api');
//
// const auth = Firebase.auth();

const AppHomeScreeen = ({ navigation }) => {
  //   const list = useList({
  //  _url: 'homes',
  // });
  //  list.load();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        useConsole.logScreen('HOME');
      });
      return () => task.cancel();
    }, [])
  );
  return (
    <VirtualizedList
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(false);
      }}
    >
      <HomeHeader navigation={navigation} />
      <AdminNav navigation={navigation} />

      {/* <PublicNav type="production" navigation={navigation}/>
       <TasksScreen navigation={navigation} query={{
        page: "production", 
        per_page: 5
      }} inject={true} />  */}

      {/* <TasksScreen
        withStats={true}
        widget={true}
        navigation={navigation}
        query={{
          task_page: 'installation',
        }}
        inject={true}
      /> */}
      <TasksScreen
        withStats={true}
        widget={true}
        navigation={navigation}
        query={{
          production: true,
        }}
        inject={true}
      />

      {/* { auth.state.isAdmin && <AdminNav navigation={navigation}/> }
      { (auth.state.isProducer || auth.state.isInstaller) && <PublicNav type="installation" navigation={navigation}/> } */}
      {/* <TasksScreen navigation={navigation} query={{
        page:"installation",
        per_page: 5
      }} />
      <TasksScreen navigation={navigation} query={{
        page: "production", 
        per_page: 5
      }} /> */}
      {/* {auth.state.isInstaller && <InstallerNav navigation={navigation}/> } */}
      {/* { list.items.map((item,i) => (<List.Item  key={i} title={item.app_title} onPress={
      () => {
         navigation.navigate('Homes')
      }
    } description={item.project_title}/> )) } */}
    </VirtualizedList>
  );
};
export default AppHomeScreeen;
const styles = StyleSheet.create({});
