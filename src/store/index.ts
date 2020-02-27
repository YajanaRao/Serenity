import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RootReducer } from '../reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['query'],
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
