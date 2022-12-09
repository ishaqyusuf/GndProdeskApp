import React from 'react';

import { ActionItem, DeleteActionItem } from '../../components/ActionItem';
import { useDispatch } from 'react-redux';
import { projects } from '../../reducer/list';

export const ProjectAction = ({ sheetRef }) => {
  const dispatch = useDispatch();
  const onPressItem = (type) => {
    //
  };
  return (
    <React.Fragment>
      <ActionItem text="Edit Project" itemType="edit" onPressItem={onPressItem} />
      <ActionItem text="View Units" itemType="view" onPressItem={onPressItem} />
      <ActionItem text="View Tasks" itemType="view_tasks" onPressItem={onPressItem} />
      <ActionItem text="Delete Project" itemType="delete" onPressItem={onPressItem} />
      <DeleteActionItem sheetRef={sheetRef} storeName="projects" store={projects} />
    </React.Fragment>
  );
};
