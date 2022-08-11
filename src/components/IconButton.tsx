import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
const IconButton : React.FC<any> = ({ color, size, onPress, name }) => {
  return (
    <Pressable
      style={(args) => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor: 'transparent',
            },
          ];
        }

        return [styles.base, { opacity: 1, backgroundColor: 'transparent' }];
      }}
      onPress={onPress}
    >
      <Icon name={name} type="antdesign" />
      {/* <AntDesign name={name} size={size} color={color} /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
