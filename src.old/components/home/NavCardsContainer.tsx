import { useAuth } from '@src/auth-provider';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const NavCardsContainer = ({ navigation, children, ...props }) => {
  const auth = useAuth();
  return (
    <ScrollView
      className="p-4"
      showsHorizontalScrollIndicator={false}
      style={{}}
      horizontal={props.horizontal}
    >
      {children}
    </ScrollView>
  );
};
export default NavCardsContainer;
const styles = StyleSheet.create({});
