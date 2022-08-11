import { Icon } from '@rneui/themed';
import { useAuth } from '@src/auth-provider';
import React, { useContext } from 'react';
import {  Pressable, StyleSheet,  View } from 'react-native'; 
import { Text } from 'react-native-paper';

const NavCardItem = ({navigation,nav}) => {
   const auth = useAuth()
 let style = ["rounded-lg mr-4 w-44 flex-col justify-between p-4 h-64 py-8 shadow-lg",`bg-${nav.color}-200`].join(" ")
   
  return (
    <Pressable className={style} style={{
      backgroundColor: nav.color
    }} onPress={() => navigation.navigate(nav.route)}>
       <Text> <Icon name={nav.icon} type="ionicon"/></Text>
        <View>
          <Text className="text-xl font-bold">
            {nav.title}
          </Text>
          <Text>
            {nav.subtitle}
          </Text>
        </View>
    </Pressable>
  );
}
export const NavCardItem2 = ({navigation,nav}) => {
   const auth = useAuth()
 let style = ["rounded-lg m-2  flex-col justify-between p-4 h-44 py-8 shadow-lg",`bg-${nav.color}-200`].join(" ")
   
  return (
    <Pressable  onPress={() => navigation.navigate(nav.route)}  className={style} style={{
      backgroundColor: nav.color
    }}>
       <Text> <Icon name={nav.icon} type="ionicon"/></Text>
        <View>
          <Text className="text-xl font-bold">
            {nav.title}
          </Text>
          <Text>
            {nav.subtitle}
          </Text>
        </View>
    </Pressable>
  );
}
export default NavCardItem;
const styles = StyleSheet.create({
  
});
export const createNavCardItem = (title,subtitle,icon,route,color) => {
  return {
    title,subtitle,icon,route,color
  }
}