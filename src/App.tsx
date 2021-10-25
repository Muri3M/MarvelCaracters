import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './store';

const persistor = persistStore(store);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" hidden />
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
