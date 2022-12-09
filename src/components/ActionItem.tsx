import React, { useState } from 'react';
import { Icon } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export const ActionItem = ({
  itemType,
  iconType = 'ionicon',
  icon = null,
  text,
  children = null as any,
  style = {},
  subtitle = null,
  onPressItem,
}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        className={`p-4 border-b flex-row border-gray-300`}
        onPress={() => onPressItem({ itemType })}
      >
        {icon && <Icon name={icon} type={iconType} />}
        <View>
          <Text style={style} className="font-semibold">
            {text}
          </Text>
          {subtitle && <Text>{subtitle}</Text>}
        </View>
        {children}
      </TouchableOpacity>
    </React.Fragment>
  );
};
export function DeleteActionItem({
  iconType = 'ionicon',
  icon = null,
  storeName,
  sheetRef,
  store,
  subtitle = null,
}) {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState('Delete');
  const selection = useSelector<any, any>((state) => state[storeName].longPressedItem);
  function onPress() {
    if (!confirm) {
      setConfirm(true);
      setTitle('Are you sure?');
      setTimeout(() => {
        if (confirm) {
          setTitle('Delete');
          setConfirm(false);
        }
      }, 3000);
    } else {
      setTitle('Deleting');
      setDeleting(true);
      setConfirm(false);
      dispatch(store.deleteItem(selection));
      sheetRef.hide();
    }
  }
  return (
    <ActionItem
      text={title}
      subtitle={subtitle}
      icon={icon}
      itemType={null}
      onPressItem={() => onPress()}
      style={{ color: 'red' }}
    >
      {deleting && <ActivityIndicator color="red" />}
    </ActionItem>
  );
}
