 
import { _sheetOption } from '@src/components/ListPage';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB, Portal, Provider, Text } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';

const UnitCostEditScreen = ({ navigation, route }) => {
  const Form = useForm({
    _key: 'slug',
    _url: 'task-costs',
    _transformInput(data) {
      return {
        ...data,
        tasks: data.unit_tasks.map((t) => {
          let _r: any = {
            ...t,
          };
          return _r;
        }),
      };
    },
    _transform({ tasks, unit_tasks, ...data }) {
      let _tasks: any[] = [];
      tasks.map((item) => {
        let exists = false;
        if (item.id) {
          exists =
            unit_tasks.some(
              (t) =>
                t.id == item.id &&
                t.meta.invoice_date == item.meta.invoice_date &&
                t.meta.check_no == item.meta.check_no
            ) &&
            unit_tasks.some((t) => t.id == item.id && t.paid == item.paid && t.due == item.due);
        }
        let inv_date = item.meta_invoice_date;
        if (!exists)
          _tasks.push({
            ...item,
            meta: {
              ...item.meta,
              check_no: item.meta_check_no,
              invoice_date: inv_date,
            },
          });
      });
      return {
        ...data,
        _tasks,
      };
    },
    _success(data) {
      // console.log(data);
      // if (data.slug) {
      //   route.params.list._addItem(data);
      //   navigation.goBack();
      // }
    },
    _route: route,
  });
  useEffect(() => {
    useConsole.logScreen('Unit Cost Edit');
  }, []);
  const [title, setTitle] = useState('Create Unit');
  function CostInput() {
    return (
      <Fragment>
        {Form.state.tasks.map((task, index) => (
          <View key={index}>
            <View>
              <Text>{task.title}</Text>
            </View>
            <Form.Input
              label="Title"
              name={`unit_tasks.${index}.title`}
              disabled={task.meta_uid == null}
            />
            <Form.Input label="Due" name={`unit_tasks.${index}.due`} />
            <Form.Input label="Paid" name={`unit_tasks.${index}.paid`} />
            <Form.Input label="Check" name={`unit_tasks.${index}.check_no`} />
            <Form.Input label="Invoice Date" name={`unit_tasks.${index}.meta.invoice_date`} />
          </View>
        ))}
      </Fragment>
    );
  }
  function Fab() {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;
    function addTask(type, title) {
      Form.coldForm.tasks.push({
        title,
        type,
        meta: {},
      });
      Form.__setForm();
    }
    return (
      <FAB.Group
        open={open}
        visible
        icon={open ? 'calendar-today' : 'plus'}
        actions={[
          {
            icon: 'star',
            label: 'Warranty',
            onPress: () => addTask('warranty', 'Warranty'),
          },
          {
            icon: 'email',
            label: 'Charge Back',
            onPress: () => addTask('charge_back', 'Charge Back'),
          },
          {
            icon: 'bell',
            label: 'Epo',
            onPress: () => addTask('epo', 'Epo'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    );
  }
  return (
    <Provider>
      <Portal>
        <Appbar.Header className="bg-white">
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title={Form.headline} />
          <Appbar.Action icon="plus" onPress={() => {}} />
        </Appbar.Header>
        <CostInput />
        <Fab />
        <View>
          <Form.Button submit={true}>Submit</Form.Button>
        </View>
      </Portal>
    </Provider>
  );
};
export default UnitCostEditScreen;
const styles = StyleSheet.create({});
