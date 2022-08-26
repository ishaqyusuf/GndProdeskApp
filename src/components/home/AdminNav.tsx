import { useFocusEffect } from '@react-navigation/native';
import { useData } from '@src/redux/reducers/data';
import useConsole from '@src/utils/use-console';
import { fetchApi } from '@src/utils/use-fetch';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, InteractionManager, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import NavCardItem, { createNavCardItem } from './NavCardItem';
import NavCardsContainer from './NavCardsContainer';

const AdminNav = ({ navigation }) => {
  const cards = {
    projects: createNavCardItem(
      'Projects',
      '100 projects',
      'albums-outline',
      'ProjectsScreen',
      '#fc9a7e'
    ),
    units: createNavCardItem('Units', '100 projects', 'home-outline', 'UnitsScreen', '#83f795'),
    builders: createNavCardItem(
      'Builders',
      '100 projects',
      'podium-outline',
      'BuildersScreen',
      '#d5a1ed'
    ),
    tasks: createNavCardItem('Tasks', '100 projects', 'layers-outline', 'TasksScreen', '#a1cbed'),
    customer_services: createNavCardItem(
      'Customer Services',
      '100 projects',
      'help-buoy-outline',
      'CustomerServicesScreen',
      '#edd0a1'
    ),
    orders: createNavCardItem('Orders', '100 projects', 'cart-outline', 'OrdersScreen', '#cceda1'),
  };
  const data = useData('dashboard', {
    _default: {
      cards: { ...cards },
    },
    url: 'dashboard/app',
    transform({ data: _ }) {
      let _cards = { ...cards };
      Object.entries(_).map(([k, v]) => {
        _cards[k].subtitle = v;
      });
      return {
        cards: _cards,
      };
    },
  });
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        data.load();
      });
      return () => task.cancel();
    }, [])
  );

  return (
    data.isReady && (
      <View>
        {/* <NavCardsContainer className="px-4 mr-4" horizontal={true} navigation={navigation}> */}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={Object.values(data.state?.cards)}
          renderItem={({ item }) => <NavCardItem nav={item} navigation={navigation} />}
        />
        {/* {Object.values(data.state?.cards).map((n, i) => (
          <NavCardItem key={i} className="mr-2" navigation={navigation} nav={n} />
        ))} */}
        {/* </NavCardsContainer> */}
      </View>
    )
  );
};
export default AdminNav;
const styles = StyleSheet.create({});
