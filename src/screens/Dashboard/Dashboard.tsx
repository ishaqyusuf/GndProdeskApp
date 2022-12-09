import React, { useState, useEffect } from 'react';

import { RefreshControl, ScrollView } from 'react-native';
import Header from './components/Header';
import AnalyticsNav from './components/AnalyticsNav';

function DashboardScreen({ props, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(false);
          }}
        />
      }
    >
      <Header navigation={navigation} />
      <AnalyticsNav navigation={navigation} />
    </ScrollView>
  );
}
export default DashboardScreen;
