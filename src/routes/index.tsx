import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Info from '../pages/Info';

const main = createNativeStackNavigator();

const Routes: React.FC = () => (
  <main.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <main.Screen name="Home" component={Home} />
    <main.Screen name="Info" component={Info} />
  </main.Navigator>
);

export default Routes;
