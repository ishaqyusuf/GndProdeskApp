import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

function DashboardScreen({ props, navigation }) {
  return (
    <ScrollView>
      <View className="flex-1 ">
        <Text>DAHBOARD</Text>
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
