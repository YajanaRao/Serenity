import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { RootReducer } from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['query'],
};


const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
