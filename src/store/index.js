import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ['query']
    // stateReconciler: autoMergeLevel2,
};

const middleware = [thunk];

// if(__DEV__){
//     middleware.push(createLogger())
// }



const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(
        persistedReducer,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        composeWithDevTools(
            applyMiddleware(...middleware),
        )
    );
    let persistor = persistStore(store)
    return { store, persistor }
}

