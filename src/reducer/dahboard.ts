import dataStore from './data';

export const dashboardAnalytics = dataStore('dashboard-analytics', {
  url: 'dashboard/app',
  initialState: {
    cards: [],
  },
  async _load() {
    console.log('OVERRIDING LOAD');
    return {
      projects: 71,
      units: 4856,
      tasks: 24456,
      builders: 8,
      customer_services: 566,
      orders: 72,
    };
  },
  transform(data) {
    console.log('TRANSFORMING DATA.....');
    console.log(data);
    return {
      cards: Object.entries(data)
        .map(([k, v]) => {
          const card = cards[k];
          if (card) card.subtitle = v;
          return card;
        })
        .filter(Boolean),
    };
  },
});
const cards = {
  projects: createNavCardItem('Projects', '100 projects', 'albums-outline', 'Projects', '#fc9a7e'),
  units: createNavCardItem('Units', '100 projects', 'home-outline', 'UnitsScreen', '#83f795'),
  builders: createNavCardItem(
    'Builders',
    '100 projects',
    'podium-outline',
    'BuildersScreen',
    '#d5a1ed'
  ),
  tasks: createNavCardItem('Tasks', '100 projects', 'layers-outline', 'TasksScreen', '#a1cbed'),
  customer_services: createNavCardItem(
    'Customer Services',
    '100 projects',
    'help-buoy-outline',
    'CustomerServicesScreen',
    '#edd0a1'
  ),
  orders: createNavCardItem('Orders', '100 projects', 'cart-outline', 'OrdersScreen', '#cceda1'),
};
function createNavCardItem(title, subtitle, icon, route, color) {
  return {
    title,
    subtitle,
    icon,
    route,
    color,
  };
}
