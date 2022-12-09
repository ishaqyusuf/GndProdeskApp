import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function UnitListScreen({ navigation, ...props }) {
  const openFilter = () => {
    // captureEvent({ eventName: 'Open conversation filter menu' });
    navigation.navigate('ConversationFilter', {});
  };
  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
}
