import React, { createRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListPage from '../../components/ListPage';
import { projects } from '../../reducer/list';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { ProjectAction } from './ProjectAction';
import { ActionSheetRef } from 'react-native-actions-sheet';
import HeaderBar from '../../components/HeaderBar';

export default function ProjectListScreen({ props, navigation }) {
  const dispatch = useDispatch<any>();
  const actionSheetRef = createRef<ActionSheetRef>();
  const showActionSheet = () => {
    actionSheetRef.current?.setModalVisible();
  };
  useEffect(() => {
    loadData();
  }, [dispatch]);

  const loadData = useCallback(() => {
    dispatch(projects.load());
  }, [dispatch]);
  const openFilter = () => {
    // captureEvent({ eventName: 'Open conversation filter menu' });
    navigation.navigate('ProjectFilter', {});
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <View className="px-4 py-3 border-b border-gray-300">
          <View className="flex-row justify-between">
            <Text className="font-bold">{item.title} </Text>
            <Text className=""> {item.home_count} </Text>
          </View>
          <View className="flex-row justify-between">
            {/* <Text>{item.meta.lot_block}</Text> */}
            <Text>
              {item.ref_no} | {item.builder_name}
            </Text>
            {/* <Label status={item.install_status}/> */}
          </View>
        </View>
      </>
    );
  };

  const onPressItem = (type) => {
    //
  };
  const onItemPress = (item) => {
    dispatch(projects.onItemLongPress(item));
    showActionSheet();
  };
  const onItemLongPress = (item) => {};

  return (
    <>
      <HeaderBar title="Projects" navigation={navigation} />
      <ListPage
        storeName="projects"
        store={projects}
        navigation={navigation}
        Item={renderItem}
        onItemLongPress={onItemLongPress}
        onItemPress={onItemPress}
      >
        {/* <View>
        <Text>a</Text>
      </View> */}
        <ActionSheet ref={actionSheetRef} gestureEnabled defaultOverlayOpacity={0.3}>
          <ProjectAction sheetRef={actionSheetRef} />
        </ActionSheet>
      </ListPage>
    </>
  );
}
