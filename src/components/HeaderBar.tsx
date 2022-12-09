import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Appbar, Button, Card, List, FAB } from 'react-native-paper';

const HeaderBar = ({ navigation, ...props }) => {
  return (
    <Appbar.Header className="bg-gray-100 shadow-none">
      {props.canGoBack && (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Appbar.Content title={props.title} subtitle={props.subtitle} />
      {!props.noSearch && <Appbar.Action icon="filter-outline" onPress={() => {}} />}
    </Appbar.Header>
  );
};

export default React.memo(HeaderBar);
