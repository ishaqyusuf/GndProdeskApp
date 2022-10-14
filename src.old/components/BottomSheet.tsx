import { BottomSheet } from '@rneui/base';
import { useState } from 'react';
import { Card } from 'react-native-paper';
import React from 'react';

export function BottomSheetComponent({ children = null, ctx, persistent = false, ...props }) {
  return (
    <BottomSheet
      onBackdropPress={() => !persistent && ctx.close()}
      isVisible={ctx.opened}
      {...props}
    >
      <Card>{ctx.opened && children}</Card>
    </BottomSheet>
  );
}
export function useBottomSheet(_option: any = {}) {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState<any>(null);
  const [option, setOption] = useState<any>(_option);
  return {
    option,
    setOption(key, value) {
      option[key] = value;
      setOption(option);
    },
    updateOption(op) {
      setOption({ ...option, ...op });
    },
    opened,
    data,
    open(data = null) {
      setData(data);
      setOpened(true);
      _option.onOpen && _option.onOpen();
    },
    close() {
      setData(null);
      setOpened(false);
    },
  };
}
