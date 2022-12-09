import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticNavCard from '../../../components/AnalyticNavCard';
import { dashboardAnalytics } from '../../../reducer/dahboard';

function AnalyticsNav({ navigation, ...props }) {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    loadData();
  }, [dispatch]);

  const isReady = useSelector<any, boolean>((state) => state.dashboardAnalytics.state == 'LOADED');
  const cards = useSelector<any, any[]>((state) => state.dashboardAnalytics.cards);
  const loadData = useCallback(() => {
    dispatch(dashboardAnalytics.load());
  }, [dispatch]);
  return !isReady ? (
    <></>
  ) : (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={cards}
        renderItem={({ item }) => <AnalyticNavCard nav={item} navigation={navigation} />}
      />
    </View>
  );
}

export default AnalyticsNav;
