import React, { Fragment, useState } from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';

export function EmployeeSimpleListItem({ item, onPress = null }) {
  return (
    <Pressable onPress={() => onPress && onPress()}>
      <Text>{item.name}</Text>
    </Pressable>
  );
}
