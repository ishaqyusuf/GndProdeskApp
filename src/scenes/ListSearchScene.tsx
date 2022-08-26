import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import ListPage from '@src/components/ListPage';
import useConst from '@src/utils/use-const';
import useList from '@src/utils/use-list';
import React, { Fragment, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, List, TouchableRipple } from 'react-native-paper';
import * as dot from 'dot-wild';
import { useFocusEffect } from '@react-navigation/native';

export const searchContext = {
  projects: {
    url: 'projects',
    itemText: 'name',
    listName: 'project-search',
  },
  roles: {
    url: 'roles',
    itemText: 'title',
    listName: 'roles-search',
  },
  builders: {
    url: 'builders',
    itemText: 'name',
    listName: 'builders',
  },
  order_status: {
    items: useConst.orderStatus.map((status) => true && { status }),
    // transform: (status) => true && { status },
    itemText: 'status',
    title: 'Order Status',
  },
  work_order_status: {
    items: useConst.workOrderStats.map((status) => true && { status }),
    // transform: (status) => true && { status },
    itemText: 'status',
    title: 'Work Order Status',
  },
  work_order_assign_tech: {
    url: 'users',
    query: {
      list: true,
      tech: true,
      role: 'tech',
    },
    itemText: 'name',
    subText: 'email',
    listName: 'tech-search',
  },
  work_order_times: {
    items: ['8AM to 12PM', '1PM to 5PM'].map((title) => true && { title }),
    title: 'Schedule Time',
    itemText: 'title',
  },
};
export default function ListSearchScene({ navigation, route }) {
  const { name, title, ctx, select, onSelect, selection } = route.params;
  const { items } = ctx;
  //   const ctx = {
  //     builders: {
  //       url: 'builders',
  //     },
  //     'work-order-status': {
  //       transform(status) {
  //         return {
  //           status,
  //           title: status,
  //         };
  //       },
  //     },
  //   }[name];
  const list = useList(ctx.listName ?? 'list-search', {
    _url: ctx.url,
    _cache: true,
    _query: ctx.query,
    _transform: ctx.transform,
  });
  useFocusEffect(
    useCallback(() => {
      if (!items) list.load();
      else {
        list.initItems({ items });
      }
    }, [])
  );
  function Header() {
    return (
      <Appbar.Header className="bg-white">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  }
  return (
    <ListPage
      customHeader={Header()}
      loader={list}
      className="flex-1"
      Item={({ item }) => (
        <List.Item
          title={dot.get(item, ctx.itemText, item)}
          description={dot.get(item, ctx.subtitleText)}
          onPress={() => {
            navigation.goBack();
            onSelect(item);
          }}
        />
      )}
    ></ListPage>
  );
}

export function BottomListSelect({
  children,
  onOpen = null,
  onSelect,
  //   items,
  ctx = null,
}) {
  const {
    name,
    title,
    select,
    listName,
    itemText = 'title',
    subText = null,
    items,
    selection,
  } = ctx;
  const option = useBottomSheet({
    onOpen() {
      onOpen && onOpen();
    },
  });
  const list = useList(listName ?? 'list-search', {
    _url: ctx?.url,
    _cache: true,
  });
  useFocusEffect(
    useCallback(() => {
      if (!items) list.load({});
      else {
        list.initItems({ items });
      }
    }, [])
  );
  return (
    <>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => {
          option.open();
        }}
      >
        {children}
      </TouchableRipple>
      <BottomSheetComponent ctx={option}>
        {list.isReady ? (
          <View className="py-2">
            {items.map((item, i) => (
              <List.Item
                key={i}
                onPress={() => {
                  option.close();
                  onSelect(item);
                }}
                title={dot.get(item, itemText, item)}
                description={dot.get(item, subText)}
              />
            ))}
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </BottomSheetComponent>
    </>
  );
}
