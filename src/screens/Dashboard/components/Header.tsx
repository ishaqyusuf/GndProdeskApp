import React, { Fragment, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';

function Header({ navigation, ...props }) {
  const dispatch = useDispatch();
  const hrs = new Date().getHours();
  // console.log(hrs)
  let greeting = 'Good Morning';
  // let displayName = auth?.user?.name;
  if (hrs > 11) greeting = 'Good Afternoon';
  if (hrs > 16) greeting = 'Good Evening';
  const user = useSelector<any, any>((state) => state.auth.user);
  return (
    <View className="p-4 flex flex-row justify-between">
      <View>
        <Text>{greeting}</Text>
        <Text className="text-2xl capitalize font-bold">{user.name}</Text>
      </View>
      <View className="flex justify-center">
        <Pressable
          onPress={() => {
            navigation.navigate('Options');
            // _logout();
          }}
        >
          {/* <Text className="font-bold text-red-500 p-1 px-2 rounded-lg bg-red-200">LOGOUT</Text> */}
          {/* <IconButton icon="setting" /> */}
          <Icon type="feather" name="settings" />
        </Pressable>
      </View>
      {/* <Pressable onPress={() => {
        navigation.navigate('OptionsScreen');
       }}>

       <View className="rounded-lg bg-purple-200 h-10 w-10 flex justify-center items-center flex-row border border-purple-300">
          <Text className="text-lg font-bold uppercase text-purple-800">
            {auth.state.user.name[0]}
          </Text>
       </View>
       </Pressable> */}
    </View>
  );
}

export default Header;
