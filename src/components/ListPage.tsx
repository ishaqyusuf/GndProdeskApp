import { BottomSheet } from '@rneui/base';
import states, { AppState } from '@src/utils/app-state-provider';

import React, { Fragment, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card, List, FAB } from 'react-native-paper';

const ListPage = ({
  navigation = null,
  customHeader = null,
  children = null,
  loader,
  Item,
  refreshable = false,
  addAction = null,
  ...props
}) => {
  //  function Container({children}) {
  //       return props.header ?
  //  }
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const app = AppState();
  return (
    loader && (
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
                  navigation.navigate('FilterScene', {
                    listName: loader.listName,
                  });
                }}
              />
            )}
          </Appbar.Header>
        )}
        {customHeader}
        {loader.isLoading ? (
          <View className="flex-1 justify-center">
            <ActivityIndicator />
          </View>
        ) : loader.isReady ? (
          <>
            {/* <ScrollView> */}
            {loader._fromCache && !props.widget && <Button>Refresh</Button>}

            <FlatList
              onRefresh={async () => {
                if (refreshable) {
                  setRefreshing(true);
                  await loader.refresh();
                  setRefreshing(false);
                }
              }}
              onEndReached={async () => {
                if (!loader.hasMore || props.widget) return;
                if (loadingMore) {
                  console.log('LOADING MORE IN PROGRESS:');
                  return;
                }
                {
                  console.log('LOADING MORE:');
                  setLoadingMore(true);
                  await loader.loadMore();
                  setTimeout(() => {
                    setLoadingMore(false);
                  }, 2000);
                }
              }}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                !props.widget && (
                  <View className="mt-24">
                    {loader.isLoadingMore && (
                      <View className="flex-1 mt-5 justify-center">
                        <ActivityIndicator />
                      </View>
                    )}
                  </View>
                )
              }
              refreshing={refreshing}
              data={loader.state.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) =>
                (!props.widget || (props.widget && index < 5)) && (
                  <Pressable
                    android_ripple={{
                      color: 'gray',
                    }}
                  >
                    <Item item={item} />
                  </Pressable>
                )
              }
            />
            {children}

            {loader.isLoadingMore && (
              <View className="mb-4">
                <ActivityIndicator />
              </View>
            )}
            {/* </ScrollView> */}
            {addAction && (
              <View className="absolute m-4 right-0 bottom-0">
                <FAB icon="plus" onPress={() => addAction()} />
              </View>
            )}
            {loader.options && (
              <BottomSheet
                onBackdropPress={() => loader.closeOption()}
                modalProps={{}}
                isVisible={loader._pressed}
              >
                <Card>
                  {loader.options.map((option) => (
                    <List.Item {...option}></List.Item>
                  ))}
                  {/* <List.Item title="Edit"></List.Item>
          <List.Item title="Delete" titleStyle={{
            color: 'red'
          }}></List.Item> */}
                </Card>
              </BottomSheet>
            )}
          </>
        ) : null}
      </>
    )
  );
};
export default ListPage;
const styles = StyleSheet.create({});

export function _sheetOption(title, action = null, titleStyle = {}) {
  return {
    title,
    titleStyle,
    onPress: (item) => action(item),
  };
}
