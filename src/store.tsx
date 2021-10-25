import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import {
  loadCharacters,
  searchCharacters,
  selectCharacter,
} from './store/reducer';

const reducers = {
  loadCharacters,
  searchCharacters,
  selectCharacter,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer<AllStates, LoadAction>(
  persistConfig,
  rootReducer
);

const store: Store<AllStates, LoadAction> & {
  dispatch: DispatchType;
} = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
