import { BottomSheet } from '@rneui/base';

import React, { Fragment, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card, List, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const ListPage = ({
  navigation = null as any,
  customHeader = null,
  children = null as any,
  storeName,
  store,
  onItemPress = null as any,
  onItemLongPress = null as any,
  Item = null as any,
  addAction = null as any,
  ...props
}) => {
  //  function Container({children}) {
  //       return props.header ?
  //  }
  const selector = useSelector<any>;
  const dispatch = useDispatch();
  const isLoading = useSelector<any, boolean>((state) => state[storeName].state == 'LOADING');
  const isEmpty = useSelector<any, boolean>((state) => state[storeName].state == 'EMPTY');
  const canLoadMore = useSelector<any, boolean>((state) => state[storeName].canLoadMore);
  const failed = useSelector<any, boolean>((state) => state[storeName].state == 'FAILED');
  const isReady = useSelector<any, boolean>((state) =>
    ['LOADED', 'LOADING_MORE'].includes(state[storeName].state)
  );
  const isLoadingMore = useSelector<any, boolean>(
    (state) => 'LOADING_MORE' == state[storeName].state
  );
  const items = useSelector<any, any[]>((state) => state[storeName].items);

  //   const isLoaded = useSelector((state) => state[store].isLoading);

  const [refreshing, setRefreshing] = useState(false);
  //   const [loadingMore, setLoadingMore] = useState(false);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
  const onEndReached = async ({ distanceFromEnd }) => {
    if (canLoadMore && !onEndReachedCalledDuringMomentum) {
      dispatch(store.loadMore());
      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  return (
    store &&
    Item && (
      <>
        {props.header && (
          <Appbar.Header className="bg-gray-100 shadow-none">
            {props.canGoBack && (
              <Appbar.BackAction
                onPress={() => {
                  navigation.goBack();
                }}
              />
            )}
            <Appbar.Content title={props.title} subtitle={props.subtitle} />
            {!props.noSearch && (
              <Appbar.Action
                icon="filter-outline"
                onPress={() => {
                  //   navigation.navigate('FilterScene', {
                  //     listName: loader.listName,
                  //   });
                }}
              />
            )}
          </Appbar.Header>
        )}
        {customHeader}
        {isLoading && (
          <View className="flex-1 justify-center">
            <ActivityIndicator />
          </View>
        )}
        {isReady && (
          <>
            <FlatList
              onRefresh={async () => {
                dispatch(store.refresh());
              }}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.01}
              ListFooterComponent={
                <>
                  !props.widget && (
                  <View className="mt-24">
                    {isLoadingMore && (
                      <View className="flex-1 mt-5 justify-center">
                        <ActivityIndicator />
                      </View>
                    )}
                  </View>
                  )
                </>
              }
              onMomentumScrollBegin={() => {
                setOnEndReachedCalledDuringMomentum(false);
              }}
              refreshing={refreshing}
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => onItemPress && onItemPress(item)}
                  onLongPress={() => onItemLongPress && onItemLongPress(item)}
                  android_ripple={{
                    color: 'gray',
                  }}
                >
                  <Item item={item} />
                </Pressable>
              )}
            />
            {children}
            {addAction && (
              <View className="absolute m-4 right-0 bottom-0">
                <FAB icon="plus" onPress={() => addAction()} />
              </View>
            )}
          </>
        )}
      </>
    )
  );
};
export default ListPage;
const styles = StyleSheet.create({});

export function _sheetOption(title, action: any = null, titleStyle = {}) {
  return {
    title,
    titleStyle,
    onPress: (item) => action(item),
  };
}
