import { taskApi } from '@src/utils/task-api';
import useList from '@src/utils/use-list';
import { ColorLabel } from '@src/utils/use-status-colors';
import React, { Fragment, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ActivityIndicator, Button, List, Text, TextInput } from 'react-native-paper';
import { DataDisplay } from './Content';
import ListPage from './ListPage';
import { MenuItem } from './MenuItem';

export function TaskItem({
  option = null,
  item,
  production = false,
  installation = false,
  menu = false,
  list = null,
  readonly = false,
}) {
  const task = !production && !installation;
  const [page, setPage] = useState('default');
  //   const [saving, setSaving] = useState(false);
  let api = taskApi(list);
  const {
    production_started_at: spd,
    production_due_date: pdd,
    production_completed_at: pcd,
    production_started_at: psd,
  } = item.meta ?? {};

  function ProductionMenu() {
    return (
      <>
        {!psd && <MenuItem title="Start Production" onPress={() => api.startProduction(item)} />}
        {psd && !pcd && (
          <MenuItem title="Complete Production" onPress={() => api.completeProduction(item)} />
        )}
        {psd && <MenuItem title="Cancel Production" onPress={() => api.cancelProduction(item)} />}
      </>
    );
  }
  const Item = (
    <Pressable
      onPress={() => {
        !readonly && option && option.open(item);
      }}
    >
      <View className="px-4 py-3 border-b border-gray-300">
        <Text className="font-bold">
          {item.meta.project_title} - {item.meta.lot_block}
        </Text>
        {page == 'default' && (
          <>
            <View className="flex-row justify-between">
              {/* <Text>{item.meta.lot_block}</Text> */}
              <Text>{item.title}</Text>
              {installation && <ColorLabel status={item.meta.install_status ?? 'Pending'} />}
              {production && <ColorLabel status={item.meta.install_status ?? 'Pending'} />}
              {task && <ColorLabel status={item.status} />}
            </View>
            {readonly && (
              <View>
                {production ||
                  (task && item.meta.produceable && (
                    <>
                      <DataDisplay title="Sent to Production on" value={spd} />
                      <DataDisplay title="Production Due Date" value={pdd} />
                      <DataDisplay title="Production Started on" value={psd} />
                      <DataDisplay title="Production Completed on" value={pcd} />

                      {menu && item && production && <ProductionMenu />}
                    </>
                  ))}
                {installation ||
                  (task && item.meta.installable && (
                    <>
                      <DataDisplay title="Assigned at" value={item.meta.assigned_install_at} />
                      <DataDisplay title="Started At" value={item.meta.install_started_at} />
                      <DataDisplay title="Completed At" value={item.meta.installed_at} />
                      <DataDisplay title="Installer" value={item.meta.installer_name} />
                      {menu && item && installation && <InstallationMenu />}
                    </>
                  ))}
                {task && item && <TaskMenu />}
              </View>
            )}
          </>
        )}
        {page == 'installer' && Installers()}
        {page == 'job_complete_form' && InstallationForm()}
      </View>
    </Pressable>
  );
  function Installers() {
    const installers = useList('installers', {
      _url: 'users',
      _query: {
        list: true,
        employees: true,
        role: 'installation',
      },
    });
    useEffect(() => {
      installers.load();
    }, []);
    return (
      <ListPage
        loader={installers}
        Item={({ item: user }) => (
          <List.Item
            title={user.name}
            description={user.email}
            onPress={() => {
              api.update(
                {
                  status: 'Installation',
                  installer_name: user.name,
                  installer_id: user.id,
                },
                item.slug
              );
            }}
            right={(props) =>
              user.id == item.meta.installer_id && <List.Icon {...props} icon="check" />
            }
          />
        )}
      ></ListPage>
    );
  }
  function InstallationForm() {
    const [note, setNote] = useState('');
    return (
      <View className="p-4">
        <TextInput
          multiline
          placeholder="Information"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <View>
          <Button
            loading={api.saving}
            onPress={() => {
              api.installCompleted(option.data, note);
            }}
            color="green"
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
  function InstallationMenu() {
    const [note, setNote] = useState('');

    return (
      <Fragment>
        <MenuItem title="View" />
        {option.data.meta.install_status == 'Completed' ? (
          <MenuItem
            title="Not Completed"
            style={{ color: '#BFAF56' }}
            onPress={() => {
              api.notCompleted(option.data);
            }}
          >
            {api.saving && <ActivityIndicator />}
          </MenuItem>
        ) : (
          <MenuItem
            style={{ color: 'green' }}
            title="Mark as completed"
            onPress={() => setPage('job_complete_form')}
          />
        )}
      </Fragment>
    );
  }

  function TaskMenu() {
    return (
      <>
        <View>Update Status</View>
        <MenuItem title="" onPress={() => {}} />
      </>
    );
  }
  return Item;
}
