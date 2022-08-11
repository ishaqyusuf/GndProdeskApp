import { useAuth } from '@src/auth-provider';
import React, { useContext } from 'react';
import {  ScrollView, StyleSheet,  View } from 'react-native'; 
import { Text } from 'react-native-paper';
import NavCardItem, { createNavCardItem } from './NavCardItem';
import NavCardsContainer from './NavCardsContainer';

const AdminNav = ({navigation}) => {
   const auth = useAuth()

   const navs = [
      createNavCardItem('Projects','100 projects','folder-open','ProjectsScreen','#fc9a7e'),
      createNavCardItem('Units','100 projects','office','UnitsPage','#83f795'),
      createNavCardItem('Builders','100 projects','office','ProjectsScreen','#d5a1ed'),
      createNavCardItem('Tasks','100 projects','office','ProjectsScreen','#a1cbed'),
      createNavCardItem('Customer Services','100 projects','office','ProjectsScreen','#edd0a1'),
      createNavCardItem('Orders','100 projects','office','ProjectsScreen','#cceda1'),
   ]
  return (
    <View>
     
         <NavCardsContainer horizontal={true} navigation={navigation}>
                {navs.map(n => <NavCardItem className="" navigation={navigation} nav={n}/>)}    
          </NavCardsContainer>   
    </View>
  );
}
export default AdminNav;
const styles = StyleSheet.create({
  
});
