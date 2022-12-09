import { Icon } from '@rneui/themed';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const AnalyticNavCard = ({ navigation, nav, ...props }) => {
  return (
    <Pressable
      android_ripple={{
        color: 'gray',
      }}
      className="rounded-lg mx-2 w-44 flex-col justify-between p-4 pt-16 pb-8 shadow-lg"
      style={{
        backgroundColor: nav.color,
      }}
      onPress={() => {
        navigation.navigate(nav.route);
      }}
    >
      <Text>
        <Icon name={nav.icon} type="ionicon" />
      </Text>
      <View>
        <Text className="text-xl font-bold">{nav.title}</Text>
        <Text>{nav.subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default AnalyticNavCard;
