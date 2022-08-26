import { View } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
export function DataDisplay({
  title,
  value = null,
  alwaysShow = false,
  _default = null,
  children = null,
}) {
  return (
    (value || children || _default || alwaysShow) && (
      <View className="mt-2 px-4">
        <Text className="font-bold ">{title}</Text>
        {children ?? <Text>{value ?? _default}</Text>}
      </View>
    )
  );
}
