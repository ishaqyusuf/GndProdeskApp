import { useAuth } from '@src/auth-provider';
import useConsole from '@src/utils/use-console';
import { fetchApi } from '@src/utils/use-fetch';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import NavCardItem, { createNavCardItem } from './NavCardItem';
import NavCardsContainer from './NavCardsContainer';

const AdminNav = ({ navigation }) => {
  const auth = useAuth();

  const [data, setData] = useState<any>({
    cards: {
      projects: createNavCardItem(
        'Projects',
        '100 projects',
        'folder-open',
        'ProjectsScreen',
        '#fc9a7e'
      ),
      units: createNavCardItem('Units', '100 projects', 'office', 'UnitsScreen', '#83f795'),
      builders: createNavCardItem(
        'Builders',
        '100 projects',
        'office',
        'BuildersScreen',
        '#d5a1ed'
      ),
      tasks: createNavCardItem('Tasks', '100 projects', 'office', 'TasksScreen', '#a1cbed'),
      customer_services: createNavCardItem(
        'Customer Services',
        '100 projects',
        'office',
        'CustomerServicesScreen',
        '#edd0a1'
      ),
      orders: createNavCardItem('Orders', '100 projects', 'office', 'OrdersScreen', '#cceda1'),
    },
  });

  useEffect(() => {
    //
    fetchApi()
      .get('dashboard/app')
      .then(({ data: _ }) => {
        let d = { ...data };
        Object.entries(_).map(([k, v]) => {
          d.cards[k].subtitle = v;
        });
        setData(d);
      });
  }, []);

  return (
    <View>
      <NavCardsContainer horizontal={true} navigation={navigation}>
        {Object.values(data.cards).map((n) => (
          <NavCardItem className="" navigation={navigation} nav={n} />
        ))}
      </NavCardsContainer>
    </View>
  );
};
export default AdminNav;
const styles = StyleSheet.create({});
