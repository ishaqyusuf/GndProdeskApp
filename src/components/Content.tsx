import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
export function DataDisplay({title,value, alwaysShow = false, _default = null}) {
    return ((value || _default) || alwaysShow) && (<View className="mt-2">
      <Text className="font-bold ">{title}</Text>
      <Text>{value ?? _default}</Text>
    </View>)
}