import { BottomSheet } from '@rneui/base';
import { useAuth } from '@src/auth-provider';
import React, { Fragment, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card, List, Text } from 'react-native-paper';
import { FAB } from 'react-native-paper';

const ListPage = ({ navigation = null, children, loader, addAction = null, ...props }) => {
  //  function Container({children}) {
  //       return props.header ?
  //  }

  return (
    <Fragment>
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
        </Appbar.Header>
      )}

      {loader.isLoading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator />
        </View>
      ) : loader.isReady ? (
        <View className="flex-1">
          <ScrollView>
            {loader._fromCache && !props.widget && <Button>Refresh</Button>}
            {children}
            {loader.isLoadingMore && (
              <View className="mb-4">
                <ActivityIndicator />
              </View>
            )}
          </ScrollView>
          {addAction && (
            <FAB
              icon="plus"
              className="absolute bg-blue-700 m-4 right-0 bottom-0"
              onPress={() => addAction()}
            />
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
        </View>
      ) : null}
    </Fragment>
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
