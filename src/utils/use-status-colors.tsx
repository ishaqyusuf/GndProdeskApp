import { Text } from "react-native-paper";
import React, { Fragment } from "react";


export function Label  ({status})
{
  return (
    <Text style={{
      color: _statusColor(status) 
    }}>
      {status}
    </Text>
  )
}
export const _statusColor = (status) => {
  return status ? colors[status?.toLocaleLowerCase()?.split(' ')?.join('_')] ?? 'gray' : 'gray';
};

const colors = {
  active: 'amber',
  draft: 'gray',
  in_production: '#929620',
  scheduled: 'blue',
  pending: '#929620',
  processing: '#929620',
  queued: '#929620',
  production_completed: 'fuchsia',
  completed: 'green',
  complete: 'green',
  paid: 'green',
  loaded: 'green',
  installed: 'green',
  // completed: "green",
  out_of_stock: 'red',
  cancelled: 'red',
  incomplete: 'red',
  // cancell/: "red",
  delivered: 'sky',
  installation: 'indigo',
  unlisted: 'gray',
  listed: 'blue',
  template: 'blue',
  stock: 'purple',
  material_ordered: 'amber',
  material_received: 'sky',
  ready_for_pickup: 'green',
};
