import { useFocusEffect } from '@react-navigation/native';
import useForm from '@src/utils/use-form';
import useList from '@src/utils/use-list';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Appbar, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomListSelect, searchContext } from './ListSearchScene';

export default function FilterScene({ navigation, route }) {
  const { listName } = route.params;

  const List = useList(listName, {
    _init: false,
  });
  const { filter, filterable: f } = List.state;
  console.log('FILTERS', filter);
  // const List = AppState().state.pageList;
  // console.log(List.pager);
  const Form = useForm({
    ...(filter ?? {}),
  }); //List.Filter; //list.Filter;
  // useFocusEffect(() => {
  //   // Form.init();
  // });

  return (
    <View className="flex-1">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Filter" />
      </Appbar.Header>
      <ScrollView className="p-4">
        <Form.Input name="search" label="Search" />
        <BottomListSelect
          ctx={searchContext.order_status}
          onSelect={({ status }, value) => {
            Form._setValue('supplier', status);
          }}
        >
          <Form.Input label="Suppliers" editable={false} name="supplier" />
        </BottomListSelect>
        <Text>Supplier</Text>

        <Form.Button
          onPress={() => {
            List.applyFilter(Form.coldForm);
            navigation.goBack();
          }}
        >
          Filter
        </Form.Button>
        <Form.Button
          onPress={() => {
            List.clearFilter();
            navigation.goBack();
          }}
        >
          Clear Filter
        </Form.Button>
      </ScrollView>
    </View>
  );
}
export function FilterIcon({ list, navigate }) {
  return (
    <>
      <Pressable onPress={() => navigate('FilterScene', { list })}>
        <IconButton icon="filter" />
      </Pressable>
    </>
  );
}
