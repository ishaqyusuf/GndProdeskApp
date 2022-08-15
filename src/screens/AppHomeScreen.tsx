import { useAuth } from '@src/auth-provider';
import AdminNav from '@src/components/home/AdminNav';
import HomeHeader from '@src/components/home/HomeHeader';
import useConsole from '@src/utils/use-console';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TasksScreen from './TasksScreen';

// fetchApi({debug: true})
// .get('hello-api');
//
// const auth = Firebase.auth();

const AppHomeScreeen = ({ navigation }) => {
  const auth = useAuth();
  //   const list = useList({
  //  _url: 'homes',
  // });
  //  list.load();

  useEffect(() => {
    useConsole.logScreen('HOME');
  }, []);
  return (
    <ScrollView>
      <HomeHeader navigation={navigation} />
      <AdminNav navigation={navigation} />

      {/* <PublicNav type="production" navigation={navigation}/>
       <TasksScreen navigation={navigation} query={{
        page: "production", 
        per_page: 5
      }} inject={true} />  */}
      <TasksScreen
        withStats={true}
        widget={true}
        navigation={navigation}
        query={{
          task_page: 'installation',
          per_page: 5,
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
    </ScrollView>
  );
};
export default AppHomeScreeen;
const styles = StyleSheet.create({});
