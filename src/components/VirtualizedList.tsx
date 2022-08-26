import { FlatList } from 'react-native';
import React from 'react';
const VirtualizedList = ({ children, ...props }) => {
  return (
    <FlatList
      {...props}
      data={[]}
      keyExtractor={() => 'key'}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
    />
  );
};

export default VirtualizedList;
