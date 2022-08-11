 
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
 
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Divider,
  List,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useAuth } from '../auth-provider';
// const auth = Firebase.auth();

const OptionsScreen   = ({navigation}) => { 
   const {handleLogout} = useAuth();
   async function _handleLogout()  {
    await handleLogout()
    navigation.navigate('Auth')
   }
   const _listItem = (name,icon ='') => true && {name,icon}
   const list = [
    _listItem('Builders','business-outline'),
    _listItem('Invoices','wallet-outline'),
    _listItem('Orders',''),
    _listItem('Customer Services',''),
    _listItem('Employees',''),
    _listItem('Profile',''),
    _listItem('Logout',''),
   ]
  return (
     
         <ScrollView style={{flex:1}}>
           
                        { list.map((item,i) => (<List.Item  key={i} title={item.name}
                          left={props => <List.Icon {...props} icon="folder"/>}
                        />
                          ))
                        }
                        <List.Item title="Logout"
                        onPress={_handleLogout}
                        />
                      </ScrollView>
    
  );
}
export default OptionsScreen;
const styles = StyleSheet.create({
  
});
