import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import useConst, { SearchNames } from '@src/utils/use-const';
import { BottomListSelect, searchContext } from '@src/scenes/ListSearchScene';

//
// const auth = Firebase.auth();

const WorkOrderEditScreen = ({ navigation, route }) => {
  const auth = useAuth();
  const [page, setPage] = useState(1);
  const Form = useForm({
    _key: 'slug',
    _url: 'homes',
    _route: route,
    _success(data) {},
  });
  useEffect(() => {
    // Form.setForm(project ?? {});
  }, []);
  const [title, setTitle] = useState('Create Unit');
  return (
    <View>
      <Appbar.Header className="bg-white">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ScrollView>
        {page == 1 ? (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('Search', {
                  ctx: searchContext.projects,
                  onSelect(item, value) {
                    Form.coldForm.meta.project_name = item?.name ?? value;
                    Form.coldForm.meta.project_id = item?.id;
                    Form.coldForm.meta.builder_name = item?.builder_name;
                    Form.coldForm.meta.builder_id = item?.builder_id;
                    Form.__setForm();
                  },
                });
              }}
            >
              <Form.Input label="Project" name="meta.project_name" />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Search', {
                  ctx: searchContext.builders,
                  onSelect({ name, id }) {
                    Form.coldForm.builder_name = name;
                    Form.coldForm.builder_id = id;
                    Form.__setForm();
                  },
                })
              }
            >
              <Form.Input label="Builder" name="builder_name" />
            </Pressable>
            <Form.Input label="Lot" name="meta.lot" />
            <Form.Input label="Block" name="meta.block" />
            <Form.Input label="Request Date" name="meta.request_date" />
            <Form.Input label="Supervisor Name" name="meta.request_by" />
            <Pressable
              onPress={() => {
                navigation.navigate('Search', {
                  ctx: searchContext.work_order_status,
                  onSelect({ status }, value) {
                    Form.coldForm.status = status;
                    Form.__setForm();
                  },
                });
              }}
            >
              <Form.Input label="Status" name="status" />
            </Pressable>
          </>
        ) : (
          <>
            <Form.Input label="Homeowner's Name" name="meta.home_owner" />
            <Form.Input label="Home/Cell" name="meta.home_phone" />
            <Form.Input label="Address" name="meta.home_address" />
            <Form.Input label="Schedule" name="meta.date" />
            <BottomListSelect
              onSelect={({ title }) => {
                Form.coldForm.meta.coe = title;
                Form.__setForm();
              }}
              ctx={searchContext.work_order_times}
            >
              <Form.Input label="Time" name="meta.coe" />
            </BottomListSelect>
            <Form.Input label="Work Description" name="meta.work_description" />
            <Form.Input label="Comment" name="meta.comment" />
          </>
        )}
      </ScrollView>

      <View>
        {page == 1 ? (
          <Form.Button onPress={() => setPage(2)}>Next</Form.Button>
        ) : (
          <>
            <Form.Button onPress={() => setPage(1)}>Next</Form.Button>
            <Form.Button submit={true}>Submit</Form.Button>
          </>
        )}
      </View>
    </View>
  );
};
export default WorkOrderEditScreen;
const styles = StyleSheet.create({});
