import { Icon } from '@rneui/themed';
import { useAuth } from '@src/auth-provider';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const NavCardItem = ({ navigation, nav, ...props }) => {
  const auth = useAuth();

  return (
    <Pressable
      className="rounded-lg mr-4 w-44 flex-col justify-between p-4   pt-16 pb-8 shadow-lg"
      style={{
        backgroundColor: nav.color,
      }}
      onPress={() => navigation.navigate(nav.route)}
    >
      <Text>
        {' '}
        <Icon name={nav.icon} type="ionicon" />
      </Text>
      <View>
        <Text className="text-xl font-bold">{nav.title}</Text>
        <Text>{nav.subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default NavCardItem;
const styles = StyleSheet.create({});
export const createNavCardItem = (title, subtitle, icon, route, color) => {
  return {
    title,
    subtitle,
    icon,
    route,
    color,
  };
};
