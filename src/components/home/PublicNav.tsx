import { Text } from 'react-native-paper';
import { useAuth } from '@src/auth-provider';
import useConsole from '@src/utils/use-console';
import { fetchApi } from '@src/utils/use-fetch';
import { Icon } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { createNavCardItem } from './NavCardItem';
const PublicNav = ({ navigation, type }) => {
  const NavCardItem2 = ({ navigation, nav, ...props }) => {
    const auth = useAuth();

    return (
      <Pressable
        onPress={() =>
          navigation.navigate(nav.route, {
            query: {
              task_status: nav.subtitle,
              task_page: type,
            },
          })
        }
        className="rounded-lg m-2  flex-col justify-between p-4 h-32s py-8s shadow-lg"
        style={{
          backgroundColor: nav.color,
        }}
      >
        <Text>
          {' '}
          <Icon name={nav.icon} type="ionicon" />
        </Text>
        <View>
          <Text className="text-3xl font-bold">{nav.title}</Text>
          <Text className="text-base">{nav.subtitle}</Text>
        </View>
      </Pressable>
    );
  };
  let _item = createNavCardItem;
  const _card = {
    production: {
      pending: _item('0', 'Pending', 'folder-open', 'TasksScreen', '#edd0a1'),
      late: _item('0', 'Late', 'office', 'TasksScreen', '#f57749'),
      completed: _item('0', 'Completed', 'office', 'TasksScreen', '#7cf578'),
      total: _item('0', 'Total', 'office', 'TasksScreen', '#b3c2b2'),
    },
    installation: {
      pending: _item('0', 'Pending', 'folder-open', 'TasksScreen', '#edd0a1'),
      completed: _item('0', 'Completed', 'office', 'TasksScreen', '#7cf578'),
      total: _item('0', 'Total', 'office', 'TasksScreen', '#b3c2b2'),
    },
  }[type];
  const _rows = {
    production: [
      ['pending', 'late'],
      ['completed', 'total'],
    ],
    installation: [['pending', 'completed'], ['total']],
  }[type];

  const auth = useAuth();
  const [data, setData] = useState<any>({
    title: `${type} Overview`,
    cards: _card,
    loading: true,
  });

  useEffect(() => {
    fetchApi({
      debug: true,
    })
      .get('unit-tasks', {
        page: type,
        stats: true,
      })
      .then((resp) => {
        let cards = data.cards;
        Object.entries(resp).map(([k, v]) => (cards[k].title = v));
        setData({
          ...data,
          cards,
          loading: false,
        });
      });
  }, []);

  return (
    !data.loading && (
      <View className="flex-col">
        <View className="m-4">
          <Text className="text-xl capitalize font-bold">{data.title}</Text>
        </View>
        <View className="px-2" style={styles.app}>
          {_rows.map((sec) => (
            <Row className="">
              {sec.map((n) => (
                <Col numRows={sec.length} className="m-4">
                  {/* <View className="bg-red-400 m-2">
       <Text>
        {
          JSON.stringify(data.cards[n])
        }
      </Text>
     </View> */}

                  <NavCardItem2 className="m-4 " navigation={navigation} nav={data.cards[n]} />
                </Col>
              ))}
            </Row>
          ))}
        </View>
      </View>
    )
  );
};
export default PublicNav;
const styles = StyleSheet.create({
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: Dimensions.get('screen').width,
  },
  row: {
    flexDirection: 'row',
  },
  '1col': {
    flex: 1,
  },
  '2col': {
    flex: 2,
  },
  '3col': {
    flex: 3,
  },
  '4col': {
    flex: 4,
  },
});

// RN Code
const Col = ({ numRows, children, ...props }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children, ...props }) => <View style={styles.row}>{children}</View>;
