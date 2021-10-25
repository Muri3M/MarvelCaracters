import Reactotron from 'reactotron-react-native';
import store from './src/store';

Reactotron.setAsyncStorageHandler(store).configure().useReactNative().connect();
